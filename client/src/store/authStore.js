import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';
import userService from '../services/userService';
import firestoreService from '../services/firestoreService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      // Actions
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user, 
          isLoading: false, 
          error: null 
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      clearErrors: () => {
        set({ error: null });
      },

      // Initialize auth state
      initialize: async () => {
        try {
          set({ isLoading: true });
          const firebaseUser = await authService.init();
          
          if (firebaseUser) {
            // Fetch user data from backend
            try {
              const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
              
              set({ 
                user: { ...firebaseUser, ...backendUser }, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
            } catch (backendError) {
              console.error('Failed to fetch user from backend:', backendError);
              
              // Try to fetch from Firestore as fallback
              try {
                const firestoreUser = await firestoreService.getUserDocument(firebaseUser.uid);
                
                set({ 
                  user: { ...firebaseUser, ...firestoreUser }, 
                  isAuthenticated: true, 
                  isLoading: false,
                  error: null 
                });
              } catch (firestoreError) {
                console.error('Failed to fetch user from Firestore:', firestoreError);
                // Firebase user exists but no backend/firestore user, still consider authenticated
                set({ 
                  user: firebaseUser, 
                  isAuthenticated: true, 
                  isLoading: false,
                  error: null 
                });
              }
            }
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false,
              error: null 
            });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error.message 
          });
        }
      },

      // Sign in
      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Sign in with Firebase
          const firebaseUser = await authService.signIn(email, password);
          
          // Fetch user data from backend
          try {
            const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
            
            const combinedUser = { ...firebaseUser, ...backendUser };
            set({ 
              user: combinedUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return combinedUser;
          } catch (backendError) {
            console.error('Failed to fetch user from backend:', backendError);
            // Still consider authenticated if Firebase auth succeeded
            set({ 
              user: firebaseUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return firebaseUser;
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          throw error;
        }
      },

      // Sign up (create user)
      signUp: async (name, email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Create user in Firebase Auth
          const firebaseUser = await authService.signUp(email, password);
          
          // Prepare user data
          const userData = {
            firebaseUid: firebaseUser.uid,
            name: name,
            email: email,
            authType: 'email',
            role: 'USER',
            isEmailVerified: firebaseUser.emailVerified || false,
            isActive: true,
            pushNotificationsEnabled: true,
            emailNotificationsEnabled: true,
            workoutRemindersEnabled: true,
            socialNotificationsEnabled: true,
            subscriptionType: 'FREE'
          };
          
          // Create user in Firestore
          try {
            await firestoreService.createUserDocument(firebaseUser.uid, userData);
            console.log('User document created in Firestore');
          } catch (firestoreError) {
            console.error('Failed to create user document in Firestore:', firestoreError);
            // Continue with backend creation even if Firestore fails
          }
          
          // Create user in backend
          try {
            const backendUser = await userService.createUser(userData);
            
            const combinedUser = { ...firebaseUser, ...backendUser, displayName: name };
            set({ 
              user: combinedUser,
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return combinedUser;
          } catch (backendError) {
            console.error('Failed to create user in backend:', backendError);
            // If backend creation fails, still consider Firebase user as authenticated
            const userWithName = { ...firebaseUser, displayName: name };
            set({ 
              user: userWithName,
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return userWithName;
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          throw error;
        }
      },

      // Sign in with Google
      signInWithGoogle: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Sign in with Google via Firebase
          const firebaseUser = await authService.signInWithGoogle();
          
          // Check if user exists in backend, if not create them
          try {
            const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
            
            const combinedUser = { ...firebaseUser, ...backendUser };
            set({ 
              user: combinedUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return combinedUser;
          } catch (backendError) {
            console.error('User does not exist in backend:', backendError);
            // User doesn't exist in backend, create them
            try {
              const userData = {
                firebaseUid: firebaseUser.uid,
                name: firebaseUser.displayName || 'Google User',
                email: firebaseUser.email,
                authType: 'google',
                role: 'USER',
                isEmailVerified: firebaseUser.emailVerified || false,
                isActive: true,
                pushNotificationsEnabled: true,
                emailNotificationsEnabled: true,
                workoutRemindersEnabled: true,
                socialNotificationsEnabled: true,
                subscriptionType: 'FREE'
              };
              
              // Create user in Firestore (check if it already exists first)
              try {
                const firestoreExists = await firestoreService.userDocumentExists(firebaseUser.uid);
                if (!firestoreExists) {
                  await firestoreService.createUserDocument(firebaseUser.uid, userData);
                  console.log('Google user document created in Firestore');
                }
              } catch (firestoreError) {
                console.error('Failed to create Google user document in Firestore:', firestoreError);
                // Continue with backend creation even if Firestore fails
              }
              
              const backendUser = await userService.createUser(userData);
              
              const combinedUser = { ...firebaseUser, ...backendUser };
              set({ 
                user: combinedUser, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
              return combinedUser;
            } catch (createError) {
              console.error('Failed to create Google user in backend:', createError);
              // Still consider authenticated if Firebase auth succeeded
              set({ 
                user: firebaseUser, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
              return firebaseUser;
            }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          throw error;
        }
      },

      // Sign out
      signOut: async () => {
        try {
          set({ isLoading: true });
          await authService.signOut();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        } catch (error) {
          console.error('Sign out failed:', error);
          set({ 
            error: error.message, 
            isLoading: false 
          });
        }
      },

      // Update user profile
      updateUser: async (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          try {
            set({ isLoading: true });
            
            // Update in Firestore
            try {
              await firestoreService.updateUserDocument(currentUser.uid, userData);
              console.log('User updated in Firestore');
            } catch (firestoreError) {
              console.error('Failed to update user in Firestore:', firestoreError);
            }
            
            // Update in backend if user has backend data
            if (currentUser.id) {
              try {
                await userService.updateUser(currentUser.id, userData);
                console.log('User updated in backend');
              } catch (backendError) {
                console.error('Failed to update user in backend:', backendError);
              }
            }
            
            const updatedUser = { ...currentUser, ...userData };
            set({ 
              user: updatedUser,
              isLoading: false 
            });
            return updatedUser;
          } catch (error) {
            console.error('Failed to update user:', error);
            set({ 
              isLoading: false,
              error: error.message 
            });
            throw error;
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
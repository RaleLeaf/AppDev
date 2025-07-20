import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';
import userService from '../services/userService';

// Utility function to get formatted last sign-in time
export const getLastSignInTime = (user) => {
  if (!user?.metadata?.lastSignInTime) return null;
  return new Date(user.metadata.lastSignInTime);
};

// Utility function to check if backend is available
export const checkBackendHealth = async () => {
  try {
    const response = await fetch('/api/health', { 
      method: 'GET',
      timeout: 5000 // 5 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return false;
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      userId: null, // Add userId to the store
      userProfileId: null, // Add userProfileId to the store
      isAuthenticated: false,
      isLoading: true,
      error: null,

      // Actions
      setUser: (user) => {
        // Debug what we're receiving
        console.log('🔍 DEBUG - setUser input:', {
          user: user,
          hasBackendUser: !!user?.backendUser,
          userKeys: user ? Object.keys(user) : [],
          backendUserKeys: user?.backendUser ? Object.keys(user.backendUser) : []
        });

        const backendUser = user?.backendUser || {};
        
        // Use the userId from backend (Firestore document ID)
        const userId = backendUser?.userId || user?.uid;  // Use backendUser.userId first, then fallback to Firebase UID
        const userProfileId = backendUser?.userProfileId;
        
        console.log('🔍 DEBUG - Extracted IDs:', {
          userId: userId,
          userProfileId: userProfileId,
          source: backendUser?.userId ? 'backendUser.userId' : 'user.uid'
        });

        set({ 
          user, 
          userId: userId, // Use the Firestore document ID
          userProfileId: userProfileId, // Set internal userProfileId
          isAuthenticated: !!user, 
          isLoading: false, 
          error: null 
        });

        // Log the final state after setting
        console.log('✅ Auth store updated with IDs:', {
          userId: get().userId,
          userProfileId: get().userProfileId,
          isAuthenticated: get().isAuthenticated
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
            console.log('Firebase user found during initialization:', firebaseUser.uid);
            
            // Fetch user data from backend
            try {
              const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
              console.log('Backend user found during session restoration');
              
              // Update last login timestamp (session restoration) - Backend only
              try {
                await userService.updateLastLogin(firebaseUser.uid);
                console.log('Backend last login updated during session restoration');
              } catch (loginUpdateError) {
                console.warn('Failed to update backend last login during session restoration:', loginUpdateError);
              }
              
              // Note: Firebase Auth automatically tracks lastSignInTime
              // Access via: firebaseUser.metadata.lastSignInTime
              
              const combinedUser = { 
                ...firebaseUser, 
                backendUser,
                lastSignInTime: firebaseUser.metadata.lastSignInTime // Use Firebase Auth's built-in tracking
              };
              
              // Use setUser to properly set userId and userProfileId
              get().setUser(combinedUser);
            } catch (backendError) {
              console.warn('Failed to fetch user from backend during session restoration:', backendError.message);
              
              // Firebase user exists but no backend user, still consider authenticated
              // This might be a new user who hasn't completed the full registration process
              set({ 
                user: firebaseUser, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
            }
          } else {
            console.log('No Firebase user found during initialization');
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
            error: error.message || 'Initialization failed'
          });
        }
      },

      // Sign in
      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Sign in with Firebase
          const firebaseUser = await authService.signIn(email, password);
          
          // Fetch user data from backend first
          try {
            const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
            
            // Update last login timestamp
            // Update last login in backend only
            try {
              await userService.updateLastLogin(firebaseUser.uid);
              console.log('Backend last login updated for sign-in');
            } catch (loginUpdateError) {
              console.warn('Failed to update backend last login:', loginUpdateError);
            }
            
            // Note: Firebase Auth automatically tracks lastSignInTime
            const combinedUser = { 
              ...firebaseUser, 
              backendUser,
              lastSignInTime: firebaseUser.metadata.lastSignInTime,
              isNewUser: false // Mark as existing user
            };
            
            // Use setUser to properly set userId and userProfileId
            get().setUser(combinedUser);
            return get().user;
          } catch (backendError) {
            console.error('Failed to fetch user from backend during sign-in:', backendError);
            
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
          console.error('Sign-in failed:', error);
          set({ 
            error: error.message || 'Sign-in failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      // Sign up (create user)
      signUp: async (name, email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Step 1: Create user in Firebase Auth
          const firebaseUser = await authService.signUp(email, password);
          console.log('Firebase user created:', firebaseUser.uid);
          
          // Step 2: Prepare user data for backend (single source of truth)
          const userData = {
            firebaseUid: firebaseUser.uid,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            authType: 'email',
            role: 'USER',
            isEmailVerified: firebaseUser.emailVerified || false,
            isActive: true,
            pushNotificationsEnabled: true,
            emailNotificationsEnabled: true,
            workoutRemindersEnabled: true,
            socialNotificationsEnabled: true,
            subscriptionType: 'FREE',
            // Profile fields
            displayName: name.trim(),
            bio: '',
            profilePicture: null,
            dateOfBirth: null,
            gender: null,
            height: null,
            weight: null,
            fitnessLevel: 'BEGINNER',
            goals: [],
            preferences: {}
          };
          
          // Step 3: Create user in backend (primary data store)
          let backendUser = null;
          try {
            backendUser = await userService.createUser(userData);
            console.log('Backend user and profile created successfully');
            
            // Update last login timestamp in backend
            try {
              await userService.updateLastLogin(firebaseUser.uid);
              console.log('Backend last login timestamp set for new user');
            } catch (loginUpdateError) {
              console.warn('Failed to update last login for new user:', loginUpdateError);
            }
          } catch (backendError) {
            console.error('Failed to create backend user:', backendError);
            // Continue with Firebase user only
          }
          
          // Step 4: Optionally create Firestore document (secondary/cache)
          // Skip Firestore creation due to permission issues - backend is primary
          console.log('Skipping Firestore document creation - using backend as primary data store');
          
          // Step 5: Combine user data and update state
          const combinedUser = {
            ...firebaseUser,
            backendUser,
            displayName: name.trim(),
            name: name.trim(),
            lastSignInTime: firebaseUser.metadata.lastSignInTime, // Use Firebase Auth's built-in tracking
            isNewUser: true // Mark as new user
          };
          
          // Use setUser to properly set userId and userProfileId
          get().setUser(combinedUser);
          
          console.log('User signup completed successfully');
          console.log('Stored IDs on signup:', { userId: get().userId, userProfileId: get().userProfileId });
          return get().user;
        } catch (error) {
          console.error('Sign-up failed:', error);
          
          set({ 
            error: error.message || 'Sign-up failed', 
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
          console.log('Google sign-in successful:', firebaseUser.uid);
          
          // Check if user exists in backend, if not create them
          try {
            const backendUser = await userService.getUserByFirebaseUid(firebaseUser.uid);
            console.log('Existing Google user found in backend');
            
            // Update last login timestamp for existing user
            try {
              await userService.updateLastLogin(firebaseUser.uid);
              console.log('Backend last login updated for Google user');
            } catch (loginUpdateError) {
              console.warn('Failed to update backend last login for Google user:', loginUpdateError);
            }
            
            // Note: Firebase Auth automatically tracks lastSignInTime
            const combinedUser = { 
              ...firebaseUser, 
              ...backendUser,
              lastSignInTime: firebaseUser.metadata.lastSignInTime,
              isNewUser: false // Mark as existing user
            };
            set({ 
              user: combinedUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            return combinedUser;
          } catch (backendError) {
            console.log('Google user does not exist in backend, creating new user:', backendError.message);
            
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
                subscriptionType: 'FREE',
                // Profile fields
                displayName: firebaseUser.displayName || 'Google User',
                bio: '',
                profilePicture: firebaseUser.photoURL || null,
                dateOfBirth: null,
                gender: null,
                height: null,
                weight: null,
                fitnessLevel: 'BEGINNER',
                goals: [],
                preferences: {}
              };
              
              // Skip Firestore creation due to permission issues - backend is primary
              console.log('Skipping Firestore document creation - using backend as primary data store');
              
              // Create user in backend (includes UserProfile creation)
              const backendUser = await userService.createUser(userData);
              console.log('Backend user and profile created for Google user');
              
              // Update last login timestamp for new user
              try {
                await userService.updateLastLogin(firebaseUser.uid);
                console.log('Backend last login timestamp set for new Google user');
              } catch (loginUpdateError) {
                console.warn('Failed to update backend last login for new Google user:', loginUpdateError);
              }
              
              // Note: Firebase Auth automatically tracks lastSignInTime
              const combinedUser = { 
                ...firebaseUser, 
                ...backendUser,
                lastSignInTime: firebaseUser.metadata.lastSignInTime,
                isNewUser: true // Mark as new user
              };
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
              const fallbackUser = {
                ...firebaseUser,
                name: firebaseUser.displayName || 'Google User',
                displayName: firebaseUser.displayName || 'Google User'
              };
              
              set({ 
                user: fallbackUser, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
              return fallbackUser;
            }
          }
        } catch (error) {
          console.error('Google sign-in failed:', error);
          set({ 
            error: error.message || 'Google sign-in failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      // Sign out
      signOut: async () => {
        try {
          set({ isLoading: true });
          
          // Sign out from Firebase (this also cleans up tokens)
          await authService.signOut();
          
          // Clear all state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
          
          console.log('User signed out successfully');
        } catch (error) {
          console.error('Sign out failed:', error);
          
          // Even if sign out fails, clear local state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error.message || 'Sign out failed'
          });
        }
      },

      // Update user profile
      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser) {
          throw new Error('No user is currently authenticated');
        }
        
        try {
          set({ isLoading: true });
          
          // Update in backend using Firebase UID
          await userService.updateUser(currentUser.uid, userData);
          console.log('User updated in backend');
          
          // Update local state
          const updatedUser = { ...currentUser, ...userData };
          set({ 
            user: updatedUser,
            isLoading: false,
            error: null
          });
          
          console.log('User profile updated successfully');
          return updatedUser;
        } catch (error) {
          console.error('Failed to update user:', error);
          set({ 
            isLoading: false,
            error: error.message || 'Failed to update user profile'
          });
          throw error;
        }
      },

      // Get current session info
      getSessionInfo: () => {
        const currentUser = get().user;
        if (!currentUser) return null;
        
        return authService.getSessionInfo();
      },

      // Refresh user data
      refreshUserData: async () => {
        const currentUser = get().user;
        if (!currentUser) {
          throw new Error('No user is currently authenticated');
        }
        
        try {
          set({ isLoading: true });
          
          // Try to fetch fresh data from backend
          try {
            const backendUser = await userService.getUserByFirebaseUid(currentUser.uid);
            const updatedUser = { ...currentUser, ...backendUser };
            set({ 
              user: updatedUser,
              isLoading: false,
              error: null
            });
            return updatedUser;
          } catch (backendError) {
            console.warn('Failed to refresh from backend:', backendError.message);
            
            // If backend fails, just keep current user data
            set({ isLoading: false });
            return currentUser;
          }
        } catch (error) {
          console.error('Failed to refresh user data:', error);
          set({ 
            isLoading: false,
            error: error.message || 'Failed to refresh user data'
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        userId: state.userId,
        userProfileId: state.userProfileId,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
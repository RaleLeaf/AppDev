import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

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
          const user = await authService.init();
          set({ 
            user, 
            isAuthenticated: !!user, 
            isLoading: false,
            error: null 
          });
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
          const user = await authService.signIn(email, password);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          return user;
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
          const userCredential = await authService.signUp(email, password);
          const user = userCredential.user || userCredential;
          // Optionally, update user profile with displayName
        //   if (user && name && typeof user.updateProfile === 'function') {
        //     await user.updateProfile({ displayName: name });
        //   }
          // Optionally, create user document in Firestore or backend
          // await api.post('/api/users', { uid: user.uid, name, email });
          set({ 
            user: { ...user, displayName: name },
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          return user;
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
          const user = await authService.signInWithGoogle();
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          return user;
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
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
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
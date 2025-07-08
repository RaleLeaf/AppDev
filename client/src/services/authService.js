import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
    this.tokenRefreshInterval = null;
  }

  // Initialize auth state listener
  init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get fresh ID token and ensure it's valid
          try {
            const token = await user.getIdToken(true); // Force refresh
            localStorage.setItem('authToken', token);
            
            // Set token expiration check
            this.scheduleTokenRefresh(user);
            
            this.currentUser = user;
          } catch (error) {
            console.error('Error getting ID token:', error);
            localStorage.removeItem('authToken');
            this.currentUser = null;
          }
        } else {
          localStorage.removeItem('authToken');
          this.currentUser = null;
          this.cancelTokenRefresh();
        }
        
        // Notify all listeners
        this.authStateListeners.forEach(listener => listener(user));
        resolve(user);
      });
    });
  }

  // Schedule automatic token refresh
  scheduleTokenRefresh(user) {
    // Cancel any existing refresh
    this.cancelTokenRefresh();
    
    // Firebase tokens expire after 1 hour, refresh every 45 minutes
    this.tokenRefreshInterval = setInterval(async () => {
      try {
        if (user && this.currentUser) {
          const token = await user.getIdToken(true);
          localStorage.setItem('authToken', token);
          console.log('Token refreshed automatically');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        // If refresh fails, sign out user
        this.signOut();
      }
    }, 45 * 60 * 1000); // 45 minutes
  }

  // Cancel token refresh
  cancelTokenRefresh() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
    }
  }

  // Subscribe to auth state changes
  onAuthStateChange(callback) {
    this.authStateListeners.push(callback);
    return () => {
      this.authStateListeners = this.authStateListeners.filter(
        listener => listener !== callback
      );
    };
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get fresh ID token
      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);
      
      // Schedule token refresh
      this.scheduleTokenRefresh(user);
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign up with email and password
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get fresh ID token
      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);
      
      // Schedule token refresh
      this.scheduleTokenRefresh(user);
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Get fresh ID token
      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);
      
      // Schedule token refresh
      this.scheduleTokenRefresh(user);
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      // Cancel token refresh
      this.cancelTokenRefresh();
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local storage
      localStorage.removeItem('authToken');
      
      // Clear current user
      this.currentUser = null;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get fresh token with automatic refresh
  async getIdToken(forceRefresh = false) {
    if (this.currentUser) {
      try {
        const token = await this.currentUser.getIdToken(forceRefresh);
        localStorage.setItem('authToken', token);
        return token;
      } catch (error) {
        console.error('Error getting ID token:', error);
        // If token refresh fails, sign out user
        this.signOut();
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Get user session info
  getSessionInfo() {
    if (!this.currentUser) return null;
    
    return {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      displayName: this.currentUser.displayName,
      emailVerified: this.currentUser.emailVerified,
      photoURL: this.currentUser.photoURL,
      creationTime: this.currentUser.metadata.creationTime,
      lastSignInTime: this.currentUser.metadata.lastSignInTime,
      isAnonymous: this.currentUser.isAnonymous,
    };
  }

  // Handle auth errors
  handleAuthError(error) {
    const errorMessages = {
      'auth/user-not-found': 'No user found with this email address.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'Email address is already in use.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/user-disabled': 'This user account has been disabled.',
      'auth/invalid-credential': 'Invalid login credentials.',
      'auth/account-exists-with-different-credential': 'An account already exists with this email but different sign-in method.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
      'auth/popup-blocked': 'Sign-in popup was blocked by your browser.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    };

    return {
      code: error.code,
      message: errorMessages[error.code] || error.message || 'An authentication error occurred.'
    };
  }

  // Clean up resources
  destroy() {
    this.cancelTokenRefresh();
    this.authStateListeners = [];
    this.currentUser = null;
  }
}

export default new AuthService();

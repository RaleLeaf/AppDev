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
  }

  // Initialize auth state listener
  init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get fresh ID token
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          this.currentUser = user;
        } else {
          localStorage.removeItem('authToken');
          this.currentUser = null;
        }
        
        // Notify all listeners
        this.authStateListeners.forEach(listener => listener(user));
        resolve(user);
      });
    });
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
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign up with email and password
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      this.currentUser = null;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get fresh token
  async getIdToken() {
    if (this.currentUser) {
      return await this.currentUser.getIdToken(true);
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
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
    };

    return {
      code: error.code,
      message: errorMessages[error.code] || error.message
    };
  }
}

export default new AuthService();

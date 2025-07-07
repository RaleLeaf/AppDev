import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

class FirestoreService {
  // Create user document in Firestore
  async createUserDocument(uid, userData) {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = {
        uid,
        name: userData.name,
        email: userData.email,
        authType: userData.authType || 'email',
        role: userData.role || 'USER',
        isEmailVerified: userData.isEmailVerified || false,
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        pushNotificationsEnabled: userData.pushNotificationsEnabled !== undefined ? userData.pushNotificationsEnabled : true,
        emailNotificationsEnabled: userData.emailNotificationsEnabled !== undefined ? userData.emailNotificationsEnabled : true,
        workoutRemindersEnabled: userData.workoutRemindersEnabled !== undefined ? userData.workoutRemindersEnabled : true,
        socialNotificationsEnabled: userData.socialNotificationsEnabled !== undefined ? userData.socialNotificationsEnabled : true,
        subscriptionType: userData.subscriptionType || 'FREE',
        profilePicture: userData.profilePicture || null,
        bio: userData.bio || '',
        dateOfBirth: userData.dateOfBirth || null,
        gender: userData.gender || null,
        height: userData.height || null,
        weight: userData.weight || null,
        fitnessLevel: userData.fitnessLevel || 'BEGINNER',
        goals: userData.goals || [],
        preferences: userData.preferences || {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(userRef, userDoc);
      return { id: uid, ...userDoc };
    } catch (error) {
      console.error('Error creating user document:', error);
      throw new Error(`Failed to create user document: ${error.message}`);
    }
  }

  // Get user document from Firestore
  async getUserDocument(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        throw new Error('User document not found');
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      throw new Error(`Failed to get user document: ${error.message}`);
    }
  }

  // Update user document in Firestore
  async updateUserDocument(uid, updates) {
    try {
      const userRef = doc(db, 'users', uid);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(userRef, updateData);
      return { uid, ...updateData };
    } catch (error) {
      console.error('Error updating user document:', error);
      throw new Error(`Failed to update user document: ${error.message}`);
    }
  }

  // Delete user document from Firestore
  async deleteUserDocument(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user document:', error);
      throw new Error(`Failed to delete user document: ${error.message}`);
    }
  }

  // Check if user document exists
  async userDocumentExists(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      return userSnap.exists();
    } catch (error) {
      console.error('Error checking user document existence:', error);
      return false;
    }
  }

  // Update user profile fields
  async updateUserProfile(uid, profileData) {
    try {
      const userRef = doc(db, 'users', uid);
      const updateData = {
        ...profileData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(userRef, updateData);
      return updateData;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error(`Failed to update user profile: ${error.message}`);
    }
  }

  // Update user preferences
  async updateUserPreferences(uid, preferences) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        preferences,
        updatedAt: serverTimestamp()
      });
      return preferences;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw new Error(`Failed to update user preferences: ${error.message}`);
    }
  }

  // Update notification settings
  async updateNotificationSettings(uid, notificationSettings) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...notificationSettings,
        updatedAt: serverTimestamp()
      });
      return notificationSettings;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  }
}

export default new FirestoreService();

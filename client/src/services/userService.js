import api from './api';
import useAuthStore from '../store/authStore';

class UserService {
  // Create a new user in the backend
  async createUser(userData) {
    try {
      const response = await api.post('/api/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw this.handleError(error);
    }
  }

  // Get user by Firebase UID
  async getUserByFirebaseUid(firebaseUid) {
    try {
      const response = await api.get(`/api/users/firebase/${firebaseUid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by Firebase UID:', error);
      throw this.handleError(error);
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const response = await api.get(`/api/users/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw this.handleError(error);
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw this.handleError(error);
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      // If the userId looks like a Firebase UID, use the Firebase endpoint
      if (userId && userId.length > 20) {
        const response = await api.put(`/api/users/firebase/${userId}`, userData);
        return response.data;
      } else {
        const response = await api.put(`/api/users/${userId}`, userData);
        return response.data;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Updates a user's profile information using the stored userProfileId.
   * @param {object} profileData - The profile data to update.
   * @returns {Promise<object>} The updated user profile.
   */
  async updateUserProfile(profileData) {
    try {
      const userProfileId = useAuthStore.getState().userProfileId;
      if (!userProfileId) {
        throw new Error("No userProfileId found in the auth store. Cannot update profile.");
      }
      const response = await api.put(`/api/user-profiles/${userProfileId}`, profileData);
      return this.handleSuccess(response, 'User profile updated successfully.');
    } catch (error) {
      throw this.handleError(error, 'Error updating user profile');
    }
  }

  /**
   * Updates a user's profile information by the profile's own document ID.
   * @param {string} userProfileId - The document ID of the user profile.
   * @param {object} profileData - The profile data to update.
   * @returns {Promise<object>} The updated user profile.
   */
  async updateUserProfileById(userProfileId, profileData) {
    try {
      const response = await api.put(`/api/user-profiles/${userProfileId}`, profileData);
      return this.handleSuccess(response, 'User profile updated successfully.');
    } catch (error) {
      throw this.handleError(error, 'Error updating user profile');
    }
  }

  /**
   * Fetches the current user's profile using the stored userProfileId.
   * @returns {Promise<object>} The user profile.
   */
  async getCurrentUserProfile() {
    try {
      const { userProfileId, user } = useAuthStore.getState();
      
      // Try to fetch by userProfileId first
      if (userProfileId) {
        try {
          const response = await api.get(`/api/user-profiles/${userProfileId}`);
          return this.handleSuccess(response, 'User profile fetched successfully.');
        } catch (error) {
          console.warn('Failed to fetch profile by userProfileId, trying Firebase UID fallback:', error.message);
        }
      }
      
      // Fallback to Firebase UID if userProfileId fails or doesn't exist
      if (user?.uid) {
        const response = await api.get(`/api/user-profiles/by-firebase/${user.uid}`);
        return this.handleSuccess(response, 'User profile fetched successfully via Firebase UID.');
      }
      
      throw new Error("No userProfileId or Firebase UID found. Cannot fetch profile.");
    } catch (error) {
      throw this.handleError(error, 'Error fetching user profile');
    }
  }

  /**
   * Fetches a user's profile by their Firebase UID (for external lookups).
   * @param {string} firebaseUid - The Firebase UID of the user.
   * @returns {Promise<object>} The user profile.
   */
  async getUserProfile(firebaseUid) {
    try {
      const response = await api.get(`/api/user-profiles/by-firebase/${firebaseUid}`);
      return this.handleSuccess(response, 'User profile fetched successfully.');
    } catch (error) {
      throw this.handleError(error, 'Error fetching user profile');
    }
  }

  /**
   * Creates a new user profile.
   * @param {object} profileData - The profile data for the new user.
   * @returns {Promise<object>} The newly created user profile.
   */
  async createUserProfile(profileData) {
    try {
      const response = await api.post('/api/user-profiles', profileData);
      return this.handleSuccess(response, 'User profile created successfully.');
    } catch (error) {
      throw this.handleError(error, 'Error creating user profile');
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.status === 204;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw this.handleError(error);
    }
  }

  // Search users
  async searchUsers(query) {
    try {
      const response = await api.get(`/api/users/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw this.handleError(error);
    }
  }

  // Follow user
  async followUser(targetUserId) {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot follow user.");
      }
      const response = await api.post(`/api/users/${userId}/follow/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      throw this.handleError(error);
    }
  }

  // Unfollow user
  async unfollowUser(targetUserId) {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot unfollow user.");
      }
      const response = await api.delete(`/api/users/${userId}/follow/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw this.handleError(error);
    }
  }

  // Block user
  async blockUser(targetUserId) {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot block user.");
      }
      const response = await api.post(`/api/users/${userId}/block/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw this.handleError(error);
    }
  }

  // Unblock user
  async unblockUser(targetUserId) {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot unblock user.");
      }
      const response = await api.delete(`/api/users/${userId}/block/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error unblocking user:', error);
      throw this.handleError(error);
    }
  }

  // Get current user's followers
  async getMyFollowers() {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot fetch followers.");
      }
      const response = await api.get(`/api/users/${userId}/followers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user followers:', error);
      throw this.handleError(error);
    }
  }

  // Get current user's following
  async getMyFollowing() {
    try {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        throw new Error("No userId found in the auth store. Cannot fetch following.");
      }
      const response = await api.get(`/api/users/${userId}/following`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user following:', error);
      throw this.handleError(error);
    }
  }

  // Update user's last login timestamp
  async updateLastLogin(firebaseUid) {
    try {
      const response = await api.patch(`/api/users/firebase/${firebaseUid}/last-login`);
      return response.data;
    } catch (error) {
      console.error('Error updating last login:', error);
      throw this.handleError(error);
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(userId, preferences) {
    try {
      const response = await api.put(`/api/users/${userId}/notifications`, preferences);
      return response.data;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw this.handleError(error);
    }
  }

  // Helper method to handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText || 'An error occurred';
      
      switch (status) {
        case 400:
          return new Error(`Bad Request: ${message}`);
        case 401:
          return new Error('Unauthorized: Please log in again');
        case 403:
          return new Error('Forbidden: You do not have permission to perform this action');
        case 404:
          return new Error('Not Found: The requested resource does not exist');
        case 409:
          return new Error(`Conflict: ${message}`);
        case 500:
          return new Error('Server Error: Please try again later');
        default:
          return new Error(`Error ${status}: ${message}`);
      }
    } else if (error.request) {
      // Network error
      return new Error('Network Error: Please check your internet connection');
    } else {
      // Other error
      return new Error(`Error: ${error.message}`);
    }
  }

  // Helper method to handle API success responses
  handleSuccess(response, message = 'Operation successful') {
    console.log(message);
    return response.data;
  }
}

export default new UserService();

import api from './api';

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
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw this.handleError(error);
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
  async followUser(userId, targetUserId) {
    try {
      const response = await api.post(`/api/users/${userId}/follow/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      throw this.handleError(error);
    }
  }

  // Unfollow user
  async unfollowUser(userId, targetUserId) {
    try {
      const response = await api.delete(`/api/users/${userId}/follow/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw this.handleError(error);
    }
  }

  // Block user
  async blockUser(userId, targetUserId) {
    try {
      const response = await api.post(`/api/users/${userId}/block/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw this.handleError(error);
    }
  }

  // Unblock user
  async unblockUser(userId, targetUserId) {
    try {
      const response = await api.delete(`/api/users/${userId}/block/${targetUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error unblocking user:', error);
      throw this.handleError(error);
    }
  }

  // Get user followers
  async getUserFollowers(userId) {
    try {
      const response = await api.get(`/api/users/${userId}/followers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user followers:', error);
      throw this.handleError(error);
    }
  }

  // Get user following
  async getUserFollowing(userId) {
    try {
      const response = await api.get(`/api/users/${userId}/following`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user following:', error);
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
}

export default new UserService();

import axios from 'axios';
import authService from './authService';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/'),
  timeout: 30000, // 30 seconds timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 Axios API Configuration:', {
    baseURL: api.defaults.baseURL,
    timeout: api.defaults.timeout,
    headers: api.defaults.headers,
    envVar: import.meta.env.VITE_BACKEND_API_URL,
    usingProxy: api.defaults.baseURL === ''
  });
}

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // Ensure Content-Type is set for all requests
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      
      // Get fresh token for each request
      const token = await authService.getIdToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Add CORS headers
      config.headers['Access-Control-Allow-Origin'] = '*';
      
      // Log request details in development
      if (import.meta.env.DEV) {
        const fullUrl = config.baseURL ? config.baseURL + config.url : config.url;
        console.log(`🚀 ${config.method?.toUpperCase()} ${fullUrl}`, {
          baseURL: config.baseURL || '(using Vite proxy)',
          relativePath: config.url,
          headers: config.headers,
          data: config.data
        });
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      const fullUrl = response.config.baseURL ? response.config.baseURL + response.config.url : response.config.url;
      console.log(`✅ ${response.config.method?.toUpperCase()} ${fullUrl} - ${response.status}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error details in development
    if (import.meta.env.DEV) {
      const fullUrl = originalRequest?.baseURL ? originalRequest?.baseURL + originalRequest?.url : originalRequest?.url;
      console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${fullUrl}`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        message: error.message
      });
    }

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log('Attempting to refresh token for 401 error...');
        // Try to get a fresh token
        const token = await authService.getIdToken(true); // Force refresh
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          console.log('Token refreshed, retrying request...');
          return api(originalRequest);
        } else {
          console.log('No valid token available, signing out...');
          // No token available, redirect to login
          authService.signOut();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      } catch (tokenError) {
        console.error('Token refresh failed:', tokenError);
        authService.signOut();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    // Handle CORS errors specifically
    if (error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
      console.error('CORS or Network error detected:', error);
      return Promise.reject({
        message: 'Network error. Please check if the backend server is running and CORS is configured.',
        type: 'CORS_ERROR',
        originalError: error
      });
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection and backend server.',
        type: 'NETWORK_ERROR',
        originalError: error
      });
    }

    // Handle server errors with more details
    const errorMessage = error.response.data?.message || error.response.statusText || 'An unexpected error occurred';
    return Promise.reject({
      message: errorMessage,
      status: error.response.status,
      type: 'SERVER_ERROR',
      data: error.response.data,
      originalError: error
    });
  }
);

export const likeAPI = {
  // Like a post
  likePost: async (userId, postId) => {
    try {
      const response = await api.post('/api/likes', {
        userId,
        postId
      });
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  // Unlike a post
  unlikePost: async (userId, postId) => {
    try {
      const response = await api.delete(`/api/likes/user/${userId}/post/${postId}`);
      return response.status === 204;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  },

  // Check if user has liked a post
  hasUserLikedPost: async (userId, postId) => {
    try {
      const response = await api.get(`/api/likes/user/${userId}/post/${postId}/exists`);
      return response.data;
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  },

  // Get like count for a post
  getLikeCount: async (postId) => {
    try {
      const response = await api.get(`/api/likes/post/${postId}/count`);
      return response.data;
    } catch (error) {
      console.error('Error getting like count:', error);
      return 0;
    }
  }
};

// Comment API functions
export const commentAPI = {
  // Get comments for a post
  getComments: async (postId) => {
    try {
      const response = await api.get(`/api/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },
  updateCommentUserInfo: async (commentId, userInfo) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}/user-info`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating comment user info:', error);
      return false;
    }
  },

  // Create a comment
  createComment: async (userId, postId, content) => {
    try {
      const response = await api.post('/api/comments', {
        userId,
        postId,
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Get comment count for a post
  getCommentCount: async (postId) => {
    try {
      const response = await api.get(`/api/comments/post/${postId}/count`);
      return response.data;
    } catch (error) {
      console.error('Error getting comment count:', error);
      return 0;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/api/comments/${commentId}`);
      return response.status === 204;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

// User Profile API functions
export const userProfileAPI = {
  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}/profile`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await api.put(`/api/users/${userId}/profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Create user profile
  createUserProfile: async (profileData) => {
    try {
      const response = await api.post(`/api/users/${profileData.userId}/profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
};

export default api;
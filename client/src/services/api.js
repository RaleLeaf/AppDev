import axios from 'axios';
import authService from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080',
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get fresh token for each request
      const token = await authService.getIdToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to get a fresh token
        const token = await authService.getIdToken();
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          // No token available, redirect to login
          authService.signOut();
          window.location.href = '/login';
        }
      } catch (tokenError) {
        console.error('Token refresh failed:', tokenError);
        authService.signOut();
        window.location.href = '/login';
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        type: 'NETWORK_ERROR'
      });
    }

    // Handle server errors
    const errorMessage = error.response.data?.message || 'An unexpected error occurred';
    return Promise.reject({
      message: errorMessage,
      status: error.response.status,
      type: 'SERVER_ERROR'
    });
  }
);

export default api;
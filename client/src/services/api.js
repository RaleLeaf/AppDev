import axios from 'axios';
import useAuthStore from '../store/authStore'; // Corrected: Import the default export
import authService from './authService';

const API_URL = 'http://localhost:8080/';

// Create a new Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || API_URL,
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
  (config) => {
    const token = useAuthStore.getState().token; // Directly use the store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Ensure Content-Type is set for all requests
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    // Remove this line - don't set CORS headers from client side!
    // config.headers['Access-Control-Allow-Origin'] = '*';
    
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

export default api;
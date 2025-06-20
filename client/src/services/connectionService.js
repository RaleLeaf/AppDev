import api from './api';

/**
 * Simple service to test backend connectivity
 */
export const connectionService = {
  testConnection: async () => {
    try {
      console.log('Attempting to connect to backend...');
      
      // Use axios directly to troubleshoot CORS issues
      const response = await api.get('/api/health', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('✅ Backend connection successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error message:', error.message);
      }
      return { status: 'DOWN', message: 'Connection failed' };
    }
  }
};
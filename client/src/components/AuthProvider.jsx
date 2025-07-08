import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const AuthProvider = ({ children }) => {
  const { initialize } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state when app starts
    initialize();
  }, [initialize]);

  return children;
};

export default AuthProvider;

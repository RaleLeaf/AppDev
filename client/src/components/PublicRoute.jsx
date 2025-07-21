import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isSubmitting } = useAuthStore();

  // Show loading spinner only for initial auth check, not for form submissions
  if (isLoading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // If not authenticated, render the public component (login/signup)
  return children;
};

export default PublicRoute;

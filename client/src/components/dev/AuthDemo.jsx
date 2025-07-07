import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useUser from '../../hooks/useUser';

const AuthDemo = () => {
  const navigate = useNavigate();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    signOut, 
    clearErrors 
  } = useAuthStore();
  
  const { 
    searchUsers, 
    getUserById, 
    loading: userLoading,
    error: userError,
    clearError
  } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const handleTestSearchUsers = async () => {
    try {
      clearError();
      const results = await searchUsers('test');
      console.log('Search results:', results);
      alert(`Found ${results.length} users`);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleTestGetUser = async () => {
    try {
      clearError();
      if (user?.id) {
        const userData = await getUserById(user.id);
        console.log('User data:', userData);
        alert(`Got user: ${userData.name || userData.email}`);
      }
    } catch (error) {
      console.error('Get user failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">Authentication Demo</h1>
        
        {/* User Info */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-medium">Name:</span> {user?.displayName || user?.name || 'N/A'}</p>
            <p><span className="font-medium">Email:</span> {user?.email || 'N/A'}</p>
            <p><span className="font-medium">Firebase UID:</span> {user?.uid || 'N/A'}</p>
            <p><span className="font-medium">Backend ID:</span> {user?.id || 'N/A'}</p>
            <p><span className="font-medium">Auth Type:</span> {user?.authType || 'N/A'}</p>
            <p><span className="font-medium">Role:</span> {user?.role || 'N/A'}</p>
            <p><span className="font-medium">Subscription:</span> {user?.subscriptionType || 'N/A'}</p>
          </div>
        </div>

        {/* Error Display */}
        {(error || userError) && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error || userError}</p>
            <button
              onClick={() => {
                clearErrors();
                clearError();
              }}
              className="mt-2 text-red-400 underline hover:text-red-300"
            >
              Clear Error
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleTestSearchUsers}
              disabled={userLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-2 px-4 rounded"
            >
              {userLoading ? 'Loading...' : 'Test Search Users'}
            </button>
            
            <button
              onClick={handleTestGetUser}
              disabled={userLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-2 px-4 rounded"
            >
              {userLoading ? 'Loading...' : 'Get My User Data'}
            </button>
            
            <button
              onClick={() => navigate('/home')}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            >
              Go to Home
            </button>
            
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Raw User Data */}
        <div className="bg-[#2a2a2a] rounded-lg p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Raw User Data</h2>
          <pre className="bg-[#1a1a1a] p-4 rounded overflow-auto text-green-400 text-sm">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;

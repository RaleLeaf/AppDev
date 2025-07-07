import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import firestoreService from '../../services/firestoreService';

const FirestoreTester = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (operation, success, data, error = null) => {
    const result = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      operation,
      success,
      data,
      error
    };
    setTestResults(prev => [result, ...prev]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testCreateUser = async () => {
    setIsLoading(true);
    try {
      const testUserData = {
        name: 'Test User',
        email: 'test@example.com',
        authType: 'email',
        role: 'USER',
        isActive: true,
        subscriptionType: 'FREE'
      };
      
      const result = await firestoreService.createUserDocument('test-uid-123', testUserData);
      addResult('Create User Document', true, result);
    } catch (error) {
      addResult('Create User Document', false, null, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetUser = async () => {
    if (!user?.uid) {
      addResult('Get User Document', false, null, 'No authenticated user');
      return;
    }

    setIsLoading(true);
    try {
      const result = await firestoreService.getUserDocument(user.uid);
      addResult('Get User Document', true, result);
    } catch (error) {
      addResult('Get User Document', false, null, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testUpdateUser = async () => {
    if (!user?.uid) {
      addResult('Update User Document', false, null, 'No authenticated user');
      return;
    }

    setIsLoading(true);
    try {
      const updates = {
        bio: 'Updated via Firestore tester',
        fitnessLevel: 'INTERMEDIATE',
        preferences: {
          theme: 'dark',
          language: 'en'
        }
      };
      
      const result = await firestoreService.updateUserDocument(user.uid, updates);
      addResult('Update User Document', true, result);
    } catch (error) {
      addResult('Update User Document', false, null, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testUserExists = async () => {
    if (!user?.uid) {
      addResult('Check User Exists', false, null, 'No authenticated user');
      return;
    }

    setIsLoading(true);
    try {
      const exists = await firestoreService.userDocumentExists(user.uid);
      addResult('Check User Exists', true, { exists });
    } catch (error) {
      addResult('Check User Exists', false, null, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testUpdateProfile = async () => {
    if (!user?.uid) {
      addResult('Update User Profile', false, null, 'No authenticated user');
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        height: 175,
        weight: 70,
        dateOfBirth: '1990-01-01',
        gender: 'male'
      };
      
      const result = await firestoreService.updateUserProfile(user.uid, profileData);
      addResult('Update User Profile', true, result);
    } catch (error) {
      addResult('Update User Profile', false, null, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please log in to access Firestore Tester</div>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🔥 Firestore Tester</h1>
            <p className="text-gray-400">Test Firebase Firestore operations and document management</p>
          </div>
          <button
            onClick={() => navigate('/dev')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
          >
            ← Back to Dev Dashboard
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">UID:</span>
              <span className="text-white ml-2">{user?.uid || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>
              <span className="text-white ml-2">{user?.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Name:</span>
              <span className="text-white ml-2">{user?.name || user?.displayName || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Firestore Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testCreateUser}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Create Test User
            </button>
            <button
              onClick={testGetUser}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Get Current User
            </button>
            <button
              onClick={testUpdateUser}
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Update User
            </button>
            <button
              onClick={testUserExists}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Check User Exists
            </button>
            <button
              onClick={testUpdateProfile}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Update Profile
            </button>
            <button
              onClick={clearResults}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Test Results</h2>
            <span className="text-gray-400">{testResults.length} results</span>
          </div>
          
          {testResults.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No test results yet. Run some operations to see results here.
            </div>
          ) : (
            <div className="space-y-4">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`border-l-4 p-4 rounded ${
                    result.success 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-red-500 bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${
                        result.success ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.success ? '✓' : '✗'} {result.operation}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">{result.timestamp}</span>
                  </div>
                  
                  {result.error && (
                    <div className="text-red-300 text-sm mb-2">
                      Error: {result.error}
                    </div>
                  )}
                  
                  {result.data && (
                    <div className="text-gray-300 text-sm">
                      <pre className="bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirestoreTester;

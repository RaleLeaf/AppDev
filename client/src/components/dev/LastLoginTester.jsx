import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import userService from '../../services/userService';
import firestoreService from '../../services/firestoreService';
import authService from '../../services/authService';

const LastLoginTester = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signUp, signIn, signOut } = useAuthStore();
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testCredentials, setTestCredentials] = useState({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpass123'
  });

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

  const testCompleteFlow = async () => {
    setIsTesting(true);
    clearResults();
    
    addResult('Flow Test Started', true, { message: '🧪 Testing complete lastLoginAt flow...' });

    try {
      // Step 1: Sign out if already logged in
      if (isAuthenticated) {
        await signOut();
        addResult('Sign Out', true, { message: 'Signed out existing user' });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Step 2: Create new account
      try {
        await signUp(testCredentials.name, testCredentials.email, testCredentials.password);
        addResult('Sign Up', true, { 
          message: 'Account created successfully',
          email: testCredentials.email 
        });
        
        // Check if lastLoginAt was set during signup
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for all updates
        await testCurrentUserLastLogin('After Signup');
        
      } catch (signupError) {
        addResult('Sign Up', false, null, signupError.message);
        
        // If signup fails (user might already exist), try to sign in
        try {
          await signIn(testCredentials.email, testCredentials.password);
          addResult('Sign In (Existing User)', true, { message: 'Signed in with existing account' });
        } catch (signinError) {
          addResult('Sign In (Fallback)', false, null, signinError.message);
          setIsTesting(false);
          return;
        }
      }

      // Step 3: Test manual lastLogin update
      await new Promise(resolve => setTimeout(resolve, 1000));
      await testManualLastLoginUpdate();

      // Step 4: Sign out and sign back in
      await new Promise(resolve => setTimeout(resolve, 1000));
      await signOut();
      addResult('Sign Out', true, { message: 'Signed out for re-login test' });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      await signIn(testCredentials.email, testCredentials.password);
      addResult('Sign In Again', true, { message: 'Signed back in' });
      
      // Step 5: Check lastLogin after re-login
      await new Promise(resolve => setTimeout(resolve, 2000));
      await testCurrentUserLastLogin('After Re-login');

      addResult('Flow Test Completed', true, { message: '✅ Complete flow test finished!' });

    } catch (error) {
      addResult('Flow Test Error', false, null, error.message);
    } finally {
      setIsTesting(false);
    }
  };

  const testCurrentUserLastLogin = async (context) => {
    if (!user?.id) {
      addResult(`Get User Data (${context})`, false, null, 'No user ID available');
      return;
    }

    try {
      const userData = await userService.getUserById(user.id);
      const lastLoginAt = userData.lastLoginAt;
      
      addResult(`Get User Data (${context})`, true, {
        userId: user.id,
        lastLoginAt: lastLoginAt,
        formattedTime: lastLoginAt ? new Date(lastLoginAt).toLocaleString() : 'Not set'
      });
    } catch (error) {
      addResult(`Get User Data (${context})`, false, null, error.message);
    }
  };

  const testManualLastLoginUpdate = async () => {
    if (!user?.id) {
      addResult('Manual Last Login Update', false, null, 'No user ID available');
      return;
    }

    try {
      // Test backend update
      await userService.updateLastLogin(user.id);
      addResult('Backend Last Login Update', true, { message: 'Backend lastLoginAt updated' });
      
      // Test Firestore update
      if (user?.uid) {
        await firestoreService.updateLastLogin(user.uid);
        addResult('Firestore Last Login Update', true, { message: 'Firestore lastLoginAt updated' });
      }
      
    } catch (error) {
      addResult('Manual Last Login Update', false, null, error.message);
    }
  };

  const testDirectAPICall = async () => {
    if (!user?.id) {
      addResult('Direct API Test', false, null, 'No user ID available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}/last-login`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${await authService.getIdToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.text();
        addResult('Direct API Call', true, { message: result });
      } else {
        addResult('Direct API Call', false, null, `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      addResult('Direct API Call', false, null, error.message);
    }
  };

  if (!isAuthenticated && !isTesting) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">LastLogin Tester</div>
          <p className="text-gray-400 mb-6">Test the complete lastLoginAt flow</p>
          <button
            onClick={testCompleteFlow}
            disabled={isTesting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-6 rounded mr-4"
          >
            {isTesting ? 'Testing...' : 'Start Complete Flow Test'}
          </button>
          <button
            onClick={() => navigate('/dev')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Back to Dev Dashboard
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
            <h1 className="text-3xl font-bold text-white mb-2">⏰ LastLogin Tester</h1>
            <p className="text-gray-400">Comprehensive testing for lastLoginAt functionality</p>
          </div>
          <button
            onClick={() => navigate('/dev')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
          >
            ← Back to Dev Dashboard
          </button>
        </div>

        {/* Current User Info */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div><span className="font-medium">Name:</span> {user?.name || user?.displayName || 'N/A'}</div>
            <div><span className="font-medium">Email:</span> {user?.email || 'N/A'}</div>
            <div><span className="font-medium">Backend ID:</span> {user?.id || 'N/A'}</div>
            <div><span className="font-medium">Firebase UID:</span> {user?.uid || 'N/A'}</div>
            <div><span className="font-medium">Last Login:</span> {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}</div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Test Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testCompleteFlow}
              disabled={isTesting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              {isTesting ? 'Testing...' : 'Complete Flow Test'}
            </button>
            <button
              onClick={() => testCurrentUserLastLogin('Manual Check')}
              disabled={isTesting || !user?.id}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Check Current User
            </button>
            <button
              onClick={testManualLastLoginUpdate}
              disabled={isTesting || !user?.id}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Manual Update
            </button>
            <button
              onClick={testDirectAPICall}
              disabled={isTesting || !user?.id}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Direct API Test
            </button>
            <button
              onClick={clearResults}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Test Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={testCredentials.name}
              onChange={(e) => setTestCredentials({...testCredentials, name: e.target.value})}
              placeholder="Name"
              className="bg-[#3a3a3a] text-white p-2 rounded"
            />
            <input
              type="email"
              value={testCredentials.email}
              onChange={(e) => setTestCredentials({...testCredentials, email: e.target.value})}
              placeholder="Email"
              className="bg-[#3a3a3a] text-white p-2 rounded"
            />
            <input
              type="password"
              value={testCredentials.password}
              onChange={(e) => setTestCredentials({...testCredentials, password: e.target.value})}
              placeholder="Password"
              className="bg-[#3a3a3a] text-white p-2 rounded"
            />
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
              No test results yet. Run some tests to see results here.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`border-l-4 p-3 rounded ${
                    result.success 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-red-500 bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${
                      result.success ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.success ? '✓' : '✗'} {result.operation}
                    </span>
                    <span className="text-gray-400 text-xs">{result.timestamp}</span>
                  </div>
                  
                  {result.error && (
                    <div className="text-red-300 text-sm mb-1">
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

export default LastLoginTester;

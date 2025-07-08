import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import authService from '../../services/authService';

const AuthTester = () => {
  const { 
    user, 
    signUp, 
    signIn, 
    signInWithGoogle, 
    signOut, 
    isLoading, 
    error, 
    refreshUserData,
    getSessionInfo,
    initialize 
  } = useAuthStore();
  const [testResults, setTestResults] = useState([]);

  const log = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
    setTestResults(prev => [...prev, logEntry]);
  };

  const clearLogs = () => {
    setTestResults([]);
    console.clear();
  };

  const testSignUp = async () => {
    try {
      log('🧪 Starting comprehensive signup test...', 'info');
      const testEmail = `test${Date.now()}@basick.com`;
      const testName = `Test User ${Date.now()}`;
      
      log(`Creating user: ${testName} (${testEmail})`, 'info');
      const result = await signUp(testName, testEmail, 'password123');
      
      log(`✅ Signup successful!`, 'success');
      log(`Firebase UID: ${result?.uid}`, 'info');
      log(`Backend ID: ${result?.id || 'N/A'}`, 'info');
      log(`Email verified: ${result?.emailVerified}`, 'info');
      log(`Last login: ${result?.lastLoginAt || 'N/A'}`, 'info');
      
      // Verify session info
      const sessionInfo = getSessionInfo();
      log(`Session info: ${JSON.stringify(sessionInfo, null, 2)}`, 'info');
      
    } catch (err) {
      log(`❌ Signup failed: ${err.message}`, 'error');
      console.error('Full signup error:', err);
    }
  };

  const testSignIn = async () => {
    try {
      log('🧪 Starting comprehensive signin test...', 'info');
      const result = await signIn('adminacc123@yahoo.com', 'password123');
      
      log(`✅ Signin successful!`, 'success');
      log(`Firebase UID: ${result?.uid}`, 'info');
      log(`Backend ID: ${result?.id || 'N/A'}`, 'info');
      log(`Email verified: ${result?.emailVerified}`, 'info');
      log(`Last login: ${result?.lastLoginAt || 'N/A'}`, 'info');
      
      // Verify session info
      const sessionInfo = getSessionInfo();
      log(`Session info: ${JSON.stringify(sessionInfo, null, 2)}`, 'info');
      
    } catch (err) {
      log(`❌ Signin failed: ${err.message}`, 'error');
      console.error('Full signin error:', err);
    }
  };

  const testGoogleSignIn = async () => {
    try {
      log('🧪 Starting Google signin test...', 'info');
      const result = await signInWithGoogle();
      
      log(`✅ Google signin successful!`, 'success');
      log(`Firebase UID: ${result?.uid}`, 'info');
      log(`Backend ID: ${result?.id || 'N/A'}`, 'info');
      log(`Display name: ${result?.displayName}`, 'info');
      log(`Last login: ${result?.lastLoginAt || 'N/A'}`, 'info');
      
    } catch (err) {
      log(`❌ Google signin failed: ${err.message}`, 'error');
      console.error('Full Google signin error:', err);
    }
  };

  const testSessionManagement = async () => {
    try {
      log('🧪 Testing session management...', 'info');
      
      // Get current token
      const token = await authService.getIdToken();
      log(`Current token: ${token ? 'Valid' : 'None'}`, 'info');
      
      // Force token refresh
      const freshToken = await authService.getIdToken(true);
      log(`Fresh token: ${freshToken ? 'Valid' : 'None'}`, 'info');
      
      // Check session info
      const sessionInfo = authService.getSessionInfo();
      log(`Session info: ${JSON.stringify(sessionInfo, null, 2)}`, 'info');
      
    } catch (err) {
      log(`❌ Session test failed: ${err.message}`, 'error');
    }
  };

  const testUserDataRefresh = async () => {
    try {
      log('🧪 Testing user data refresh...', 'info');
      const refreshedUser = await refreshUserData();
      log(`✅ User data refreshed successfully`, 'success');
      log(`User: ${JSON.stringify(refreshedUser, null, 2)}`, 'info');
    } catch (err) {
      log(`❌ User refresh failed: ${err.message}`, 'error');
    }
  };

  const testAuthInitialization = async () => {
    try {
      log('🧪 Testing auth initialization...', 'info');
      await initialize();
      log(`✅ Auth initialization completed`, 'success');
      log(`Current user: ${user ? user.email : 'None'}`, 'info');
    } catch (err) {
      log(`❌ Auth initialization failed: ${err.message}`, 'error');
    }
  };

  const checkCurrentUser = () => {
    log('📋 Current user state:', 'info');
    if (user) {
      log(`Email: ${user.email}`, 'info');
      log(`UID: ${user.uid}`, 'info');
      log(`Backend ID: ${user.id || 'N/A'}`, 'info');
      log(`Verified: ${user.emailVerified}`, 'info');
      log(`Auth Type: ${user.authType || 'N/A'}`, 'info');
      log(`Last Login: ${user.lastLoginAt || 'N/A'}`, 'info');
      log(`Full user object:`, 'info');
      log(JSON.stringify(user, null, 2), 'info');
    } else {
      log('No user currently authenticated', 'info');
    }
  };

  const testSignOut = async () => {
    try {
      log('🧪 Testing sign out...', 'info');
      await signOut();
      log(`✅ Sign out successful`, 'success');
    } catch (err) {
      log(`❌ Sign out failed: ${err.message}`, 'error');
    }
  };

  useEffect(() => {
    log('🚀 AuthTester component mounted', 'info');
    log('Current auth state:', 'info');
    log(`User: ${user ? user.email : 'None'}`, 'info');
    log(`Loading: ${isLoading}`, 'info');
    log(`Error: ${error || 'None'}`, 'info');
  }, [user, isLoading, error]);

  useEffect(() => {
    if (user) {
      log(`User state changed: ${user.email || 'No email'}`, 'info');
      log(`LastLoginAt: ${user.lastLoginAt || 'NOT SET'}`, 'info');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Auth & LastLogin Tester</h1>
      
      {/* Current User Status */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-semibold mb-2">Current User Status</h2>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        <p>Authenticated: {user ? 'Yes' : 'No'}</p>
        <p>User Email: {user?.email || 'None'}</p>
        <p>User ID: {user?.id || 'None'}</p>
        <p>Firebase UID: {user?.uid || 'None'}</p>
        <p>LastLoginAt: {user?.lastLoginAt || 'NOT SET'}</p>
        {error && <p className="text-red-400">Error: {error}</p>}
      </div>

      {/* Test Buttons */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          onClick={testSignUp}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50 text-sm"
        >
          Test Signup
        </button>
        
        <button
          onClick={testSignIn}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 text-sm"
        >
          Test Signin
        </button>

        <button
          onClick={testGoogleSignIn}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50 text-sm"
        >
          Test Google
        </button>
        
        <button
          onClick={testSessionManagement}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-50 text-sm"
        >
          Test Session
        </button>

        <button
          onClick={testUserDataRefresh}
          disabled={isLoading || !user}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded disabled:opacity-50 text-sm"
        >
          Refresh Data
        </button>

        <button
          onClick={testAuthInitialization}
          disabled={isLoading}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded disabled:opacity-50 text-sm"
        >
          Test Init
        </button>
        
        <button
          onClick={checkCurrentUser}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
        >
          Check User
        </button>
        
        <button
          onClick={testSignOut}
          disabled={!user}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50 text-sm"
        >
          Sign Out
        </button>
        
        <button
          onClick={clearLogs}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm"
        >
          Clear Logs
        </button>
      </div>

      {/* Test Results */}
      <div className="bg-black p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Test Results & Logs</h2>
        <div className="font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-400">No logs yet. Click a test button to start.</p>
          ) : (
            testResults.map((result, index) => (
              <div 
                key={index} 
                className={`${
                  result.type === 'error' ? 'text-red-400' :
                  result.type === 'success' ? 'text-green-400' :
                  'text-gray-300'
                }`}
              >
                [{result.timestamp}] {result.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTester;

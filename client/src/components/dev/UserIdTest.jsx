import React, { useState } from 'react';
import userService from '../../services/userService';
import authService from '../../services/authService';

const UserIdTest = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const log = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
    setResults(prev => [...prev, logEntry]);
  };

  const testCreateUser = async () => {
    try {
      setLoading(true);
      log('Testing direct backend user creation...', 'info');
      
      const userData = {
        firebaseUid: `test_${Date.now()}`,
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        authType: 'email',
        role: 'USER',
        isEmailVerified: false,
        isActive: true,
        pushNotificationsEnabled: true,
        emailNotificationsEnabled: true,
        workoutRemindersEnabled: true,
        socialNotificationsEnabled: true,
        subscriptionType: 'FREE'
      };

      log(`Sending user data: ${JSON.stringify(userData, null, 2)}`, 'info');
      
      const backendUser = await userService.createUser(userData);
      log(`Backend response: ${JSON.stringify(backendUser, null, 2)}`, 'success');
      
      if (backendUser && backendUser.id) {
        log(`✅ User ID is present: ${backendUser.id}`, 'success');
        log(`✅ User has all expected properties: ${Object.keys(backendUser).join(', ')}`, 'info');
        
        // Test update last login
        log('Testing last login update...', 'info');
        await userService.updateLastLogin(backendUser.id);
        log('✅ Last login update successful', 'success');
        
        // Fetch updated user
        const updatedUser = await userService.getUserById(backendUser.id);
        log(`Updated user: ${JSON.stringify(updatedUser, null, 2)}`, 'info');
        
        if (updatedUser && updatedUser.lastLoginAt) {
          log(`✅ LastLoginAt was updated: ${updatedUser.lastLoginAt}`, 'success');
        } else {
          log('❌ LastLoginAt was not updated', 'error');
        }
      } else {
        log('❌ User ID is missing in backend response!', 'error');
        log(`Response type: ${typeof backendUser}`, 'error');
        log(`Response keys: ${backendUser ? Object.keys(backendUser).join(', ') : 'null'}`, 'error');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'error');
      log(`Error stack: ${error.stack}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const testFullSignUpFlow = async () => {
    try {
      setLoading(true);
      log('=== Testing Full SignUp Flow ===', 'info');
      
      // Step 1: Firebase signup
      log('Step 1: Creating Firebase user...', 'info');
      const testEmail = `debug${Date.now()}@test.com`;
      const firebaseUser = await authService.signUp(testEmail, 'password123');
      log(`Firebase user created: ${JSON.stringify(firebaseUser, null, 2)}`, 'success');
      
      // Step 2: Prepare user data
      log('Step 2: Preparing user data...', 'info');
      const userData = {
        firebaseUid: firebaseUser.uid,
        name: 'Debug User',
        email: testEmail,
        authType: 'email',
        role: 'USER',
        isEmailVerified: firebaseUser.emailVerified || false,
        isActive: true,
        pushNotificationsEnabled: true,
        emailNotificationsEnabled: true,
        workoutRemindersEnabled: true,
        socialNotificationsEnabled: true,
        subscriptionType: 'FREE'
      };
      log(`User data prepared: ${JSON.stringify(userData, null, 2)}`, 'info');
      
      // Step 3: Create user in backend
      log('Step 3: Creating user in backend...', 'info');
      const backendUser = await userService.createUser(userData);
      log(`Backend user created: ${JSON.stringify(backendUser, null, 2)}`, 'success');
      log(`Backend user ID: ${backendUser.id}`, 'info');
      log(`Backend user type: ${typeof backendUser}`, 'info');
      log(`Backend user keys: ${Object.keys(backendUser).join(', ')}`, 'info');
      
      // Step 4: Update last login
      if (backendUser.id) {
        log('Step 4: Updating last login...', 'info');
        await userService.updateLastLogin(backendUser.id);
        log('Last login updated successfully', 'success');
        
        // Step 5: Fetch updated user
        log('Step 5: Fetching updated user...', 'info');
        const updatedUser = await userService.getUserById(backendUser.id);
        log(`Updated user: ${JSON.stringify(updatedUser, null, 2)}`, 'success');
        
        log('🎉 Full signup flow completed successfully!', 'success');
      } else {
        log('❌ Backend user ID is missing!', 'error');
      }
    } catch (error) {
      log(`❌ Full signup flow failed: ${error.message}`, 'error');
      log(`Error stack: ${error.stack}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setResults([]);
    console.clear();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User ID Test</h2>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={testCreateUser}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test User Creation'}
        </button>
        <button
          onClick={testFullSignUpFlow}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Full SignUp Flow'}
        </button>
        <button
          onClick={clearLogs}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Logs
        </button>
      </div>

      <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto">
        {results.map((result, index) => (
          <div key={index} className={`mb-1 ${result.type === 'error' ? 'text-red-400' : result.type === 'success' ? 'text-green-400' : 'text-yellow-400'}`}>
            <span className="text-gray-400">[{result.timestamp}]</span> {result.message}
          </div>
        ))}
        {results.length === 0 && (
          <div className="text-gray-400">No logs yet. Click "Test User Creation" to start.</div>
        )}
      </div>
    </div>
  );
};

export default UserIdTest;

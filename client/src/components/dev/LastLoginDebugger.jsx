import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import userService from '../../services/userService';
import firestoreService from '../../services/firestoreService';

const LastLoginDebugger = () => {
  const { user, signUp, signIn, signOut } = useAuthStore();
  const [debugInfo, setDebugInfo] = useState('');
  const [testEmail, setTestEmail] = useState('test@basick.com');
  const [testPassword, setTestPassword] = useState('password123');
  const [testName, setTestName] = useState('Test User');

  const log = (message) => {
    console.log(message);
    setDebugInfo(prev => prev + '\n' + new Date().toISOString() + ': ' + message);
  };

  const clearLogs = () => {
    setDebugInfo('');
  };

  const testAccountCreation = async () => {
    try {
      log('=== TESTING ACCOUNT CREATION ===');
      log('Creating new account with email: ' + testEmail);
      
      const result = await signUp(testName, testEmail, testPassword);
      log('Account created successfully');
      log('User object: ' + JSON.stringify(result, null, 2));
      
      // Check if lastLoginAt is set in Firestore
      if (result.uid) {
        try {
          const firestoreUser = await firestoreService.getUserDocument(result.uid);
          log('Firestore lastLoginAt: ' + (firestoreUser.lastLoginAt ? firestoreUser.lastLoginAt.toDate().toISOString() : 'NOT SET'));
        } catch (error) {
          log('Error fetching Firestore user: ' + error.message);
        }
      }
      
      // Check if lastLoginAt is set in backend
      if (result.id) {
        try {
          const backendUser = await userService.getUserById(result.id);
          log('Backend lastLoginAt: ' + (backendUser.lastLoginAt || 'NOT SET'));
        } catch (error) {
          log('Error fetching backend user: ' + error.message);
        }
      }
      
    } catch (error) {
      log('Account creation failed: ' + error.message);
    }
  };

  const testLogin = async () => {
    try {
      log('=== TESTING LOGIN ===');
      log('Logging in with email: ' + testEmail);
      
      const result = await signIn(testEmail, testPassword);
      log('Login successful');
      log('User object: ' + JSON.stringify(result, null, 2));
      
      // Check if lastLoginAt is updated in Firestore
      if (result.uid) {
        try {
          const firestoreUser = await firestoreService.getUserDocument(result.uid);
          log('Firestore lastLoginAt after login: ' + (firestoreUser.lastLoginAt ? firestoreUser.lastLoginAt.toDate().toISOString() : 'NOT SET'));
        } catch (error) {
          log('Error fetching Firestore user: ' + error.message);
        }
      }
      
      // Check if lastLoginAt is updated in backend
      if (result.id) {
        try {
          const backendUser = await userService.getUserById(result.id);
          log('Backend lastLoginAt after login: ' + (backendUser.lastLoginAt || 'NOT SET'));
        } catch (error) {
          log('Error fetching backend user: ' + error.message);
        }
      }
      
    } catch (error) {
      log('Login failed: ' + error.message);
    }
  };

  const manuallyUpdateLastLogin = async () => {
    if (!user) {
      log('No user logged in');
      return;
    }
    
    try {
      log('=== MANUALLY UPDATING LAST LOGIN ===');
      
      // Update in backend
      if (user.id) {
        try {
          await userService.updateLastLogin(user.id);
          log('Backend lastLogin updated successfully');
          
          const backendUser = await userService.getUserById(user.id);
          log('Backend lastLoginAt after manual update: ' + (backendUser.lastLoginAt || 'NOT SET'));
        } catch (error) {
          log('Error updating backend lastLogin: ' + error.message);
        }
      }
      
      // Update in Firestore
      if (user.uid) {
        try {
          await firestoreService.updateLastLogin(user.uid);
          log('Firestore lastLogin updated successfully');
          
          const firestoreUser = await firestoreService.getUserDocument(user.uid);
          log('Firestore lastLoginAt after manual update: ' + (firestoreUser.lastLoginAt ? firestoreUser.lastLoginAt.toDate().toISOString() : 'NOT SET'));
        } catch (error) {
          log('Error updating Firestore lastLogin: ' + error.message);
        }
      }
      
    } catch (error) {
      log('Manual update failed: ' + error.message);
    }
  };

  const testBackendEndpoint = async () => {
    if (!user || !user.id) {
      log('No user logged in or no backend user ID');
      return;
    }
    
    try {
      log('=== TESTING BACKEND ENDPOINT DIRECTLY ===');
      log('Testing PATCH /api/users/' + user.id + '/last-login');
      
      const response = await fetch(`http://localhost:8080/api/users/${user.id}/last-login`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const text = await response.text();
        log('Backend endpoint response: ' + text);
        
        // Fetch updated user
        const backendUser = await userService.getUserById(user.id);
        log('Backend lastLoginAt after direct API call: ' + (backendUser.lastLoginAt || 'NOT SET'));
      } else {
        log('Backend endpoint failed: ' + response.status + ' ' + response.statusText);
        const errorText = await response.text();
        log('Error response: ' + errorText);
      }
    } catch (error) {
      log('Backend endpoint test failed: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">LastLogin Debugger</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Test Controls</h2>
          
          <div className="space-y-2">
            <label className="block text-sm">Test Email:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm">Test Password:</label>
            <input
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm">Test Name:</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          
          <div className="space-y-2">
            <button
              onClick={testAccountCreation}
              className="w-full p-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Test Account Creation
            </button>
            
            <button
              onClick={testLogin}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Test Login
            </button>
            
            <button
              onClick={manuallyUpdateLastLogin}
              className="w-full p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
              disabled={!user}
            >
              Manually Update LastLogin
            </button>
            
            <button
              onClick={testBackendEndpoint}
              className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded"
              disabled={!user}
            >
              Test Backend Endpoint Directly
            </button>
            
            <button
              onClick={signOut}
              className="w-full p-2 bg-red-600 hover:bg-red-700 rounded"
              disabled={!user}
            >
              Sign Out
            </button>
            
            <button
              onClick={clearLogs}
              className="w-full p-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Clear Logs
            </button>
          </div>
          
          {/* Current User Info */}
          <div className="mt-6 p-4 bg-gray-800 rounded">
            <h3 className="text-lg font-semibold mb-2">Current User:</h3>
            <pre className="text-sm overflow-auto">
              {user ? JSON.stringify(user, null, 2) : 'Not logged in'}
            </pre>
          </div>
        </div>
        
        {/* Debug Output */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Debug Output</h2>
          <pre className="bg-black p-4 rounded text-sm overflow-auto h-96 font-mono">
            {debugInfo || 'Debug output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LastLoginDebugger;

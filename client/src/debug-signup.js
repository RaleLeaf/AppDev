// Debug test for the signup flow
import userService from '../services/userService.js';
import authService from '../services/authService.js';

window.debugSignUp = async () => {
  console.log('=== DEBUG SIGNUP FLOW ===');
  
  try {
    // Step 1: Firebase signup
    console.log('Step 1: Creating Firebase user...');
    const firebaseUser = await authService.signUp('debug@test.com', 'password123');
    console.log('Firebase user created:', firebaseUser);
    
    // Step 2: Prepare user data
    console.log('Step 2: Preparing user data...');
    const userData = {
      firebaseUid: firebaseUser.uid,
      name: 'Debug User',
      email: 'debug@test.com',
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
    console.log('User data prepared:', userData);
    
    // Step 3: Create user in backend
    console.log('Step 3: Creating user in backend...');
    const backendUser = await userService.createUser(userData);
    console.log('Backend user created:', backendUser);
    console.log('Backend user ID:', backendUser.id);
    console.log('Backend user type:', typeof backendUser);
    console.log('Backend user keys:', Object.keys(backendUser));
    
    // Step 4: Update last login
    if (backendUser.id) {
      console.log('Step 4: Updating last login...');
      await userService.updateLastLogin(backendUser.id);
      console.log('Last login updated successfully');
      
      // Step 5: Fetch updated user
      console.log('Step 5: Fetching updated user...');
      const updatedUser = await userService.getUserById(backendUser.id);
      console.log('Updated user:', updatedUser);
      
      return updatedUser;
    } else {
      console.error('❌ Backend user ID is missing!');
      return null;
    }
  } catch (error) {
    console.error('Debug signup failed:', error);
    throw error;
  }
};

console.log('Debug function loaded. Run window.debugSignUp() to test.');

import { useState } from 'react';
import useAuthStore from '../store/authStore';
import userService from '../services/userService';

// Custom hook for user operations
export const useUser = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOperation = async (operation) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Follow a user
  const followUser = async (targetUserId) => {
    return handleOperation(() => userService.followUser(targetUserId));
  };

  // Unfollow a user
  const unfollowUser = async (targetUserId) => {
    return handleOperation(() => userService.unfollowUser(targetUserId));
  };

  // Block a user
  const blockUser = async (targetUserId) => {
    return handleOperation(() => userService.blockUser(targetUserId));
  };

  // Unblock a user
  const unblockUser = async (targetUserId) => {
    return handleOperation(() => userService.unblockUser(targetUserId));
  };

  // Get current user's followers
  const getFollowers = async () => {
    return handleOperation(() => userService.getMyFollowers());
  };

  // Get current user's following
  const getFollowing = async () => {
    return handleOperation(() => userService.getMyFollowing());
  };

  // Search users
  const searchUsers = async (query) => {
    return handleOperation(() => userService.searchUsers(query));
  };

  // Update current user
  const updateCurrentUser = async (userData) => {
    const { userId } = useAuthStore.getState();
    if (!userId) throw new Error('User not authenticated');
    
    // Check if userData contains profile fields
    const profileFields = ['gender', 'dateOfBirth', 'weight', 'height', 'fitnessLevel', 'preferences'];
    const hasProfileFields = profileFields.some(field => Object.prototype.hasOwnProperty.call(userData, field));
    
    let result;
    if (hasProfileFields) {
      // Use profile update endpoint for profile-specific fields (no userId needed - uses store)
      result = await handleOperation(() => userService.updateUserProfile(userData));
    } else {
      // Use regular user update endpoint for basic user fields
      result = await handleOperation(() => userService.updateUser(userId, userData));
    }
    
    updateUser(result);
    return result;
  };

  // Update notification preferences
  const updateNotificationPreferences = async (preferences) => {
    const { userId } = useAuthStore.getState();
    if (!userId) throw new Error('User not authenticated');
    const result = await handleOperation(() => 
      userService.updateNotificationPreferences(userId, preferences)
    );
    updateUser(result);
    return result;
  };

  // Get user by ID
  const getUserById = async (userId) => {
    return handleOperation(() => userService.getUserById(userId));
  };

  return {
    user,
    loading,
    error,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
    getFollowers,
    getFollowing,
    searchUsers,
    updateCurrentUser,
    updateNotificationPreferences,
    getUserById,
    clearError: () => setError(null)
  };
};

export default useUser;

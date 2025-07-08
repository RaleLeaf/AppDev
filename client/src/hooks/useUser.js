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
    if (!user?.id) throw new Error('User not authenticated');
    return handleOperation(() => userService.followUser(user.id, targetUserId));
  };

  // Unfollow a user
  const unfollowUser = async (targetUserId) => {
    if (!user?.id) throw new Error('User not authenticated');
    return handleOperation(() => userService.unfollowUser(user.id, targetUserId));
  };

  // Block a user
  const blockUser = async (targetUserId) => {
    if (!user?.id) throw new Error('User not authenticated');
    return handleOperation(() => userService.blockUser(user.id, targetUserId));
  };

  // Unblock a user
  const unblockUser = async (targetUserId) => {
    if (!user?.id) throw new Error('User not authenticated');
    return handleOperation(() => userService.unblockUser(user.id, targetUserId));
  };

  // Get user followers
  const getFollowers = async (userId = user?.id) => {
    if (!userId) throw new Error('User ID required');
    return handleOperation(() => userService.getUserFollowers(userId));
  };

  // Get user following
  const getFollowing = async (userId = user?.id) => {
    if (!userId) throw new Error('User ID required');
    return handleOperation(() => userService.getUserFollowing(userId));
  };

  // Search users
  const searchUsers = async (query) => {
    return handleOperation(() => userService.searchUsers(query));
  };

  // Update current user
  const updateCurrentUser = async (userData) => {
    if (!user?.id) throw new Error('User not authenticated');
    const result = await handleOperation(() => userService.updateUser(user.id, userData));
    updateUser(result);
    return result;
  };

  // Update notification preferences
  const updateNotificationPreferences = async (preferences) => {
    if (!user?.id) throw new Error('User not authenticated');
    const result = await handleOperation(() => 
      userService.updateNotificationPreferences(user.id, preferences)
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

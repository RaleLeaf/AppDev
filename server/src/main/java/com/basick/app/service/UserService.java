package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.basick.app.dto.user.*;
import com.basick.app.mapper.UserMapper;
import com.basick.app.model.User;
import com.basick.app.repository.UserRepository;
import com.google.cloud.Timestamp;

/**
 * Service layer for User operations
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * Get all users
     */
    public List<UserDTO> getAllUsers() throws ExecutionException, InterruptedException {
        List<User> users = userRepository.findAll();
        return userMapper.toUserDTOList(users);
    }

    /**
     * Get user by ID
     */
    public UserDTO getUserById(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        return user != null ? userMapper.toUserDTO(user) : null;
    }

    /**
     * Get user by Firebase UID
     */
    public UserDTO getUserByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        return user != null ? userMapper.toUserDTO(user) : null;
    }

    /**
     * Get user by email
     */
    public UserDTO getUserByEmail(String email) throws ExecutionException, InterruptedException {
        User user = userRepository.findByEmail(email);
        return user != null ? userMapper.toUserDTO(user) : null;
    }

    /**
     * Create a new user
     */
    public UserDTO createUser(CreateUserRequest request) throws ExecutionException, InterruptedException {
        User user = userMapper.toUser(request);
        user.setCreatedAt(Timestamp.now());
        user.setUpdatedAt(Timestamp.now());
        
        String userId = userRepository.save(user);
        user.setId(userId);
        
        return userMapper.toUserDTO(user);
    }

    /**
     * Update user
     */
    public UserDTO updateUser(String userId, UpdateUserRequest request) throws ExecutionException, InterruptedException {
        User existingUser = userRepository.findById(userId);
        if (existingUser == null) {
            return null;
        }

        userMapper.updateUserFromRequest(request, existingUser);
        existingUser.setUpdatedAt(Timestamp.now());
        
        userRepository.update(userId, existingUser);
        return userMapper.toUserDTO(existingUser);
    }

    /**
     * Delete user
     */
    public boolean deleteUser(String userId) throws ExecutionException, InterruptedException {
        User existingUser = userRepository.findById(userId);
        if (existingUser == null) {
            return false;
        }
        
        userRepository.delete(userId);
        return true;
    }

    /**
     * Follow a user
     */
    public boolean followUser(String currentUserId, String targetUserId) throws ExecutionException, InterruptedException {
        if (currentUserId.equals(targetUserId)) {
            return false; // Can't follow yourself
        }

        User currentUser = userRepository.findById(currentUserId);
        User targetUser = userRepository.findById(targetUserId);
        
        if (currentUser == null || targetUser == null) {
            return false;
        }

        // Add to following list if not already following
        if (currentUser.getFollowing() != null && !currentUser.getFollowing().contains(targetUserId)) {
            currentUser.getFollowing().add(targetUserId);
            userRepository.update(currentUserId, currentUser);
        }

        // Add to followers list if not already a follower
        if (targetUser.getFollowers() != null && !targetUser.getFollowers().contains(currentUserId)) {
            targetUser.getFollowers().add(currentUserId);
            userRepository.update(targetUserId, targetUser);
        }

        return true;
    }

    /**
     * Unfollow a user
     */
    public boolean unfollowUser(String currentUserId, String targetUserId) throws ExecutionException, InterruptedException {
        User currentUser = userRepository.findById(currentUserId);
        User targetUser = userRepository.findById(targetUserId);
        
        if (currentUser == null || targetUser == null) {
            return false;
        }

        // Remove from following list
        if (currentUser.getFollowing() != null) {
            currentUser.getFollowing().remove(targetUserId);
            userRepository.update(currentUserId, currentUser);
        }

        // Remove from followers list
        if (targetUser.getFollowers() != null) {
            targetUser.getFollowers().remove(currentUserId);
            userRepository.update(targetUserId, targetUser);
        }

        return true;
    }

    /**
     * Block a user
     */
    public boolean blockUser(String currentUserId, String targetUserId) throws ExecutionException, InterruptedException {
        if (currentUserId.equals(targetUserId)) {
            return false; // Can't block yourself
        }

        User currentUser = userRepository.findById(currentUserId);
        if (currentUser == null) {
            return false;
        }

        // Add to blocked users list if not already blocked
        if (currentUser.getBlockedUsers() != null && !currentUser.getBlockedUsers().contains(targetUserId)) {
            currentUser.getBlockedUsers().add(targetUserId);
            userRepository.update(currentUserId, currentUser);
            
            // Also unfollow each other if following
            unfollowUser(currentUserId, targetUserId);
            unfollowUser(targetUserId, currentUserId);
        }

        return true;
    }

    /**
     * Unblock a user
     */
    public boolean unblockUser(String currentUserId, String targetUserId) throws ExecutionException, InterruptedException {
        User currentUser = userRepository.findById(currentUserId);
        if (currentUser == null) {
            return false;
        }

        // Remove from blocked users list
        if (currentUser.getBlockedUsers() != null) {
            currentUser.getBlockedUsers().remove(targetUserId);
            userRepository.update(currentUserId, currentUser);
        }

        return true;
    }

    /**
     * Update notification preferences
     */
    public UserDTO updateNotificationPreferences(String userId, NotificationPreferencesRequest request) 
            throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null) {
            return null;
        }

        if (request.getPushNotificationsEnabled() != null) {
            user.setPushNotificationsEnabled(request.getPushNotificationsEnabled());
        }
        if (request.getEmailNotificationsEnabled() != null) {
            user.setEmailNotificationsEnabled(request.getEmailNotificationsEnabled());
        }
        if (request.getWorkoutRemindersEnabled() != null) {
            user.setWorkoutRemindersEnabled(request.getWorkoutRemindersEnabled());
        }
        if (request.getSocialNotificationsEnabled() != null) {
            user.setSocialNotificationsEnabled(request.getSocialNotificationsEnabled());
        }

        user.setUpdatedAt(Timestamp.now());
        userRepository.update(userId, user);
        
        return userMapper.toUserDTO(user);
    }

    /**
     * Search users by name or email
     */
    public List<UserDTO> searchUsers(String query) throws ExecutionException, InterruptedException {
        List<User> users = userRepository.searchByNameOrEmail(query);
        return userMapper.toUserDTOList(users);
    }

    /**
     * Get user followers
     */
    public List<UserDTO> getUserFollowers(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null || user.getFollowers() == null) {
            return List.of();
        }

        List<User> followers = userRepository.findByIds(user.getFollowers());
        return userMapper.toUserDTOList(followers);
    }

    /**
     * Get users that this user is following
     */
    public List<UserDTO> getUserFollowing(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null || user.getFollowing() == null) {
            return List.of();
        }

        List<User> following = userRepository.findByIds(user.getFollowing());
        return userMapper.toUserDTOList(following);
    }

    /**
     * Update user's last login timestamp
     */
    public void updateLastLogin(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user != null) {
            user.setLastLoginAt(Timestamp.now());
            user.setUpdatedAt(Timestamp.now());
            userRepository.update(userId, user);
        }
    }

    /**
     * Verify user email
     */
    public boolean verifyEmail(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null) {
            return false;
        }

        user.setIsEmailVerified(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.update(userId, user);
        return true;
    }

    /**
     * Verify user phone
     */
    public boolean verifyPhone(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null) {
            return false;
        }

        user.setIsPhoneVerified(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.update(userId, user);
        return true;
    }

    /**
     * Deactivate user account
     */
    public boolean deactivateUser(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null) {
            return false;
        }

        user.setIsActive(false);
        user.setUpdatedAt(Timestamp.now());
        userRepository.update(userId, user);
        return true;
    }

    /**
     * Reactivate user account
     */
    public boolean reactivateUser(String userId) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(userId);
        if (user == null) {
            return false;
        }

        user.setIsActive(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.update(userId, user);
        return true;
    }
}

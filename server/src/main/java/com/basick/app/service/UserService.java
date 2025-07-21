package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.basick.app.dto.user.CreateUserRequest;
import com.basick.app.dto.user.NotificationPreferencesRequest;
import com.basick.app.dto.user.UpdateUserRequest;
import com.basick.app.dto.user.UserDTO;
import com.basick.app.dto.userprofile.UserProfileDTO;
import com.basick.app.mapper.UserMapper;
import com.basick.app.mapper.UserProfileMapper;
import com.basick.app.model.User;
import com.basick.app.model.UserProfile;
import com.basick.app.repository.UserProfileRepository;
import com.basick.app.repository.UserRepository;
import com.google.cloud.Timestamp;

/**
 * Service layer for User operations
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper, UserProfileRepository userProfileRepository, UserProfileMapper userProfileMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userProfileRepository = userProfileRepository;
        this.userProfileMapper = userProfileMapper;
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
        user.setLastLoginAt(Timestamp.now());
        
        // Save user and get the document ID
        String userDocumentId = userRepository.saveUser(user);
        user.setUserId(userDocumentId); // Set the user's own document ID
        
        // Automatically create a corresponding UserProfile using the User document ID
        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(userDocumentId); // Reference to User document ID
        userProfile.setFirebaseUid(user.getFirebaseUid()); // Copy Firebase UID
        userProfile.setName(user.getName()); // Copy name
        userProfile.setEmail(user.getEmail()); // Copy email
        userProfile.setDisplayName(user.getName()); // Default display name to user name
        userProfile.setCreatedAt(Timestamp.now());
        userProfile.setUpdatedAt(Timestamp.now());
        
        // Save the profile and get its ID
        String profileId = userProfileRepository.save(userProfile);
        
        // CRITICAL FIX: Set the userProfileId in the UserProfile object and update it
        userProfile.setUserProfileId(profileId);
        userProfileRepository.update(profileId, userProfile); // Update the profile with its own ID
        
        // Now, link the user to the profile by storing the profile's ID in the user document
        user.setUserProfileId(profileId);
        userRepository.updateUser(userDocumentId, user); // Update the user document with the profile ID
        
        return userMapper.toUserDTO(user);
    }

    /**
     * Update user by Firebase UID
     */
    public UserDTO updateUser(String firebaseUid, UpdateUserRequest request) throws ExecutionException, InterruptedException {
        User existingUser = userRepository.findByFirebaseUid(firebaseUid);
        if (existingUser == null) {
            return null;
        }

        userMapper.updateUserFromRequest(request, existingUser);
        existingUser.setUpdatedAt(Timestamp.now());
        
        userRepository.updateByFirebaseUid(firebaseUid, existingUser);
        return userMapper.toUserDTO(existingUser);
    }

    /**
     * Delete user by Firebase UID
     */
    public boolean deleteUser(String firebaseUid) throws ExecutionException, InterruptedException {
        User existingUser = userRepository.findByFirebaseUid(firebaseUid);
        if (existingUser == null) {
            return false;
        }
        
        // Find the User document ID and delete the associated UserProfile
        String userDocumentId = userRepository.findUserDocumentIdByFirebaseUid(firebaseUid);
        if (userDocumentId != null) {
            userProfileRepository.deleteByUserId(userDocumentId);
        }
        
        userRepository.deleteByFirebaseUid(firebaseUid);
        return true;
    }

    /**
     * Follow a user by Firebase UID
     */
    public boolean followUser(String currentUserFirebaseUid, String targetUserFirebaseUid) throws ExecutionException, InterruptedException {
        if (currentUserFirebaseUid.equals(targetUserFirebaseUid)) {
            return false; // Can't follow yourself
        }

        User currentUser = userRepository.findByFirebaseUid(currentUserFirebaseUid);
        User targetUser = userRepository.findByFirebaseUid(targetUserFirebaseUid);
        
        if (currentUser == null || targetUser == null) {
            return false;
        }

        // Add to following list if not already following (using Firebase UID)
        if (currentUser.getFollowing() != null && !currentUser.getFollowing().contains(targetUserFirebaseUid)) {
            currentUser.getFollowing().add(targetUserFirebaseUid);
            userRepository.updateByFirebaseUid(currentUserFirebaseUid, currentUser);
        }

        // Add to followers list if not already a follower (using Firebase UID)
        if (targetUser.getFollowers() != null && !targetUser.getFollowers().contains(currentUserFirebaseUid)) {
            targetUser.getFollowers().add(currentUserFirebaseUid);
            userRepository.updateByFirebaseUid(targetUserFirebaseUid, targetUser);
        }

        return true;
    }

    /**
     * Unfollow a user by Firebase UID
     */
    public boolean unfollowUser(String currentUserFirebaseUid, String targetUserFirebaseUid) throws ExecutionException, InterruptedException {
        User currentUser = userRepository.findByFirebaseUid(currentUserFirebaseUid);
        User targetUser = userRepository.findByFirebaseUid(targetUserFirebaseUid);
        
        if (currentUser == null || targetUser == null) {
            return false;
        }

        // Remove from following list
        if (currentUser.getFollowing() != null) {
            currentUser.getFollowing().remove(targetUserFirebaseUid);
            userRepository.updateByFirebaseUid(currentUserFirebaseUid, currentUser);
        }

        // Remove from followers list
        if (targetUser.getFollowers() != null) {
            targetUser.getFollowers().remove(currentUserFirebaseUid);
            userRepository.updateByFirebaseUid(targetUserFirebaseUid, targetUser);
        }

        return true;
    }

    /**
     * Block a user by Firebase UID
     */
    public boolean blockUser(String currentUserFirebaseUid, String targetUserFirebaseUid) throws ExecutionException, InterruptedException {
        if (currentUserFirebaseUid.equals(targetUserFirebaseUid)) {
            return false; // Can't block yourself
        }

        User currentUser = userRepository.findByFirebaseUid(currentUserFirebaseUid);
        if (currentUser == null) {
            return false;
        }

        // Add to blocked users list if not already blocked
        if (currentUser.getBlockedUsers() != null && !currentUser.getBlockedUsers().contains(targetUserFirebaseUid)) {
            currentUser.getBlockedUsers().add(targetUserFirebaseUid);
            userRepository.updateByFirebaseUid(currentUserFirebaseUid, currentUser);
            
            // Also unfollow each other if following
            unfollowUser(currentUserFirebaseUid, targetUserFirebaseUid);
            unfollowUser(targetUserFirebaseUid, currentUserFirebaseUid);
        }

        return true;
    }

    /**
     * Unblock a user by Firebase UID
     */
    public boolean unblockUser(String currentUserFirebaseUid, String targetUserFirebaseUid) throws ExecutionException, InterruptedException {
        User currentUser = userRepository.findByFirebaseUid(currentUserFirebaseUid);
        if (currentUser == null) {
            return false;
        }

        // Remove from blocked users list
        if (currentUser.getBlockedUsers() != null) {
            currentUser.getBlockedUsers().remove(targetUserFirebaseUid);
            userRepository.updateByFirebaseUid(currentUserFirebaseUid, currentUser);
        }

        return true;
    }

    /**
     * Update notification preferences by Firebase UID
     */
    public UserDTO updateNotificationPreferences(String firebaseUid, NotificationPreferencesRequest request) 
            throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
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
        userRepository.updateByFirebaseUid(firebaseUid, user);
        
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
     * Get user followers by Firebase UID
     */
    public List<UserDTO> getUserFollowers(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null || user.getFollowers() == null) {
            return List.of();
        }

        List<User> followers = userRepository.findByFirebaseUids(user.getFollowers());
        return userMapper.toUserDTOList(followers);
    }

    /**
     * Get users that this user is following by Firebase UID
     */
    public List<UserDTO> getUserFollowing(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null || user.getFollowing() == null) {
            return List.of();
        }

        List<User> following = userRepository.findByFirebaseUids(user.getFollowing());
        return userMapper.toUserDTOList(following);
    }

    /**
     * Update user's last login timestamp by Firebase UID
     */
    public void updateLastLogin(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user != null) {
            user.setLastLoginAt(Timestamp.now());
            // Don't update updatedAt for lastLogin - only for actual user data changes
            userRepository.updateByFirebaseUid(firebaseUid, user);
        }
    }

    /**
     * Verify user email by Firebase UID
     */
    public boolean verifyEmail(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null) {
            return false;
        }

        user.setIsEmailVerified(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.updateByFirebaseUid(firebaseUid, user);
        return true;
    }

    /**
     * Verify user phone by Firebase UID
     */
    public boolean verifyPhone(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null) {
            return false;
        }

        user.setIsPhoneVerified(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.updateByFirebaseUid(firebaseUid, user);
        return true;
    }

    /**
     * Deactivate user account by Firebase UID
     */
    public boolean deactivateUser(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null) {
            return false;
        }

        user.setIsActive(false);
        user.setUpdatedAt(Timestamp.now());
        userRepository.updateByFirebaseUid(firebaseUid, user);
        return true;
    }

    /**
     * Reactivate user account by Firebase UID
     */
    public boolean reactivateUser(String firebaseUid) throws ExecutionException, InterruptedException {
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null) {
            return false;
        }

        user.setIsActive(true);
        user.setUpdatedAt(Timestamp.now());
        userRepository.updateByFirebaseUid(firebaseUid, user);
        return true;
    }

    /**
     * Get UserProfile by Firebase UID (convenience method)
     */
    public UserProfileDTO getUserProfileByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        // First get the User document ID
        String userDocumentId = userRepository.findUserDocumentIdByFirebaseUid(firebaseUid);
        if (userDocumentId == null) {
            return null;
        }
        
        // Then get the UserProfile using the User document ID
        UserProfile userProfile = userProfileRepository.findByUserId(userDocumentId);
        return userProfile != null ? userProfileMapper.toUserProfileDTO(userProfile) : null;
    }
}

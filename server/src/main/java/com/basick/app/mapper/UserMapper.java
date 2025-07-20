package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.user.CreateUserRequest;
import com.basick.app.dto.user.NotificationPreferencesRequest;
import com.basick.app.dto.user.UpdateUserRequest;
import com.basick.app.dto.user.UserDTO;
import com.basick.app.model.User;
import com.google.cloud.Timestamp;

/**
 * Mapper for converting between User entities and DTOs
 */
@Component
public class UserMapper {

    /**
     * Convert Timestamp to ISO-8601 String format
     */
    private String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        return timestamp.toDate().toInstant().toString();
    }

    /**
     * Convert ISO-8601 String to Timestamp
     */
    private Timestamp stringToTimestamp(String timestampString) {
        if (timestampString == null || timestampString.isEmpty()) {
            return null;
        }
        try {
            return Timestamp.parseTimestamp(timestampString);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Convert User entity to UserDTO
     */
    public UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setFirebaseUid(user.getFirebaseUid());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setIsEmailVerified(user.getIsEmailVerified());
        userDTO.setIsPhoneVerified(user.getIsPhoneVerified());
        userDTO.setIsActive(user.getIsActive());
        userDTO.setCreatedAt(timestampToString(user.getCreatedAt()));
        userDTO.setUpdatedAt(timestampToString(user.getUpdatedAt()));
        userDTO.setLastLoginAt(timestampToString(user.getLastLoginAt()));
        userDTO.setAuthType(user.getAuthType());
        userDTO.setRole(user.getRole());
        userDTO.setFollowing(user.getFollowing());
        userDTO.setFollowers(user.getFollowers());
        userDTO.setBlockedUsers(user.getBlockedUsers());
        userDTO.setPushNotificationsEnabled(user.getPushNotificationsEnabled());
        userDTO.setEmailNotificationsEnabled(user.getEmailNotificationsEnabled());
        userDTO.setWorkoutRemindersEnabled(user.getWorkoutRemindersEnabled());
        userDTO.setSocialNotificationsEnabled(user.getSocialNotificationsEnabled());
        userDTO.setSubscriptionType(user.getSubscriptionType());
        userDTO.setSubscriptionExpiresAt(timestampToString(user.getSubscriptionExpiresAt()));

        return userDTO;
    }

    /**
     * Convert list of User entities to list of UserDTOs
     */
    public List<UserDTO> toUserDTOList(List<User> users) {
        if (users == null) {
            return java.util.Collections.emptyList();
        }
        return users.stream()
                   .map(this::toUserDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Convert CreateUserRequest to User entity
     */
    public User toUser(CreateUserRequest request) {
        if (request == null) {
            return new User(); // Return empty User instead of null
        }

        User user = new User();
        user.setFirebaseUid(request.getFirebaseUid());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAuthType(request.getAuthType());
        user.setRole(request.getRole());
        user.setIsEmailVerified(request.getIsEmailVerified());
        user.setIsPhoneVerified(request.getIsPhoneVerified());
        user.setIsActive(request.getIsActive());
        user.setPushNotificationsEnabled(request.getPushNotificationsEnabled());
        user.setEmailNotificationsEnabled(request.getEmailNotificationsEnabled());
        user.setWorkoutRemindersEnabled(request.getWorkoutRemindersEnabled());
        user.setSocialNotificationsEnabled(request.getSocialNotificationsEnabled());
        user.setSubscriptionType(request.getSubscriptionType());
        user.setSubscriptionExpiresAt(stringToTimestamp(request.getSubscriptionExpiresAt()));

        return user;
    }

    /**
     * Update User entity from UpdateUserRequest
     */
    public void updateUserFromRequest(UpdateUserRequest request, User user) {
        if (request == null || user == null) {
            return;
        }

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getIsEmailVerified() != null) {
            user.setIsEmailVerified(request.getIsEmailVerified());
        }
        if (request.getIsPhoneVerified() != null) {
            user.setIsPhoneVerified(request.getIsPhoneVerified());
        }
        if (request.getIsActive() != null) {
            user.setIsActive(request.getIsActive());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
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
        if (request.getSubscriptionType() != null) {
            user.setSubscriptionType(request.getSubscriptionType());
        }
        if (request.getSubscriptionExpiresAt() != null) {
            user.setSubscriptionExpiresAt(stringToTimestamp(request.getSubscriptionExpiresAt()));
        }
        if (request.getBlockedUsers() != null) {
            user.setBlockedUsers(request.getBlockedUsers());
        }

        user.setUpdatedAt(Timestamp.now());
    }

    /**
     * Update notification preferences in User entity from NotificationPreferencesRequest
     */
    public void updateNotificationPreferences(NotificationPreferencesRequest request, User user) {
        if (request == null || user == null) {
            return;
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
    }

    /**
     * Convert User entity to UserDTO with limited fields (for privacy)
     */
    public UserDTO toPublicUserDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setFirebaseUid(user.getFirebaseUid());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        userDTO.setCreatedAt(timestampToString(user.getCreatedAt()));
        userDTO.setIsActive(user.getIsActive());
        // Don't include private information like phone, notifications, etc.

        return userDTO;
    }

    /**
     * Convert list of User entities to list of public UserDTOs
     */
    public List<UserDTO> toPublicUserDTOList(List<User> users) {
        if (users == null) {
            return java.util.Collections.emptyList();
        }
        return users.stream()
                   .map(this::toPublicUserDTO)
                   .collect(Collectors.toList());
    }
}

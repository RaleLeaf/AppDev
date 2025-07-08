package com.basick.app.mapper;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import com.basick.app.dto.user.CreateUserRequest;
import com.basick.app.dto.user.NotificationPreferencesRequest;
import com.basick.app.dto.user.UpdateUserRequest;
import com.basick.app.dto.user.UserDTO;
import com.basick.app.model.User;
import com.google.cloud.Timestamp;

@ActiveProfiles("test")
class UserMapperTest {

    private UserMapper userMapper;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    void testToDTO_WithValidUser_ShouldReturnUserDTO() {
        // Given
        User user = new User("firebase123", "John Doe", "john@example.com", "EMAIL", "USER");
        user.setPhoneNumber("+1234567890");
        user.setIsEmailVerified(true);
        user.setIsPhoneVerified(false);
        user.setIsActive(true);
        user.setFollowing(Arrays.asList("user1", "user2"));
        user.setFollowers(Arrays.asList("user3", "user4"));
        user.setBlockedUsers(Arrays.asList("user5"));
        user.setPushNotificationsEnabled(true);
        user.setEmailNotificationsEnabled(true);
        user.setWorkoutRemindersEnabled(true);
        user.setSocialNotificationsEnabled(false);
        user.setSubscriptionType("PREMIUM");

        // When
        UserDTO result = userMapper.toUserDTO(user);

        // Then
        assertNotNull(result);
        assertEquals("firebase123", result.getFirebaseUid());
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
        assertEquals("+1234567890", result.getPhoneNumber());
        assertTrue(result.getIsEmailVerified());
        assertFalse(result.getIsPhoneVerified());
        assertTrue(result.getIsActive());
        assertEquals("EMAIL", result.getAuthType());
        assertEquals("USER", result.getRole());
        assertEquals(Arrays.asList("user1", "user2"), result.getFollowing());
        assertEquals(Arrays.asList("user3", "user4"), result.getFollowers());
        assertEquals(Arrays.asList("user5"), result.getBlockedUsers());
        assertTrue(result.getPushNotificationsEnabled());
        assertTrue(result.getEmailNotificationsEnabled());
        assertTrue(result.getWorkoutRemindersEnabled());
        assertFalse(result.getSocialNotificationsEnabled());
        assertEquals("PREMIUM", result.getSubscriptionType());
    }

    @Test
    void testToDTO_WithNullUser_ShouldReturnNull() {
        // When
        UserDTO result = userMapper.toUserDTO(null);

        // Then
        assertNull(result);
    }

    @Test
    void testToEntity_WithValidCreateRequest_ShouldReturnUser() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setFirebaseUid("firebase123");
        request.setName("Jane Doe");
        request.setEmail("jane@example.com");
        request.setPhoneNumber("+1234567890");
        request.setAuthType("GOOGLE");
        request.setRole("TRAINER");
        request.setIsEmailVerified(false);
        request.setIsPhoneVerified(false);
        request.setIsActive(true);
        request.setPushNotificationsEnabled(true);
        request.setEmailNotificationsEnabled(true);
        request.setWorkoutRemindersEnabled(true);
        request.setSocialNotificationsEnabled(true);
        request.setSubscriptionType("FREE");

        // When
        User result = userMapper.toUser(request);

        // Then
        assertNotNull(result);
        assertEquals("firebase123", result.getFirebaseUid());
        assertEquals("Jane Doe", result.getName());
        assertEquals("jane@example.com", result.getEmail());
        assertEquals("+1234567890", result.getPhoneNumber());
        assertEquals("GOOGLE", result.getAuthType());
        assertEquals("TRAINER", result.getRole());
        assertEquals(false, result.getIsEmailVerified());
        assertEquals(false, result.getIsPhoneVerified());
        assertEquals(true, result.getIsActive());
        assertEquals(true, result.getPushNotificationsEnabled());
        assertEquals(true, result.getEmailNotificationsEnabled());
        assertEquals(true, result.getWorkoutRemindersEnabled());
        assertEquals(true, result.getSocialNotificationsEnabled());
        assertEquals("FREE", result.getSubscriptionType());
    }

    @Test
    void testToEntity_WithNullRequest_ShouldReturnEmptyUser() {
        // When
        User result = userMapper.toUser(null);

        // Then
        assertNotNull(result);
        // Should return empty User object instead of null for better usability
    }

    @Test
    void testUpdateEntity_WithValidRequest_ShouldUpdateUserFields() {
        // Given
        User user = new User("firebase123", "John Doe", "john@example.com", "EMAIL", "USER");
        UpdateUserRequest request = new UpdateUserRequest();
        request.setName("John Updated");
        request.setEmail("john.updated@example.com");
        request.setPhoneNumber("+9876543210");
        request.setRole("PREMIUM_USER");
        request.setPushNotificationsEnabled(false);
        request.setEmailNotificationsEnabled(false);
        request.setWorkoutRemindersEnabled(false);
        request.setSocialNotificationsEnabled(true);
        request.setSubscriptionType("PREMIUM");
        request.setBlockedUsers(Arrays.asList("blocked1", "blocked2"));

        Timestamp originalUpdatedAt = user.getUpdatedAt();

        // Add a small delay to ensure timestamp difference
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // When
        userMapper.updateUserFromRequest(request, user);

        // Then
        assertEquals("John Updated", user.getName());
        assertEquals("john.updated@example.com", user.getEmail());
        assertEquals("+9876543210", user.getPhoneNumber());
        assertEquals("PREMIUM_USER", user.getRole());
        assertFalse(user.getPushNotificationsEnabled());
        assertFalse(user.getEmailNotificationsEnabled());
        assertFalse(user.getWorkoutRemindersEnabled());
        assertTrue(user.getSocialNotificationsEnabled());
        assertEquals("PREMIUM", user.getSubscriptionType());
        assertEquals(Arrays.asList("blocked1", "blocked2"), user.getBlockedUsers());
        assertNotEquals(originalUpdatedAt, user.getUpdatedAt());
    }

    @Test
    void testUpdateNotificationPreferences_WithValidRequest_ShouldUpdateNotificationFields() {
        // Given
        User user = new User("firebase123", "John Doe", "john@example.com", "EMAIL", "USER");
        NotificationPreferencesRequest request = new NotificationPreferencesRequest();
        request.setPushNotificationsEnabled(false);
        request.setEmailNotificationsEnabled(false);
        request.setWorkoutRemindersEnabled(true);
        request.setSocialNotificationsEnabled(false);

        Timestamp originalUpdatedAt = user.getUpdatedAt();

        // Add a small delay to ensure timestamp difference
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // When
        userMapper.updateNotificationPreferences(request, user);

        // Then
        assertFalse(user.getPushNotificationsEnabled());
        assertFalse(user.getEmailNotificationsEnabled());
        assertTrue(user.getWorkoutRemindersEnabled());
        assertFalse(user.getSocialNotificationsEnabled());
        assertNotEquals(originalUpdatedAt, user.getUpdatedAt());
    }

    @Test
    void testToDTOList_WithValidUserList_ShouldReturnUserDTOList() {
        // Given
        User user1 = new User("firebase1", "User One", "user1@example.com", "EMAIL", "USER");
        User user2 = new User("firebase2", "User Two", "user2@example.com", "GOOGLE", "TRAINER");
        List<User> users = Arrays.asList(user1, user2);

        // When
        List<UserDTO> result = userMapper.toUserDTOList(users);

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("firebase1", result.get(0).getFirebaseUid());
        assertEquals("User One", result.get(0).getName());
        assertEquals("firebase2", result.get(1).getFirebaseUid());
        assertEquals("User Two", result.get(1).getName());
    }

    @Test
    void testToDTOList_WithNullList_ShouldReturnEmptyList() {
        // When
        List<UserDTO> result = userMapper.toUserDTOList(null);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}

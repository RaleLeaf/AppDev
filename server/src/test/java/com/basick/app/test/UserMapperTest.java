package com.basick.app.test;

import com.basick.app.dto.user.CreateUserRequest;
import com.basick.app.dto.user.UserDTO;
import com.basick.app.mapper.UserMapper;
import com.basick.app.model.User;
import com.google.cloud.Timestamp;

public class UserMapperTest {
    
    public static void main(String[] args) {
        System.out.println("=== Testing UserMapper ===");
        
        UserMapper userMapper = new UserMapper();
        
        // Create a test CreateUserRequest
        CreateUserRequest request = new CreateUserRequest();
        request.setFirebaseUid("test-firebase-uid");
        request.setName("Test User");
        request.setEmail("test@example.com");
        request.setAuthType("email");
        request.setRole("USER");
        request.setIsEmailVerified(false);
        request.setIsActive(true);
        request.setPushNotificationsEnabled(true);
        request.setEmailNotificationsEnabled(true);
        request.setWorkoutRemindersEnabled(true);
        request.setSocialNotificationsEnabled(true);
        request.setSubscriptionType("FREE");
        
        System.out.println("1. CreateUserRequest created");
        System.out.println("   - FirebaseUid: " + request.getFirebaseUid());
        System.out.println("   - Name: " + request.getName());
        System.out.println("   - Email: " + request.getEmail());
        
        // Convert to User model
        User user = userMapper.toUser(request);
        user.setCreatedAt(Timestamp.now());
        user.setUpdatedAt(Timestamp.now());
        
        System.out.println("\n2. User model created");
        System.out.println("   - FirebaseUid: " + user.getFirebaseUid());
        System.out.println("   - Name: " + user.getName());
        System.out.println("   - Email: " + user.getEmail());
        System.out.println("   - CreatedAt: " + user.getCreatedAt());
        System.out.println("   - UpdatedAt: " + user.getUpdatedAt());
        System.out.println("   - LastLoginAt: " + user.getLastLoginAt());
        
        // Note: User model no longer has ID field - Firebase UID is the identifier
        System.out.println("\n3. User model uses Firebase UID as identifier");
        System.out.println("   - FirebaseUid: " + user.getFirebaseUid());
        
        // Convert to UserDTO
        UserDTO userDTO = userMapper.toUserDTO(user);
        
        System.out.println("\n4. UserDTO created");
        System.out.println("   - FirebaseUid: " + userDTO.getFirebaseUid());
        System.out.println("   - Name: " + userDTO.getName());
        System.out.println("   - Email: " + userDTO.getEmail());
        System.out.println("   - CreatedAt: " + userDTO.getCreatedAt());
        System.out.println("   - UpdatedAt: " + userDTO.getUpdatedAt());
        System.out.println("   - LastLoginAt: " + userDTO.getLastLoginAt());
        
        // Test Firebase UID presence
        if (userDTO.getFirebaseUid() != null && !userDTO.getFirebaseUid().isEmpty()) {
            System.out.println("\n✅ SUCCESS: UserDTO has Firebase UID: " + userDTO.getFirebaseUid());
        } else {
            System.out.println("\n❌ FAILURE: UserDTO Firebase UID is null or empty");
        }
    }
}

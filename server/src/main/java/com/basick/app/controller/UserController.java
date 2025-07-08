package com.basick.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.user.CreateUserRequest;
import com.basick.app.dto.user.NotificationPreferencesRequest;
import com.basick.app.dto.user.UpdateUserRequest;
import com.basick.app.dto.user.UserDTO;
import com.basick.app.service.UserService;

/**
 * REST controller for User operations
 */
@RestController
@RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users (for admin purposes)
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId) {
        try {
            UserDTO user = userService.getUserById(userId);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user by Firebase UID
     */
    @GetMapping("/firebase/{firebaseUid}")
    public ResponseEntity<UserDTO> getUserByFirebaseUid(@PathVariable String firebaseUid) {
        try {
            UserDTO user = userService.getUserByFirebaseUid(firebaseUid);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user by email
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        try {
            UserDTO user = userService.getUserByEmail(email);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new user
     */
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequest request) {
        try {
            UserDTO user = userService.createUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable String userId,
            @RequestBody UpdateUserRequest request) {
        try {
            UserDTO user = userService.updateUser(userId, request);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete user
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        try {
            boolean deleted = userService.deleteUser(userId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Follow a user
     */
    @PostMapping("/{userId}/follow/{targetUserId}")
    public ResponseEntity<String> followUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        try {
            boolean success = userService.followUser(userId, targetUserId);
            return success ? ResponseEntity.ok("User followed successfully") : ResponseEntity.badRequest().body("Failed to follow user");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error following user");
        }
    }

    /**
     * Unfollow a user
     */
    @DeleteMapping("/{userId}/follow/{targetUserId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        try {
            boolean success = userService.unfollowUser(userId, targetUserId);
            return success ? ResponseEntity.ok("User unfollowed successfully") : ResponseEntity.badRequest().body("Failed to unfollow user");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error unfollowing user");
        }
    }

    /**
     * Block a user
     */
    @PostMapping("/{userId}/block/{targetUserId}")
    public ResponseEntity<String> blockUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        try {
            boolean success = userService.blockUser(userId, targetUserId);
            return success ? ResponseEntity.ok("User blocked successfully") : ResponseEntity.badRequest().body("Failed to block user");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error blocking user");
        }
    }

    /**
     * Unblock a user
     */
    @DeleteMapping("/{userId}/block/{targetUserId}")
    public ResponseEntity<String> unblockUser(
            @PathVariable String userId,
            @PathVariable String targetUserId) {
        try {
            boolean success = userService.unblockUser(userId, targetUserId);
            return success ? ResponseEntity.ok("User unblocked successfully") : ResponseEntity.badRequest().body("Failed to unblock user");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error unblocking user");
        }
    }

    /**
     * Update notification preferences
     */
    @PutMapping("/{userId}/notifications")
    public ResponseEntity<UserDTO> updateNotificationPreferences(
            @PathVariable String userId,
            @RequestBody NotificationPreferencesRequest request) {
        try {
            UserDTO user = userService.updateNotificationPreferences(userId, request);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search users by name or username
     */
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(@RequestParam String query) {
        try {
            List<UserDTO> users = userService.searchUsers(query);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user's last login timestamp
     */
    @PatchMapping("/{userId}/last-login")
    public ResponseEntity<String> updateLastLogin(@PathVariable String userId) {
        try {
            userService.updateLastLogin(userId);
            return ResponseEntity.ok("Last login updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update last login: " + e.getMessage());
        }
    }

    /**
     * Update user's last login timestamp by Firebase UID
     */
    @PatchMapping("/firebase/{firebaseUid}/last-login")
    public ResponseEntity<String> updateLastLoginByFirebaseUid(@PathVariable String firebaseUid) {
        try {
            userService.updateLastLogin(firebaseUid);
            return ResponseEntity.ok("Last login updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update last login: " + e.getMessage());
        }
    }

    /**
     * Get user's followers
     */
    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserDTO>> getUserFollowers(@PathVariable String userId) {
        try {
            List<UserDTO> followers = userService.getUserFollowers(userId);
            return ResponseEntity.ok(followers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user's following
     */
    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserDTO>> getUserFollowing(@PathVariable String userId) {
        try {
            List<UserDTO> following = userService.getUserFollowing(userId);
            return ResponseEntity.ok(following);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

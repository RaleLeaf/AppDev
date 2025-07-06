package com.basick.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.userprofile.*;
import com.basick.app.service.UserProfileService;

/**
 * REST controller for UserProfile operations
 */
@RestController
@RequestMapping("/api/users/{userId}/profile")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Get user profile by user ID
     */
    @GetMapping
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable String userId) {
        try {
            UserProfileDTO profile = userProfileService.getUserProfileByUserId(userId);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create user profile
     */
    @PostMapping
    public ResponseEntity<UserProfileDTO> createUserProfile(
            @RequestBody CreateUserProfileRequest request) {
        try {
            UserProfileDTO profile = userProfileService.createUserProfile(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user profile
     */
    @PutMapping
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            @PathVariable String userId,
            @RequestBody UpdateUserProfileRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateUserProfile(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete user profile
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteUserProfile(@PathVariable String userId) {
        try {
            boolean deleted = userProfileService.deleteUserProfile(userId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update profile picture
     */
    @PutMapping("/picture")
    public ResponseEntity<UserProfileDTO> updateProfilePicture(
            @PathVariable String userId,
            @RequestBody UpdateProfilePictureRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateProfilePicture(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update fitness metrics
     */
    @PutMapping("/fitness")
    public ResponseEntity<UserProfileDTO> updateFitnessMetrics(
            @PathVariable String userId,
            @RequestBody UpdateFitnessMetricsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateFitnessMetrics(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update privacy settings
     */
    @PutMapping("/privacy")
    public ResponseEntity<UserProfileDTO> updatePrivacySettings(
            @PathVariable String userId,
            @RequestBody UpdatePrivacySettingsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updatePrivacySettings(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update fitness goals
     */
    @PutMapping("/goals")
    public ResponseEntity<UserProfileDTO> updateFitnessGoals(
            @PathVariable String userId,
            @RequestBody UpdateFitnessGoalsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateFitnessGoals(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Add achievement
     */
    @PostMapping("/achievements")
    public ResponseEntity<UserProfileDTO> addAchievement(
            @PathVariable String userId,
            @RequestBody AddAchievementRequest request) {
        try {
            UserProfileDTO profile = userProfileService.addAchievement(userId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update workout streak
     */
    @PutMapping("/streak")
    public ResponseEntity<UserProfileDTO> updateWorkoutStreak(@PathVariable String userId) {
        try {
            UserProfileDTO profile = userProfileService.updateWorkoutStreak(userId);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get public profiles (for discovery)
     */
    @GetMapping("/public")
    public ResponseEntity<List<UserProfileDTO>> getPublicProfiles() {
        try {
            List<UserProfileDTO> profiles = userProfileService.getPublicProfiles();
            return ResponseEntity.ok(profiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

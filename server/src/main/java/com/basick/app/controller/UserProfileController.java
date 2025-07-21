package com.basick.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.userprofile.AddAchievementRequest;
import com.basick.app.dto.userprofile.CreateUserProfileRequest;
import com.basick.app.dto.userprofile.UpdateFitnessGoalsRequest;
import com.basick.app.dto.userprofile.UpdateFitnessMetricsRequest;
import com.basick.app.dto.userprofile.UpdatePrivacySettingsRequest;
import com.basick.app.dto.userprofile.UpdateProfilePictureRequest;
import com.basick.app.dto.userprofile.UpdateUserProfileRequest;
import com.basick.app.dto.userprofile.UserProfileDTO;
import com.basick.app.service.UserProfileService;

/**
 * REST controller for UserProfile operations
 */
@RestController
@RequestMapping("/api/user-profiles")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Get user profile by userProfileId
     */
    @GetMapping("/{userProfileId}")
    public ResponseEntity<UserProfileDTO> getUserProfileById(@PathVariable String userProfileId) {
        try {
            UserProfileDTO profile = userProfileService.getUserProfileById(userProfileId);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user profile by user ID
     */
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfileByUserId(@PathVariable String userId) {
        try {
            UserProfileDTO profile = userProfileService.getUserProfileByUserId(userId);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user profile by Firebase UID
     */
    @GetMapping("/by-firebase/{firebaseUid}")
    public ResponseEntity<UserProfileDTO> getUserProfileByFirebaseUid(@PathVariable String firebaseUid) {
        try {
            UserProfileDTO profile = userProfileService.getUserProfileByFirebaseUid(firebaseUid);
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
     * Update user profile by its own ID
     */
    @PutMapping("/{userProfileId}")
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            @PathVariable String userProfileId,
            @RequestBody UpdateUserProfileRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateUserProfile(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user profile by Firebase UID
     */
    @PutMapping("/by-firebase/{firebaseUid}")
    public ResponseEntity<UserProfileDTO> updateUserProfileByFirebaseUid(
            @PathVariable String firebaseUid,
            @RequestBody UpdateUserProfileRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateUserProfileByFirebaseUid(firebaseUid, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete user profile
     */
    @DeleteMapping("/{userProfileId}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable String userProfileId) {
        try {
            boolean deleted = userProfileService.deleteUserProfile(userProfileId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update profile picture
     */
    @PutMapping("/{userProfileId}/picture")
    public ResponseEntity<UserProfileDTO> updateProfilePicture(
            @PathVariable String userProfileId,
            @RequestBody UpdateProfilePictureRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateProfilePicture(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update fitness metrics
     */
    @PutMapping("/{userProfileId}/fitness-metrics")
    public ResponseEntity<UserProfileDTO> updateFitnessMetrics(
            @PathVariable String userProfileId,
            @RequestBody UpdateFitnessMetricsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateFitnessMetrics(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update privacy settings
     */
    @PutMapping("/{userProfileId}/privacy")
    public ResponseEntity<UserProfileDTO> updatePrivacySettings(
            @PathVariable String userProfileId,
            @RequestBody UpdatePrivacySettingsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updatePrivacySettings(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update fitness goals
     */
    @PutMapping("/{userProfileId}/fitness-goals")
    public ResponseEntity<UserProfileDTO> updateFitnessGoals(
            @PathVariable String userProfileId,
            @RequestBody UpdateFitnessGoalsRequest request) {
        try {
            UserProfileDTO profile = userProfileService.updateFitnessGoals(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Add achievement
     */
    @PostMapping("/{userProfileId}/achievements")
    public ResponseEntity<UserProfileDTO> addAchievement(
            @PathVariable String userProfileId,
            @RequestBody AddAchievementRequest request) {
        try {
            UserProfileDTO profile = userProfileService.addAchievement(userProfileId, request);
            return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get public profiles
     */
    @GetMapping("/public")
    public ResponseEntity<List<UserProfileDTO>> getPublicProfiles() {
        try {
            List<UserProfileDTO> profiles = userProfileService.getPublicUserProfiles();
            return ResponseEntity.ok(profiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

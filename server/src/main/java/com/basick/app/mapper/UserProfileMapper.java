package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.userprofile.*;
import com.basick.app.model.UserProfile;
import com.google.cloud.Timestamp;

/**
 * Mapper for converting between UserProfile entities and DTOs
 */
@Component
public class UserProfileMapper {

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
     * Convert UserProfile entity to UserProfileDTO
     */
    public UserProfileDTO toUserProfileDTO(UserProfile userProfile) {
        if (userProfile == null) {
            return null;
        }

        UserProfileDTO userProfileDTO = new UserProfileDTO();
        
        // Copy inherited User fields
        userProfileDTO.setId(userProfile.getId());
        userProfileDTO.setFirebaseUid(userProfile.getFirebaseUid());
        userProfileDTO.setName(userProfile.getName());
        userProfileDTO.setEmail(userProfile.getEmail());
        userProfileDTO.setPhoneNumber(userProfile.getPhoneNumber());
        userProfileDTO.setIsEmailVerified(userProfile.getIsEmailVerified());
        userProfileDTO.setIsPhoneVerified(userProfile.getIsPhoneVerified());
        userProfileDTO.setIsActive(userProfile.getIsActive());
        userProfileDTO.setCreatedAt(timestampToString(userProfile.getCreatedAt()));
        userProfileDTO.setUpdatedAt(timestampToString(userProfile.getUpdatedAt()));
        userProfileDTO.setLastLoginAt(timestampToString(userProfile.getLastLoginAt()));
        userProfileDTO.setAuthType(userProfile.getAuthType());
        userProfileDTO.setRole(userProfile.getRole());
        userProfileDTO.setFollowing(userProfile.getFollowing());
        userProfileDTO.setFollowers(userProfile.getFollowers());
        userProfileDTO.setBlockedUsers(userProfile.getBlockedUsers());
        userProfileDTO.setPushNotificationsEnabled(userProfile.getPushNotificationsEnabled());
        userProfileDTO.setEmailNotificationsEnabled(userProfile.getEmailNotificationsEnabled());
        userProfileDTO.setWorkoutRemindersEnabled(userProfile.getWorkoutRemindersEnabled());
        userProfileDTO.setSocialNotificationsEnabled(userProfile.getSocialNotificationsEnabled());
        userProfileDTO.setSubscriptionType(userProfile.getSubscriptionType());
        userProfileDTO.setSubscriptionExpiresAt(timestampToString(userProfile.getSubscriptionExpiresAt()));
        
        // Copy UserProfile-specific fields
        userProfileDTO.setUserId(userProfile.getUserId());
        userProfileDTO.setUsername(userProfile.getUsername());
        userProfileDTO.setDisplayName(userProfile.getDisplayName());
        userProfileDTO.setFirstName(userProfile.getFirstName());
        userProfileDTO.setLastName(userProfile.getLastName());
        userProfileDTO.setProfilePictureUrl(userProfile.getProfilePictureUrl());
        userProfileDTO.setBio(userProfile.getBio());
        userProfileDTO.setGender(userProfile.getGender());
        userProfileDTO.setAge(userProfile.getAge());
        userProfileDTO.setHeight(userProfile.getHeight());
        userProfileDTO.setWeight(userProfile.getWeight());
        userProfileDTO.setFitnessLevel(userProfile.getFitnessLevel());
        userProfileDTO.setFitnessGoals(userProfile.getFitnessGoals());
        userProfileDTO.setPreferences(userProfile.getPreferences());
        userProfileDTO.setLocation(userProfile.getLocation());
        userProfileDTO.setTimezone(userProfile.getTimezone());
        userProfileDTO.setFollowersCount(userProfile.getFollowersCount());
        userProfileDTO.setFollowingCount(userProfile.getFollowingCount());
        userProfileDTO.setPostsCount(userProfile.getPostsCount());
        userProfileDTO.setWorkoutsCompletedCount(userProfile.getWorkoutsCompletedCount());
        userProfileDTO.setTotalWorkoutMinutes(userProfile.getTotalWorkoutMinutes());
        userProfileDTO.setIsProfilePublic(userProfile.getIsProfilePublic());
        userProfileDTO.setShareWorkouts(userProfile.getShareWorkouts());
        userProfileDTO.setShareProgress(userProfile.getShareProgress());
        userProfileDTO.setBmi(userProfile.getBmi());
        userProfileDTO.setBmiCategory(userProfile.getBmiCategory());
        userProfileDTO.setTargetWeight(userProfile.getTargetWeight());
        userProfileDTO.setDailyCalorieGoal(userProfile.getDailyCalorieGoal());
        userProfileDTO.setWeeklyWorkoutGoal(userProfile.getWeeklyWorkoutGoal());
        userProfileDTO.setLastActiveAt(userProfile.getLastActiveAt());
        userProfileDTO.setStreakDays(userProfile.getStreakDays());
        userProfileDTO.setLongestStreak(userProfile.getLongestStreak());
        userProfileDTO.setAchievements(userProfile.getAchievements());
        userProfileDTO.setTotalPoints(userProfile.getTotalPoints());
        userProfileDTO.setCurrentRank(userProfile.getCurrentRank());

        return userProfileDTO;
    }

    /**
     * Convert list of UserProfile entities to list of UserProfileDTOs
     */
    public List<UserProfileDTO> toUserProfileDTOList(List<UserProfile> userProfiles) {
        if (userProfiles == null) {
            return null;
        }
        return userProfiles.stream()
                   .map(this::toUserProfileDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Convert CreateUserProfileRequest to UserProfile entity
     */
    public UserProfile toUserProfile(CreateUserProfileRequest request) {
        if (request == null) {
            return null;
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(request.getUserId());
        userProfile.setUsername(request.getUsername());
        userProfile.setDisplayName(request.getDisplayName());
        userProfile.setFirstName(request.getFirstName());
        userProfile.setLastName(request.getLastName());
        userProfile.setProfilePictureUrl(request.getProfilePictureUrl());
        userProfile.setBio(request.getBio());
        userProfile.setGender(request.getGender());
        userProfile.setAge(request.getAge());
        userProfile.setHeight(request.getHeight());
        userProfile.setWeight(request.getWeight());
        userProfile.setFitnessLevel(request.getFitnessLevel());
        userProfile.setFitnessGoals(request.getFitnessGoals());
        userProfile.setPreferences(request.getPreferences());
        userProfile.setLocation(request.getLocation());
        userProfile.setTimezone(request.getTimezone());
        userProfile.setIsProfilePublic(request.getIsProfilePublic());
        userProfile.setShareWorkouts(request.getShareWorkouts());
        userProfile.setShareProgress(request.getShareProgress());
        userProfile.setTargetWeight(request.getTargetWeight());
        userProfile.setDailyCalorieGoal(request.getDailyCalorieGoal());
        userProfile.setWeeklyWorkoutGoal(request.getWeeklyWorkoutGoal());

        return userProfile;
    }

    /**
     * Update UserProfile entity from UpdateUserProfileRequest
     */
    public void updateUserProfileFromRequest(UpdateUserProfileRequest request, UserProfile userProfile) {
        if (request == null || userProfile == null) {
            return;
        }

        if (request.getUsername() != null) {
            userProfile.setUsername(request.getUsername());
        }
        if (request.getDisplayName() != null) {
            userProfile.setDisplayName(request.getDisplayName());
        }
        if (request.getFirstName() != null) {
            userProfile.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            userProfile.setLastName(request.getLastName());
        }
        if (request.getBio() != null) {
            userProfile.setBio(request.getBio());
        }
        if (request.getGender() != null) {
            userProfile.setGender(request.getGender());
        }
        if (request.getAge() != null) {
            userProfile.setAge(request.getAge());
        }
        if (request.getHeight() != null) {
            userProfile.setHeight(request.getHeight());
        }
        if (request.getWeight() != null) {
            userProfile.setWeight(request.getWeight());
        }
        if (request.getFitnessLevel() != null) {
            userProfile.setFitnessLevel(request.getFitnessLevel());
        }
        if (request.getFitnessGoals() != null) {
            userProfile.setFitnessGoals(request.getFitnessGoals());
        }
        if (request.getPreferences() != null) {
            userProfile.setPreferences(request.getPreferences());
        }
        if (request.getLocation() != null) {
            userProfile.setLocation(request.getLocation());
        }
        if (request.getTimezone() != null) {
            userProfile.setTimezone(request.getTimezone());
        }
        if (request.getIsProfilePublic() != null) {
            userProfile.setIsProfilePublic(request.getIsProfilePublic());
        }
        if (request.getShareWorkouts() != null) {
            userProfile.setShareWorkouts(request.getShareWorkouts());
        }
        if (request.getShareProgress() != null) {
            userProfile.setShareProgress(request.getShareProgress());
        }
        if (request.getTargetWeight() != null) {
            userProfile.setTargetWeight(request.getTargetWeight());
        }
        if (request.getDailyCalorieGoal() != null) {
            userProfile.setDailyCalorieGoal(request.getDailyCalorieGoal());
        }
        if (request.getWeeklyWorkoutGoal() != null) {
            userProfile.setWeeklyWorkoutGoal(request.getWeeklyWorkoutGoal());
        }
    }

    /**
     * Convert UserProfile entity to UserProfileDTO with limited fields (for public viewing)
     */
    public UserProfileDTO toPublicUserProfileDTO(UserProfile userProfile) {
        if (userProfile == null) {
            return null;
        }

        // Only return public information based on privacy settings
        if (!userProfile.getIsProfilePublic()) {
            // Return minimal information for private profiles
            UserProfileDTO userProfileDTO = new UserProfileDTO();
            userProfileDTO.setId(userProfile.getId());
            userProfileDTO.setUserId(userProfile.getUserId());
            userProfileDTO.setUsername(userProfile.getUsername());
            userProfileDTO.setDisplayName(userProfile.getDisplayName());
            userProfileDTO.setProfilePictureUrl(userProfile.getProfilePictureUrl());
            userProfileDTO.setIsProfilePublic(false);
            return userProfileDTO;
        }

        // Return full information for public profiles (excluding sensitive data)
        UserProfileDTO userProfileDTO = toUserProfileDTO(userProfile);
        
        // Remove sensitive inherited User information
        userProfileDTO.setFirebaseUid(null);
        userProfileDTO.setEmail(null);
        userProfileDTO.setPhoneNumber(null);
        userProfileDTO.setIsEmailVerified(null);
        userProfileDTO.setIsPhoneVerified(null);
        userProfileDTO.setFollowing(null);
        userProfileDTO.setFollowers(null);
        userProfileDTO.setBlockedUsers(null);
        userProfileDTO.setPushNotificationsEnabled(null);
        userProfileDTO.setEmailNotificationsEnabled(null);
        userProfileDTO.setWorkoutRemindersEnabled(null);
        userProfileDTO.setSocialNotificationsEnabled(null);
        userProfileDTO.setSubscriptionType(null);
        userProfileDTO.setSubscriptionExpiresAt(null);

        return userProfileDTO;
    }

    /**
     * Convert list of UserProfile entities to list of public UserProfileDTOs
     */
    public List<UserProfileDTO> toPublicUserProfileDTOList(List<UserProfile> userProfiles) {
        if (userProfiles == null) {
            return null;
        }
        return userProfiles.stream()
                   .map(this::toPublicUserProfileDTO)
                   .collect(Collectors.toList());
    }
}

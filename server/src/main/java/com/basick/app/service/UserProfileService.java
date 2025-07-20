package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.basick.app.dto.userprofile.AddAchievementRequest;
import com.basick.app.dto.userprofile.CreateUserProfileRequest;
import com.basick.app.dto.userprofile.UpdateFitnessGoalsRequest;
import com.basick.app.dto.userprofile.UpdateFitnessMetricsRequest;
import com.basick.app.dto.userprofile.UpdatePrivacySettingsRequest;
import com.basick.app.dto.userprofile.UpdateProfilePictureRequest;
import com.basick.app.dto.userprofile.UpdateUserProfileRequest;
import com.basick.app.dto.userprofile.UserProfileDTO;
import com.basick.app.mapper.UserProfileMapper;
import com.basick.app.model.User;
import com.basick.app.model.UserProfile;
import com.basick.app.repository.UserProfileRepository;
import com.basick.app.repository.UserRepository;
import com.google.cloud.Timestamp;

/**
 * Service layer for UserProfile operations
 */
@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;
    private final UserRepository userRepository;

    public UserProfileService(UserProfileRepository userProfileRepository, UserProfileMapper userProfileMapper, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userProfileMapper = userProfileMapper;
        this.userRepository = userRepository;
    }

    /**
     * Get all user profiles
     */
    public List<UserProfileDTO> getAllUserProfiles() throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = userProfileRepository.findAll();
        return userProfileMapper.toUserProfileDTOList(userProfiles);
    }

    /**
     * Get user profile by ID
     */
    public UserProfileDTO getUserProfileById(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        return userProfile != null ? userProfileMapper.toUserProfileDTO(userProfile) : null;
    }

    /**
     * Get user profile by User document ID
     */
    public UserProfileDTO getUserProfileByUserId(String userId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        return userProfile != null ? userProfileMapper.toUserProfileDTO(userProfile) : null;
    }

    /**
     * Get user profile by username
     */
    public UserProfileDTO getUserProfileByUsername(String username) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findByUsername(username);
        return userProfile != null ? userProfileMapper.toUserProfileDTO(userProfile) : null;
    }

    /**
     * Create a new user profile
     */
    public UserProfileDTO createUserProfile(CreateUserProfileRequest request) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileMapper.toUserProfile(request);
        userProfile.setCreatedAt(Timestamp.now());
        userProfile.setUpdatedAt(Timestamp.now());
        
        String userProfileId = userProfileRepository.save(userProfile);
        userProfile.setUserProfileId(userProfileId);
        
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Update user profile
     */
    public UserProfileDTO updateUserProfile(String userProfileId, UpdateUserProfileRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile existingProfile = userProfileRepository.findById(userProfileId);
        if (existingProfile == null) {
            return null;
        }

        userProfileMapper.updateUserProfileFromRequest(request, existingProfile);
        existingProfile.updateProfile(); // This updates BMI, rank, and updatedAt
        
        userProfileRepository.update(userProfileId, existingProfile);
        return userProfileMapper.toUserProfileDTO(existingProfile);
    }

    /**
     * Update profile picture
     */
    public UserProfileDTO updateProfilePicture(String userProfileId, UpdateProfilePictureRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
        }

        userProfile.setProfilePictureUrl(request.getProfilePictureUrl());
        userProfile.updateProfile();
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Update fitness metrics
     */
    public UserProfileDTO updateFitnessMetrics(String userProfileId, UpdateFitnessMetricsRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
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
        if (request.getTargetWeight() != null) {
            userProfile.setTargetWeight(request.getTargetWeight());
        }
        if (request.getDailyCalorieGoal() != null) {
            userProfile.setDailyCalorieGoal(request.getDailyCalorieGoal());
        }
        if (request.getWeeklyWorkoutGoal() != null) {
            userProfile.setWeeklyWorkoutGoal(request.getWeeklyWorkoutGoal());
        }

        userProfile.updateProfile(); // This recalculates BMI and updates timestamps
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Update privacy settings
     */
    public UserProfileDTO updatePrivacySettings(String userProfileId, UpdatePrivacySettingsRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
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

        userProfile.updateProfile();
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Update fitness goals
     */
    public UserProfileDTO updateFitnessGoals(String userProfileId, UpdateFitnessGoalsRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
        }

        userProfile.setFitnessGoals(request.getFitnessGoals());
        userProfile.updateProfile();
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Add achievement
     */
    public UserProfileDTO addAchievement(String userProfileId, AddAchievementRequest request) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
        }

        // Add achievement if not already present
        if (userProfile.getAchievements() != null && !userProfile.getAchievements().contains(request.getAchievement())) {
            userProfile.getAchievements().add(request.getAchievement());
        }

        // Add points if specified
        if (request.getPoints() != null) {
            userProfile.addPoints(request.getPoints());
        }

        userProfile.updateProfile();
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Delete user profile
     */
    public boolean deleteUserProfile(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile existingProfile = userProfileRepository.findById(userProfileId);
        if (existingProfile == null) {
            return false;
        }
        
        userProfileRepository.delete(userProfileId);
        return true;
    }

    /**
     * Increment followers count
     */
    public void incrementFollowersCount(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.incrementFollowersCount();
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Decrement followers count
     */
    public void decrementFollowersCount(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.decrementFollowersCount();
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Increment following count
     */
    public void incrementFollowingCount(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.incrementFollowingCount();
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Decrement following count
     */
    public void decrementFollowingCount(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.decrementFollowingCount();
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Record workout completion
     */
    public void recordWorkoutCompletion(String userProfileId, Integer workoutMinutes) 
            throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.incrementWorkoutsCompletedCount();
            if (workoutMinutes != null) {
                userProfile.addWorkoutMinutes(workoutMinutes);
            }
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Record post creation
     */
    public void recordPostCreation(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.incrementPostsCount();
            userProfile.updateLastActivity();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Reset workout streak
     */
    public void resetWorkoutStreak(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile != null) {
            userProfile.resetStreak();
            userProfile.updateProfile();
            userProfileRepository.update(userProfileId, userProfile);
        }
    }

    /**
     * Search user profiles by name or username
     */
    public List<UserProfileDTO> searchUserProfiles(String query) throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = userProfileRepository.searchByNameOrUsername(query);
        return userProfileMapper.toUserProfileDTOList(userProfiles);
    }

    /**
     * Get user profiles by fitness level
     */
    public List<UserProfileDTO> getUserProfilesByFitnessLevel(String fitnessLevel) 
            throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = userProfileRepository.findByFitnessLevel(fitnessLevel);
        return userProfileMapper.toUserProfileDTOList(userProfiles);
    }

    /**
     * Get top users by rank
     */
    public List<UserProfileDTO> getTopUsersByRank(int limit) throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = userProfileRepository.findTopByRank(limit);
        return userProfileMapper.toUserProfileDTOList(userProfiles);
    }

    /**
     * Get public user profiles
     */
    public List<UserProfileDTO> getPublicUserProfiles() throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = userProfileRepository.findPublicProfiles();
        return userProfileMapper.toUserProfileDTOList(userProfiles);
    }

    /**
     * Update workout streak
     */
    public UserProfileDTO updateWorkoutStreak(String userProfileId) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findById(userProfileId);
        if (userProfile == null) {
            return null;
        }

        // Increment workout streak using the built-in method
        userProfile.updateStreak();
        userProfile.updateProfile();
        
        userProfileRepository.update(userProfileId, userProfile);
        return userProfileMapper.toUserProfileDTO(userProfile);
    }

    /**
     * Get public user profiles (alias for getPublicUserProfiles)
     */
    public List<UserProfileDTO> getPublicProfiles() throws ExecutionException, InterruptedException {
        return getPublicUserProfiles();
    }

    /**
     * Get user profile by Firebase UID
     */
    public UserProfileDTO getUserProfileByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        UserProfile userProfile = userProfileRepository.findByFirebaseUid(firebaseUid);
        return userProfile != null ? userProfileMapper.toUserProfileDTO(userProfile) : null;
    }

    /**
     * Update user profile by Firebase UID
     */
    public UserProfileDTO updateUserProfileByFirebaseUid(String firebaseUid, UpdateUserProfileRequest request) 
            throws ExecutionException, InterruptedException {
        
        // 1. Find the User document by Firebase UID to get the userProfileId
        User user = userRepository.findByFirebaseUid(firebaseUid);
        if (user == null || user.getUserProfileId() == null) {
            return null; // User or profile link not found
        }
        
        // 2. Use the userProfileId to update the profile
        return updateUserProfile(user.getUserProfileId(), request);
    }
}

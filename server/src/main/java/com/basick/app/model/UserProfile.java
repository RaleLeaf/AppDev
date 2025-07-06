package com.basick.app.model;

import com.google.cloud.Timestamp;
import java.util.List;
import java.util.Map;

/**
 * UserProfile model extending User with additional fitness and social features.
 * Contains comprehensive user profile information and fitness metrics.
 * UserProfile is an extension of User containing additional profile/fitness/social info.
 */
public class UserProfile extends User {
    // Additional profile fields beyond User
    private String userId;  // Reference to User entity for linking
    private String username;
    private String displayName;
    private String firstName;
    private String lastName;
    // email is inherited from User but denormalized here for efficiency
    private String profilePictureUrl;
    private String bio;
    private String gender;
    private Integer age;
    private Double height;  // in cm
    private Double weight;  // in kg
    private String fitnessLevel;  // "BEGINNER", "INTERMEDIATE", "ADVANCED"
    private List<String> fitnessGoals;  // e.g., ["LOSE_WEIGHT", "BUILD_MUSCLE", "IMPROVE_ENDURANCE"]
    private Map<String, Object> preferences;  // User preferences (workout types, etc.)
    
    // Contact information (additional to User)
    private String location;
    private String timezone;
    
    // Social features - denormalized counters for Firebase optimization
    private Integer followersCount;
    private Integer followingCount;
    private Integer postsCount;
    private Integer workoutsCompletedCount;
    private Integer totalWorkoutMinutes;
    
    // Privacy settings
    private Boolean isProfilePublic;
    private Boolean shareWorkouts;
    private Boolean shareProgress;
    
    // Fitness metrics
    private Double bmi;  // Calculated field
    private String bmiCategory;  // "UNDERWEIGHT", "NORMAL", "OVERWEIGHT", "OBESE"
    private Double targetWeight;
    private Integer dailyCalorieGoal;
    private Integer weeklyWorkoutGoal;
    
    // Activity tracking
    private Timestamp lastActiveAt;
    private Integer streakDays;  // Current workout streak
    private Integer longestStreak;
    
    // Achievement system
    private List<String> achievements;
    private Integer totalPoints;
    private String currentRank;  // "BRONZE", "SILVER", "GOLD", "PLATINUM"

    public UserProfile() {
        super(); // Call User constructor
        // Initialize counters and lists to avoid null issues
        this.followersCount = 0;
        this.followingCount = 0;
        this.postsCount = 0;
        this.workoutsCompletedCount = 0;
        this.totalWorkoutMinutes = 0;
        this.isProfilePublic = true;
        this.shareWorkouts = true;
        this.shareProgress = true;
        this.streakDays = 0;
        this.longestStreak = 0;
        this.totalPoints = 0;
        this.currentRank = "BRONZE";
    }

    // Getters and Setters for UserProfile-specific fields
    // Note: Basic User fields (id, email, name, etc.) are inherited

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    // Note: email and phoneNumber getters/setters are inherited from User

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { 
        this.height = height;
        calculateBMI();
    }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { 
        this.weight = weight;
        calculateBMI();
    }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public List<String> getFitnessGoals() { return fitnessGoals; }
    public void setFitnessGoals(List<String> fitnessGoals) { this.fitnessGoals = fitnessGoals; }

    public Map<String, Object> getPreferences() { return preferences; }
    public void setPreferences(Map<String, Object> preferences) { this.preferences = preferences; }

    // Note: phoneNumber getter/setter is inherited from User

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public Integer getFollowersCount() { return followersCount; }
    public void setFollowersCount(Integer followersCount) { this.followersCount = followersCount; }

    public Integer getFollowingCount() { return followingCount; }
    public void setFollowingCount(Integer followingCount) { this.followingCount = followingCount; }

    public Integer getPostsCount() { return postsCount; }
    public void setPostsCount(Integer postsCount) { this.postsCount = postsCount; }

    public Integer getWorkoutsCompletedCount() { return workoutsCompletedCount; }
    public void setWorkoutsCompletedCount(Integer workoutsCompletedCount) { this.workoutsCompletedCount = workoutsCompletedCount; }

    public Integer getTotalWorkoutMinutes() { return totalWorkoutMinutes; }
    public void setTotalWorkoutMinutes(Integer totalWorkoutMinutes) { this.totalWorkoutMinutes = totalWorkoutMinutes; }

    public Boolean getIsProfilePublic() { return isProfilePublic; }
    public void setIsProfilePublic(Boolean isProfilePublic) { this.isProfilePublic = isProfilePublic; }

    public Boolean getShareWorkouts() { return shareWorkouts; }
    public void setShareWorkouts(Boolean shareWorkouts) { this.shareWorkouts = shareWorkouts; }

    public Boolean getShareProgress() { return shareProgress; }
    public void setShareProgress(Boolean shareProgress) { this.shareProgress = shareProgress; }

    public Double getBmi() { return bmi; }
    public void setBmi(Double bmi) { this.bmi = bmi; }

    public String getBmiCategory() { return bmiCategory; }
    public void setBmiCategory(String bmiCategory) { this.bmiCategory = bmiCategory; }

    public Double getTargetWeight() { return targetWeight; }
    public void setTargetWeight(Double targetWeight) { this.targetWeight = targetWeight; }

    public Integer getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(Integer dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }

    public Integer getWeeklyWorkoutGoal() { return weeklyWorkoutGoal; }
    public void setWeeklyWorkoutGoal(Integer weeklyWorkoutGoal) { this.weeklyWorkoutGoal = weeklyWorkoutGoal; }

    public Timestamp getLastActiveAt() { return lastActiveAt; }
    public void setLastActiveAt(Timestamp lastActiveAt) { this.lastActiveAt = lastActiveAt; }

    public Integer getStreakDays() { return streakDays; }
    public void setStreakDays(Integer streakDays) { this.streakDays = streakDays; }

    public Integer getLongestStreak() { return longestStreak; }
    public void setLongestStreak(Integer longestStreak) { this.longestStreak = longestStreak; }

    public List<String> getAchievements() { return achievements; }
    public void setAchievements(List<String> achievements) { this.achievements = achievements; }

    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }

    public String getCurrentRank() { return currentRank; }
    public void setCurrentRank(String currentRank) { this.currentRank = currentRank; }

    // Note: createdAt and updatedAt getters/setters are inherited from User

    // Utility methods for Firebase optimization
    public void incrementFollowersCount() {
        this.followersCount = (this.followersCount != null) ? this.followersCount + 1 : 1;
        updateRank();
    }

    public void decrementFollowersCount() {
        this.followersCount = (this.followersCount != null && this.followersCount > 0) ? this.followersCount - 1 : 0;
    }

    public void incrementFollowingCount() {
        this.followingCount = (this.followingCount != null) ? this.followingCount + 1 : 1;
    }

    public void decrementFollowingCount() {
        this.followingCount = (this.followingCount != null && this.followingCount > 0) ? this.followingCount - 1 : 0;
    }

    public void incrementPostsCount() {
        this.postsCount = (this.postsCount != null) ? this.postsCount + 1 : 1;
        addPoints(10); // Award points for posting
    }

    public void decrementPostsCount() {
        this.postsCount = (this.postsCount != null && this.postsCount > 0) ? this.postsCount - 1 : 0;
    }

    public void incrementWorkoutsCompletedCount() {
        this.workoutsCompletedCount = (this.workoutsCompletedCount != null) ? this.workoutsCompletedCount + 1 : 1;
        addPoints(50); // Award points for completing workout
        updateStreak();
    }

    public void addWorkoutMinutes(Integer minutes) {
        if (minutes != null && minutes > 0) {
            this.totalWorkoutMinutes = (this.totalWorkoutMinutes != null) ? this.totalWorkoutMinutes + minutes : minutes;
            addPoints(minutes); // Award 1 point per minute
        }
    }

    public void addPoints(Integer points) {
        if (points != null && points > 0) {
            this.totalPoints = (this.totalPoints != null) ? this.totalPoints + points : points;
            updateRank();
        }
    }

    public void updateStreak() {
        // This would typically involve checking if workout was done today
        // For now, just increment streak
        this.streakDays = (this.streakDays != null) ? this.streakDays + 1 : 1;
        if (this.streakDays > this.longestStreak) {
            this.longestStreak = this.streakDays;
        }
        
        // Award streak bonus points
        if (this.streakDays % 7 == 0) { // Weekly streak bonus
            addPoints(100);
        }
    }

    public void resetStreak() {
        this.streakDays = 0;
    }

    public void calculateBMI() {
        if (this.height != null && this.weight != null && this.height > 0) {
            // BMI = weight (kg) / (height (m))^2
            double heightInMeters = this.height / 100.0;
            this.bmi = this.weight / (heightInMeters * heightInMeters);
            
            // Determine BMI category
            if (this.bmi < 18.5) {
                this.bmiCategory = "UNDERWEIGHT";
            } else if (this.bmi < 25) {
                this.bmiCategory = "NORMAL";
            } else if (this.bmi < 30) {
                this.bmiCategory = "OVERWEIGHT";
            } else {
                this.bmiCategory = "OBESE";
            }
        }
    }

    public void updateRank() {
        if (this.totalPoints != null) {
            if (this.totalPoints >= 10000) {
                this.currentRank = "PLATINUM";
            } else if (this.totalPoints >= 5000) {
                this.currentRank = "GOLD";
            } else if (this.totalPoints >= 1000) {
                this.currentRank = "SILVER";
            } else {
                this.currentRank = "BRONZE";
            }
        }
    }

    // Calculated properties
    public String getFullName() {
        if (this.firstName != null && this.lastName != null) {
            return this.firstName + " " + this.lastName;
        } else if (this.firstName != null) {
            return this.firstName;
        } else if (this.lastName != null) {
            return this.lastName;
        }
        return this.displayName != null ? this.displayName : this.username;
    }

    public Double getWeightProgress() {
        if (this.weight != null && this.targetWeight != null) {
            return this.weight - this.targetWeight;
        }
        return null;
    }

    public Boolean isGoalReached() {
        return getWeightProgress() != null && Math.abs(getWeightProgress()) <= 1.0; // Within 1kg of goal
    }

    // Firebase atomic update methods
    public void updateLastActivity() {
        this.lastActiveAt = Timestamp.now();
        this.setUpdatedAt(Timestamp.now()); // Use inherited setter
    }

    public void updateProfile() {
        this.setUpdatedAt(Timestamp.now()); // Use inherited setter
        calculateBMI();
        updateRank();
    }
}

package com.basick.app.dto.userprofile;

import java.util.List;
import java.util.Map;
import com.basick.app.dto.user.UserDTO;
import com.google.cloud.Timestamp;

/**
 * Data Transfer Object for UserProfile extending UserDTO
 */
public class UserProfileDTO extends UserDTO {
    // Additional profile fields beyond User
    private String userId;  // Reference to User entity for linking
    private String username;
    private String displayName;
    private String firstName;
    private String lastName;
    // Note: email is inherited from UserDTO
    private String profilePictureUrl;
    private String bio;
    private String gender;
    private Integer age;
    private Double height;
    private Double weight;
    private String fitnessLevel;
    private List<String> fitnessGoals;
    private Map<String, Object> preferences;
    
    // Contact information (additional to User)
    // Note: phoneNumber is inherited from UserDTO
    private String location;
    private String timezone;
    
    // Social features - counters
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
    private Double bmi;
    private String bmiCategory;
    private Double targetWeight;
    private Integer dailyCalorieGoal;
    private Integer weeklyWorkoutGoal;
    
    // Activity tracking
    private Timestamp lastActiveAt;
    private Integer streakDays;
    private Integer longestStreak;
    
    // Achievement system
    private List<String> achievements;
    private Integer totalPoints;
    private String currentRank;
    
    // Note: createdAt and updatedAt are inherited from UserDTO

    // Constructor
    public UserProfileDTO() {
        super(); // Call UserDTO constructor
    }

    // Getters and Setters for UserProfile-specific fields
    // Note: Basic User fields (id, email, name, etc.) are inherited from UserDTO

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
    
    // Note: email getter/setter is inherited from UserDTO
    
    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    
    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }
    
    public List<String> getFitnessGoals() { return fitnessGoals; }
    public void setFitnessGoals(List<String> fitnessGoals) { this.fitnessGoals = fitnessGoals; }
    
    public Map<String, Object> getPreferences() { return preferences; }
    public void setPreferences(Map<String, Object> preferences) { this.preferences = preferences; }
    
    // Note: phoneNumber getter/setter is inherited from UserDTO
    
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
    
    // Note: createdAt and updatedAt getters/setters are inherited from UserDTO
}

package com.basick.app.dto.userprofile;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for updating an existing UserProfile
 */
public class UpdateUserProfileRequest {
    private String username;
    private String displayName;
    private String firstName;
    private String lastName;
    private String bio;
    private String gender;
    private String dateOfBirth;  // Birthday in YYYY-MM-DD format
    private Integer age;
    private Double height;  // in cm
    private Double weight;  // in kg
    private String fitnessLevel;  // "BEGINNER", "INTERMEDIATE", "ADVANCED"
    private List<String> fitnessGoals;
    private Map<String, Object> preferences;
    
    // Contact information
    private String location;
    private String timezone;
    
    // Privacy settings
    private Boolean isProfilePublic;
    private Boolean shareWorkouts;
    private Boolean shareProgress;
    
    // Fitness goals
    private Double targetWeight;
    private Integer dailyCalorieGoal;
    private Integer weeklyWorkoutGoal;

    public UpdateUserProfileRequest() {}

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

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

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public Boolean getIsProfilePublic() { return isProfilePublic; }
    public void setIsProfilePublic(Boolean isProfilePublic) { this.isProfilePublic = isProfilePublic; }

    public Boolean getShareWorkouts() { return shareWorkouts; }
    public void setShareWorkouts(Boolean shareWorkouts) { this.shareWorkouts = shareWorkouts; }

    public Boolean getShareProgress() { return shareProgress; }
    public void setShareProgress(Boolean shareProgress) { this.shareProgress = shareProgress; }

    public Double getTargetWeight() { return targetWeight; }
    public void setTargetWeight(Double targetWeight) { this.targetWeight = targetWeight; }

    public Integer getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(Integer dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }

    public Integer getWeeklyWorkoutGoal() { return weeklyWorkoutGoal; }
    public void setWeeklyWorkoutGoal(Integer weeklyWorkoutGoal) { this.weeklyWorkoutGoal = weeklyWorkoutGoal; }
}

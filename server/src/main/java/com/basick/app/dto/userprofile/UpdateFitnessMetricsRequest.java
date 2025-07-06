package com.basick.app.dto.userprofile;

/**
 * Request DTO for updating fitness metrics
 */
public class UpdateFitnessMetricsRequest {
    private Double height;  // in cm
    private Double weight;  // in kg
    private String fitnessLevel;  // "BEGINNER", "INTERMEDIATE", "ADVANCED"
    private Double targetWeight;
    private Integer dailyCalorieGoal;
    private Integer weeklyWorkoutGoal;

    public UpdateFitnessMetricsRequest() {}

    // Getters and Setters
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public Double getTargetWeight() { return targetWeight; }
    public void setTargetWeight(Double targetWeight) { this.targetWeight = targetWeight; }

    public Integer getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(Integer dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }

    public Integer getWeeklyWorkoutGoal() { return weeklyWorkoutGoal; }
    public void setWeeklyWorkoutGoal(Integer weeklyWorkoutGoal) { this.weeklyWorkoutGoal = weeklyWorkoutGoal; }
}

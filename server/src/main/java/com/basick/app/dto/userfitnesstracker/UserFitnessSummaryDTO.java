package com.basick.app.dto.userfitnesstracker;

public class UserFitnessSummaryDTO {
    private String userId;
    private Double averageCaloriesConsumed;
    private Double averageCaloriesBurned;
    private Double averageCaloriesNet;
    private Integer averageSteps;
    private Double averageDistanceKm;
    private Double averageActiveMinutes;
    private Integer averageHeartRate;
    private Double averageWeightKg;
    private Double averageBodyFatPercentage;
    private Double averageWaterIntakeLiters;
    private Integer averageSleepHours;
    private Double averageStressLevel;
    private Integer totalWorkoutsRecorded;
    private Integer daysTracked;
    private String mostCommonMood;

    public UserFitnessSummaryDTO() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Double getAverageCaloriesConsumed() { return averageCaloriesConsumed; }
    public void setAverageCaloriesConsumed(Double averageCaloriesConsumed) { this.averageCaloriesConsumed = averageCaloriesConsumed; }

    public Double getAverageCaloriesBurned() { return averageCaloriesBurned; }
    public void setAverageCaloriesBurned(Double averageCaloriesBurned) { this.averageCaloriesBurned = averageCaloriesBurned; }

    public Double getAverageCaloriesNet() { return averageCaloriesNet; }
    public void setAverageCaloriesNet(Double averageCaloriesNet) { this.averageCaloriesNet = averageCaloriesNet; }

    public Integer getAverageSteps() { return averageSteps; }
    public void setAverageSteps(Integer averageSteps) { this.averageSteps = averageSteps; }

    public Double getAverageDistanceKm() { return averageDistanceKm; }
    public void setAverageDistanceKm(Double averageDistanceKm) { this.averageDistanceKm = averageDistanceKm; }

    public Double getAverageActiveMinutes() { return averageActiveMinutes; }
    public void setAverageActiveMinutes(Double averageActiveMinutes) { this.averageActiveMinutes = averageActiveMinutes; }

    public Integer getAverageHeartRate() { return averageHeartRate; }
    public void setAverageHeartRate(Integer averageHeartRate) { this.averageHeartRate = averageHeartRate; }

    public Double getAverageWeightKg() { return averageWeightKg; }
    public void setAverageWeightKg(Double averageWeightKg) { this.averageWeightKg = averageWeightKg; }

    public Double getAverageBodyFatPercentage() { return averageBodyFatPercentage; }
    public void setAverageBodyFatPercentage(Double averageBodyFatPercentage) { this.averageBodyFatPercentage = averageBodyFatPercentage; }

    public Double getAverageWaterIntakeLiters() { return averageWaterIntakeLiters; }
    public void setAverageWaterIntakeLiters(Double averageWaterIntakeLiters) { this.averageWaterIntakeLiters = averageWaterIntakeLiters; }

    public Integer getAverageSleepHours() { return averageSleepHours; }
    public void setAverageSleepHours(Integer averageSleepHours) { this.averageSleepHours = averageSleepHours; }

    public Double getAverageStressLevel() { return averageStressLevel; }
    public void setAverageStressLevel(Double averageStressLevel) { this.averageStressLevel = averageStressLevel; }

    public Integer getTotalWorkoutsRecorded() { return totalWorkoutsRecorded; }
    public void setTotalWorkoutsRecorded(Integer totalWorkoutsRecorded) { this.totalWorkoutsRecorded = totalWorkoutsRecorded; }

    public Integer getDaysTracked() { return daysTracked; }
    public void setDaysTracked(Integer daysTracked) { this.daysTracked = daysTracked; }

    public String getMostCommonMood() { return mostCommonMood; }
    public void setMostCommonMood(String mostCommonMood) { this.mostCommonMood = mostCommonMood; }
}

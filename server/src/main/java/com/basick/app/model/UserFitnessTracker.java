package com.basick.app.model;

import com.google.cloud.Timestamp;

public class UserFitnessTracker {
    private String id; // Unique identifier for this record
    private String userId;
    private Timestamp trackingDate; // Date being tracked
    private Integer numberOfWorkouts;
    private Double caloriesConsumed;
    private Double caloriesBurned;
    private Double caloriesNet; // caloriesBurned - caloriesConsumed
    private Integer steps;
    private Double distanceKm; // Distance covered in kilometers
    private Double activeMinutes;
    private Integer averageHeartRate;
    private Integer restingHeartRate;
    private Double weightKg; // Daily weight tracking
    private Double bodyFatPercentage;
    private Double waterIntakeLiters;
    private Integer sleepHours;
    private Double stressLevel; // 1-10 scale
    private String mood; // EXCELLENT, GOOD, AVERAGE, POOR, TERRIBLE
    private String notes; // Daily fitness notes
    
    // Timestamps
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public UserFitnessTracker() {
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
        this.trackingDate = Timestamp.now();
        this.numberOfWorkouts = 0;
        this.caloriesConsumed = 0.0;
        this.caloriesBurned = 0.0;
        this.caloriesNet = 0.0;
        this.steps = 0;
        this.distanceKm = 0.0;
        this.activeMinutes = 0.0;
        this.waterIntakeLiters = 0.0;
        this.sleepHours = 0;
    }

    public UserFitnessTracker(String userId, Timestamp trackingDate) {
        this();
        this.userId = userId;
        this.trackingDate = trackingDate;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Timestamp getTrackingDate() { return trackingDate; }
    public void setTrackingDate(Timestamp trackingDate) { this.trackingDate = trackingDate; }

    public Integer getNumberOfWorkouts() { return numberOfWorkouts; }
    public void setNumberOfWorkouts(Integer numberOfWorkouts) { this.numberOfWorkouts = numberOfWorkouts; }

    public Double getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Double caloriesConsumed) { 
        this.caloriesConsumed = caloriesConsumed; 
        this.updateCaloriesNet();
    }

    public Double getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Double caloriesBurned) { 
        this.caloriesBurned = caloriesBurned; 
        this.updateCaloriesNet();
    }

    public Double getCaloriesNet() { return caloriesNet; }
    public void setCaloriesNet(Double caloriesNet) { this.caloriesNet = caloriesNet; }

    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public Double getActiveMinutes() { return activeMinutes; }
    public void setActiveMinutes(Double activeMinutes) { this.activeMinutes = activeMinutes; }

    public Integer getAverageHeartRate() { return averageHeartRate; }
    public void setAverageHeartRate(Integer averageHeartRate) { this.averageHeartRate = averageHeartRate; }

    public Integer getRestingHeartRate() { return restingHeartRate; }
    public void setRestingHeartRate(Integer restingHeartRate) { this.restingHeartRate = restingHeartRate; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public Double getBodyFatPercentage() { return bodyFatPercentage; }
    public void setBodyFatPercentage(Double bodyFatPercentage) { this.bodyFatPercentage = bodyFatPercentage; }

    public Double getWaterIntakeLiters() { return waterIntakeLiters; }
    public void setWaterIntakeLiters(Double waterIntakeLiters) { this.waterIntakeLiters = waterIntakeLiters; }

    public Integer getSleepHours() { return sleepHours; }
    public void setSleepHours(Integer sleepHours) { this.sleepHours = sleepHours; }

    public Double getStressLevel() { return stressLevel; }
    public void setStressLevel(Double stressLevel) { this.stressLevel = stressLevel; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void updateCaloriesNet() {
        if (this.caloriesBurned != null && this.caloriesConsumed != null) {
            this.caloriesNet = this.caloriesBurned - this.caloriesConsumed;
        }
        this.updateTimestamp();
    }

    public void incrementWorkouts() {
        this.numberOfWorkouts = (this.numberOfWorkouts != null) ? this.numberOfWorkouts + 1 : 1;
        this.updateTimestamp();
    }

    public void addCaloriesBurned(Double calories) {
        if (calories != null && calories > 0) {
            this.caloriesBurned = (this.caloriesBurned != null) ? this.caloriesBurned + calories : calories;
            this.updateCaloriesNet();
        }
    }

    public void addActiveMinutes(Double minutes) {
        if (minutes != null && minutes > 0) {
            this.activeMinutes = (this.activeMinutes != null) ? this.activeMinutes + minutes : minutes;
            this.updateTimestamp();
        }
    }
}

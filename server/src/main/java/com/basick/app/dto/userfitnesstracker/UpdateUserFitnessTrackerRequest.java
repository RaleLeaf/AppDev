package com.basick.app.dto.userfitnesstracker;

import java.util.List;

public class UpdateUserFitnessTrackerRequest {
    private Integer numberOfWorkouts;
    private Double caloriesConsumed;
    private Double caloriesBurned;
    private Integer steps;
    private Double distanceKm;
    private Double activeMinutes;
    private Integer averageHeartRate;
    private Integer restingHeartRate;
    private Double weightKg;
    private Double bodyFatPercentage;
    private Double waterIntakeLiters;
    private Integer sleepHours;
    private Double stressLevel;
    private String mood;
    private String notes;
    private List<String> doneExercises;

    public UpdateUserFitnessTrackerRequest() {}

    // Getters and Setters
    public Integer getNumberOfWorkouts() { return numberOfWorkouts; }
    public void setNumberOfWorkouts(Integer numberOfWorkouts) { this.numberOfWorkouts = numberOfWorkouts; }

    public Double getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Double caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }

    public Double getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Double caloriesBurned) { this.caloriesBurned = caloriesBurned; }

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

    public List<String> getDoneExercises() { return doneExercises; }
    public void setDoneExercises(List<String> doneExercises) { this.doneExercises = doneExercises; }
}

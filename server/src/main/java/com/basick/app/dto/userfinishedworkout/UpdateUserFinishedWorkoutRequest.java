package com.basick.app.dto.userfinishedworkout;

public class UpdateUserFinishedWorkoutRequest {
    private Double caloriesBurned;
    private Integer durationMinutes;
    private Double averageHeartRate;
    private Integer difficulty;
    private Double userRating;
    private String notes;

    public UpdateUserFinishedWorkoutRequest() {}

    // Getters and Setters
    public Double getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Double caloriesBurned) { this.caloriesBurned = caloriesBurned; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public Double getAverageHeartRate() { return averageHeartRate; }
    public void setAverageHeartRate(Double averageHeartRate) { this.averageHeartRate = averageHeartRate; }

    public Integer getDifficulty() { return difficulty; }
    public void setDifficulty(Integer difficulty) { this.difficulty = difficulty; }

    public Double getUserRating() { return userRating; }
    public void setUserRating(Double userRating) { this.userRating = userRating; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
package com.basick.app.dto.userfinishedworkout;

import com.google.cloud.Timestamp;

public class CreateUserFinishedWorkoutRequest {
    private String userId;
    private String workoutId;
    private String workoutName;
    private String workoutDescription;
    private Double caloriesBurned;
    private Integer durationMinutes;
    private Double averageHeartRate;
    private Integer difficulty;
    private Double userRating;
    private String notes;
    private Timestamp completedAt;

    public CreateUserFinishedWorkoutRequest() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getWorkoutId() { return workoutId; }
    public void setWorkoutId(String workoutId) { this.workoutId = workoutId; }

    public String getWorkoutName() { return workoutName; }
    public void setWorkoutName(String workoutName) { this.workoutName = workoutName; }

    public String getWorkoutDescription() { return workoutDescription; }
    public void setWorkoutDescription(String workoutDescription) { this.workoutDescription = workoutDescription; }

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

    public Timestamp getCompletedAt() { return completedAt; }
    public void setCompletedAt(Timestamp completedAt) { this.completedAt = completedAt; }
}
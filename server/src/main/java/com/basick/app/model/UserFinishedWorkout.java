package com.basick.app.model;

import com.google.cloud.Timestamp;

public class UserFinishedWorkout {
    private String id; // Unique identifier for this record
    private String userId;
    private String workoutId;
    private String workoutName;
    private String workoutDescription;
    private Double caloriesBurned;
    private Integer durationMinutes; // Duration in minutes
    private Double averageHeartRate; // Average heart rate during workout
    private Integer difficulty; // 1-10 rating of perceived difficulty
    private Double userRating; // User's rating of the workout (1-5)
    private String notes; // User's personal notes about the workout
    
    // Timestamps
    private Timestamp completedAt; // When the workout was completed
    private Timestamp createdAt; // When this record was created
    private Timestamp updatedAt; // When this record was last updated

    public UserFinishedWorkout() {
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
        this.completedAt = Timestamp.now();
        this.caloriesBurned = 0.0;
        this.durationMinutes = 0;
    }

    public UserFinishedWorkout(String userId, String workoutId, String workoutName, String workoutDescription, 
                             Double caloriesBurned, Integer durationMinutes) {
        this();
        this.userId = userId;
        this.workoutId = workoutId;
        this.workoutName = workoutName;
        this.workoutDescription = workoutDescription;
        this.caloriesBurned = caloriesBurned;
        this.durationMinutes = durationMinutes;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void setCompletedNow() {
        this.completedAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }
}

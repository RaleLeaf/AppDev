package com.basick.app.model;

import java.util.ArrayList;
import java.util.List;

import com.google.cloud.Timestamp;

public class Workout {
    private String id;
    private String name;
    private String description;
    private List<String> categories; // e.g., ["STRENGTH", "CARDIO", "FLEXIBILITY"]
    private String difficulty; // "BEGINNER", "INTERMEDIATE", "ADVANCED"
    private Integer estimatedDuration; // in minutes
    private Double estimatedCaloriesBurned;
    private String imageUrl;
    private String videoUrl;
    private String instructorName;
    private String instructorId;
    
    // Equipment and requirements (aggregated from exercises)
    private List<String> equipmentRequired; // e.g., ["DUMBBELLS", "RESISTANCE_BANDS"]
    private String location; // "GYM", "HOME", "OUTDOOR", "ANY"
    
    // The main content: list of exercises in this workout
    private List<WorkoutExercise> exercises;
    
    // Workout metadata
    private Boolean isCustom; // User-created workout
    private Boolean isPublic; // Available to all users
    private String createdBy; // User ID who created this workout
    private List<String> targetMuscleGroups; // Aggregated from exercises
    
    // Popularity metrics
    private Integer completionCount; // How many times this workout has been completed
    private Double averageRating;
    private Integer reviewCount;
    private List<String> tags; // Additional searchable tags
    
    // Timestamps
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Workout() {
        this.exercises = new ArrayList<>();
        this.completionCount = 0;
        this.averageRating = 0.0;
        this.reviewCount = 0;
        this.isCustom = false;
        this.isPublic = true;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Workout(String name, String description, List<String> categories, String difficulty, Integer estimatedDuration) {
        this();
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.difficulty = difficulty;
        this.estimatedDuration = estimatedDuration;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Integer getEstimatedDuration() { return estimatedDuration; }
    public void setEstimatedDuration(Integer estimatedDuration) { this.estimatedDuration = estimatedDuration; }
    public Double getEstimatedCaloriesBurned() { return estimatedCaloriesBurned; }
    public void setEstimatedCaloriesBurned(Double estimatedCaloriesBurned) { this.estimatedCaloriesBurned = estimatedCaloriesBurned; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
    public String getInstructorId() { return instructorId; }
    public void setInstructorId(String instructorId) { this.instructorId = instructorId; }
    public List<String> getEquipmentRequired() { return equipmentRequired; }
    public void setEquipmentRequired(List<String> equipmentRequired) { this.equipmentRequired = equipmentRequired; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    // Exercises list
    public List<WorkoutExercise> getExercises() { return exercises; }
    public void setExercises(List<WorkoutExercise> exercises) { this.exercises = exercises; }
    
    // Workout metadata
    public Boolean getIsCustom() { return isCustom; }
    public void setIsCustom(Boolean isCustom) { this.isCustom = isCustom; }
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public List<String> getTargetMuscleGroups() { return targetMuscleGroups; }
    public void setTargetMuscleGroups(List<String> targetMuscleGroups) { this.targetMuscleGroups = targetMuscleGroups; }
    
    // Popularity metrics
    public Integer getCompletionCount() { return completionCount; }
    public void setCompletionCount(Integer completionCount) { this.completionCount = completionCount; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    // Timestamps
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    
    // Business methods
    public void addExercise(WorkoutExercise exercise) {
        if (this.exercises == null) {
            this.exercises = new ArrayList<>();
        }
        exercise.setOrderIndex(this.exercises.size());
        this.exercises.add(exercise);
        this.updatedAt = Timestamp.now();
    }
    
    public void removeExercise(int index) {
        if (this.exercises != null && index >= 0 && index < this.exercises.size()) {
            this.exercises.remove(index);
            // Reorder remaining exercises
            for (int i = index; i < this.exercises.size(); i++) {
                this.exercises.get(i).setOrderIndex(i);
            }
            this.updatedAt = Timestamp.now();
        }
    }
    
    public void updateRating(double newRating) {
        if (this.reviewCount == null || this.reviewCount == 0) {
            this.averageRating = newRating;
            this.reviewCount = 1;
        } else {
            double totalScore = this.averageRating * this.reviewCount;
            this.reviewCount++;
            this.averageRating = (totalScore + newRating) / this.reviewCount;
        }
        this.updatedAt = Timestamp.now();
    }
    
    public void incrementCompletionCount() {
        this.completionCount = (this.completionCount != null) ? this.completionCount + 1 : 1;
        this.updatedAt = Timestamp.now();
    }
}

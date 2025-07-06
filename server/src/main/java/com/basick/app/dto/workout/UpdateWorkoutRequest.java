package com.basick.app.dto.workout;

import java.util.List;

/**
 * Request DTO for updating a Workout
 */
public class UpdateWorkoutRequest {
    private String name;
    private String description;
    private List<String> categories;
    private String difficulty;
    private Integer estimatedDuration;
    private Double estimatedCaloriesBurned;
    private String imageUrl;
    private String videoUrl;
    private String instructorName;
    private String instructorId;
    
    // Equipment and requirements
    private List<String> equipmentRequired;
    private String location;
    
    // The main content: list of exercises in this workout
    private List<WorkoutExerciseDTO> exercises;
    
    // Workout metadata
    private Boolean isCustom;
    private Boolean isPublic;
    private List<String> targetMuscleGroups;
    private List<String> tags;

    // Constructors
    public UpdateWorkoutRequest() {}

    // Getters and Setters
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
    
    public List<WorkoutExerciseDTO> getExercises() { return exercises; }
    public void setExercises(List<WorkoutExerciseDTO> exercises) { this.exercises = exercises; }
    
    public Boolean getIsCustom() { return isCustom; }
    public void setIsCustom(Boolean isCustom) { this.isCustom = isCustom; }
    
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    
    public List<String> getTargetMuscleGroups() { return targetMuscleGroups; }
    public void setTargetMuscleGroups(List<String> targetMuscleGroups) { this.targetMuscleGroups = targetMuscleGroups; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}

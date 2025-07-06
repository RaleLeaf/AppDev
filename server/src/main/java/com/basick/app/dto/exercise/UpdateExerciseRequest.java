package com.basick.app.dto.exercise;

import java.util.List;
import java.util.Map;

/**
 * Request DTO for updating an Exercise
 */
public class UpdateExerciseRequest {
    private String name;
    private String description;
    private List<String> categories;
    private String difficulty;
    private String muscleGroup;
    private List<String> secondaryMuscleGroups;
    private List<String> equipmentRequired;
    private Map<String, Object> instructions;
    private String imageUrl;
    private String videoUrl;
    private String gifUrl;
    
    // Default exercise parameters
    private Integer defaultSets;
    private Integer defaultReps;
    private Integer defaultDuration;
    private Integer restTimeSeconds;
    private Double caloriesPerRep;
    private Double caloriesPerMinute;
    
    // Metadata
    private Boolean isPublic;
    private Boolean isVerified;
    private List<String> tags;

    // Constructors
    public UpdateExerciseRequest() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public String getMuscleGroup() { return muscleGroup; }
    public void setMuscleGroup(String muscleGroup) { this.muscleGroup = muscleGroup; }
    
    public List<String> getSecondaryMuscleGroups() { return secondaryMuscleGroups; }
    public void setSecondaryMuscleGroups(List<String> secondaryMuscleGroups) { this.secondaryMuscleGroups = secondaryMuscleGroups; }
    
    public List<String> getEquipmentRequired() { return equipmentRequired; }
    public void setEquipmentRequired(List<String> equipmentRequired) { this.equipmentRequired = equipmentRequired; }
    
    public Map<String, Object> getInstructions() { return instructions; }
    public void setInstructions(Map<String, Object> instructions) { this.instructions = instructions; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    
    public String getGifUrl() { return gifUrl; }
    public void setGifUrl(String gifUrl) { this.gifUrl = gifUrl; }
    
    public Integer getDefaultSets() { return defaultSets; }
    public void setDefaultSets(Integer defaultSets) { this.defaultSets = defaultSets; }
    
    public Integer getDefaultReps() { return defaultReps; }
    public void setDefaultReps(Integer defaultReps) { this.defaultReps = defaultReps; }
    
    public Integer getDefaultDuration() { return defaultDuration; }
    public void setDefaultDuration(Integer defaultDuration) { this.defaultDuration = defaultDuration; }
    
    public Integer getRestTimeSeconds() { return restTimeSeconds; }
    public void setRestTimeSeconds(Integer restTimeSeconds) { this.restTimeSeconds = restTimeSeconds; }
    
    public Double getCaloriesPerRep() { return caloriesPerRep; }
    public void setCaloriesPerRep(Double caloriesPerRep) { this.caloriesPerRep = caloriesPerRep; }
    
    public Double getCaloriesPerMinute() { return caloriesPerMinute; }
    public void setCaloriesPerMinute(Double caloriesPerMinute) { this.caloriesPerMinute = caloriesPerMinute; }
    
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}

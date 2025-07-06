package com.basick.app.dto.exercise;

import java.util.List;
import java.util.Map;

/**
 * Data Transfer Object for Exercise
 */
public class ExerciseDTO {
    private String id;
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
    private String createdBy;
    private List<String> tags;
    
    // Popularity metrics
    private Integer usageCount;
    private Double averageRating;
    private Integer totalRatings;
    
    // Timestamps
    private String createdAt;
    private String updatedAt;

    // Constructors
    public ExerciseDTO() {}

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
    
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
    
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    
    public Integer getTotalRatings() { return totalRatings; }
    public void setTotalRatings(Integer totalRatings) { this.totalRatings = totalRatings; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}

package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.exercise.CreateExerciseRequest;
import com.basick.app.dto.exercise.ExerciseDTO;
import com.basick.app.dto.exercise.UpdateExerciseRequest;
import com.basick.app.model.Exercise;
import com.google.cloud.Timestamp;

@Component
public class ExerciseMapper {
    
    /**
     * Convert Exercise entity to ExerciseDTO
     */
    public ExerciseDTO toDTO(Exercise exercise) {
        if (exercise == null) {
            return null;
        }
        
        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setDescription(exercise.getDescription());
        dto.setCategories(exercise.getCategories());
        dto.setDifficulty(exercise.getDifficulty());
        dto.setMuscleGroup(exercise.getMuscleGroup());
        dto.setSecondaryMuscleGroups(exercise.getSecondaryMuscleGroups());
        dto.setEquipmentRequired(exercise.getEquipmentRequired());
        dto.setInstructions(exercise.getInstructions());
        dto.setImageUrl(exercise.getImageUrl());
        dto.setVideoUrl(exercise.getVideoUrl());
        dto.setGifUrl(exercise.getGifUrl());
        
        dto.setDefaultSets(exercise.getDefaultSets());
        dto.setDefaultReps(exercise.getDefaultReps());
        dto.setDefaultDuration(exercise.getDefaultDuration());
        dto.setRestTimeSeconds(exercise.getRestTimeSeconds());
        dto.setCaloriesPerRep(exercise.getCaloriesPerRep());
        dto.setCaloriesPerMinute(exercise.getCaloriesPerMinute());
        
        dto.setIsPublic(exercise.getIsPublic());
        dto.setIsVerified(exercise.getIsVerified());
        dto.setCreatedBy(exercise.getCreatedBy());
        dto.setTags(exercise.getTags());
        
        dto.setUsageCount(exercise.getUsageCount());
        dto.setAverageRating(exercise.getAverageRating());
        dto.setTotalRatings(exercise.getTotalRatings());
        
        dto.setCreatedAt(exercise.getCreatedAt() != null ? exercise.getCreatedAt().toString() : null);
        dto.setUpdatedAt(exercise.getUpdatedAt() != null ? exercise.getUpdatedAt().toString() : null);
        
        return dto;
    }
    
    /**
     * Convert list of Exercise entities to list of ExerciseDTOs
     */
    public List<ExerciseDTO> toDTOList(List<Exercise> exercises) {
        if (exercises == null) {
            return null;
        }
        
        return exercises.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert CreateExerciseRequest to Exercise entity
     */
    public Exercise fromCreateRequest(CreateExerciseRequest request) {
        if (request == null) {
            return null;
        }
        
        Exercise exercise = new Exercise();
        exercise.setName(request.getName());
        exercise.setDescription(request.getDescription());
        exercise.setCategories(request.getCategories());
        exercise.setDifficulty(request.getDifficulty());
        exercise.setMuscleGroup(request.getMuscleGroup());
        exercise.setSecondaryMuscleGroups(request.getSecondaryMuscleGroups());
        exercise.setEquipmentRequired(request.getEquipmentRequired());
        exercise.setInstructions(request.getInstructions());
        exercise.setImageUrl(request.getImageUrl());
        exercise.setVideoUrl(request.getVideoUrl());
        exercise.setGifUrl(request.getGifUrl());
        
        exercise.setDefaultSets(request.getDefaultSets());
        exercise.setDefaultReps(request.getDefaultReps());
        exercise.setDefaultDuration(request.getDefaultDuration());
        exercise.setRestTimeSeconds(request.getRestTimeSeconds());
        exercise.setCaloriesPerRep(request.getCaloriesPerRep());
        exercise.setCaloriesPerMinute(request.getCaloriesPerMinute());
        
        exercise.setIsPublic(request.getIsPublic());
        exercise.setIsVerified(request.getIsVerified());
        exercise.setCreatedBy(request.getCreatedBy());
        exercise.setTags(request.getTags());
        
        // Set default values for new exercises
        exercise.setUsageCount(0);
        exercise.setAverageRating(0.0);
        exercise.setTotalRatings(0);
        exercise.setCreatedAt(Timestamp.now());
        exercise.setUpdatedAt(Timestamp.now());
        
        return exercise;
    }
    
    /**
     * Update Exercise entity from UpdateExerciseRequest
     */
    public void updateFromRequest(UpdateExerciseRequest request, Exercise exercise) {
        if (request == null || exercise == null) {
            return;
        }
        
        if (request.getName() != null) {
            exercise.setName(request.getName());
        }
        if (request.getDescription() != null) {
            exercise.setDescription(request.getDescription());
        }
        if (request.getCategories() != null) {
            exercise.setCategories(request.getCategories());
        }
        if (request.getDifficulty() != null) {
            exercise.setDifficulty(request.getDifficulty());
        }
        if (request.getMuscleGroup() != null) {
            exercise.setMuscleGroup(request.getMuscleGroup());
        }
        if (request.getSecondaryMuscleGroups() != null) {
            exercise.setSecondaryMuscleGroups(request.getSecondaryMuscleGroups());
        }
        if (request.getEquipmentRequired() != null) {
            exercise.setEquipmentRequired(request.getEquipmentRequired());
        }
        if (request.getInstructions() != null) {
            exercise.setInstructions(request.getInstructions());
        }
        if (request.getImageUrl() != null) {
            exercise.setImageUrl(request.getImageUrl());
        }
        if (request.getVideoUrl() != null) {
            exercise.setVideoUrl(request.getVideoUrl());
        }
        if (request.getGifUrl() != null) {
            exercise.setGifUrl(request.getGifUrl());
        }
        if (request.getDefaultSets() != null) {
            exercise.setDefaultSets(request.getDefaultSets());
        }
        if (request.getDefaultReps() != null) {
            exercise.setDefaultReps(request.getDefaultReps());
        }
        if (request.getDefaultDuration() != null) {
            exercise.setDefaultDuration(request.getDefaultDuration());
        }
        if (request.getRestTimeSeconds() != null) {
            exercise.setRestTimeSeconds(request.getRestTimeSeconds());
        }
        if (request.getCaloriesPerRep() != null) {
            exercise.setCaloriesPerRep(request.getCaloriesPerRep());
        }
        if (request.getCaloriesPerMinute() != null) {
            exercise.setCaloriesPerMinute(request.getCaloriesPerMinute());
        }
        if (request.getIsPublic() != null) {
            exercise.setIsPublic(request.getIsPublic());
        }
        if (request.getIsVerified() != null) {
            exercise.setIsVerified(request.getIsVerified());
        }
        if (request.getTags() != null) {
            exercise.setTags(request.getTags());
        }
        
        // Always update the timestamp
        exercise.setUpdatedAt(Timestamp.now());
    }
}

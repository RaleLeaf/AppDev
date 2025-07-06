package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.workout.*;
import com.basick.app.model.Workout;
import com.basick.app.model.WorkoutExercise;
import com.google.cloud.Timestamp;

@Component
public class WorkoutMapper {
    
    /**
     * Convert Workout entity to WorkoutDTO
     */
    public WorkoutDTO toDTO(Workout workout) {
        if (workout == null) {
            return null;
        }
        
        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setName(workout.getName());
        dto.setDescription(workout.getDescription());
        dto.setCategories(workout.getCategories());
        dto.setDifficulty(workout.getDifficulty());
        dto.setEstimatedDuration(workout.getEstimatedDuration());
        dto.setEstimatedCaloriesBurned(workout.getEstimatedCaloriesBurned());
        dto.setImageUrl(workout.getImageUrl());
        dto.setVideoUrl(workout.getVideoUrl());
        dto.setInstructorName(workout.getInstructorName());
        dto.setInstructorId(workout.getInstructorId());
        
        dto.setEquipmentRequired(workout.getEquipmentRequired());
        dto.setLocation(workout.getLocation());
        
        // Convert WorkoutExercise list
        if (workout.getExercises() != null) {
            dto.setExercises(workout.getExercises().stream()
                    .map(this::workoutExerciseToDTO)
                    .collect(Collectors.toList()));
        }
        
        dto.setIsCustom(workout.getIsCustom());
        dto.setIsPublic(workout.getIsPublic());
        dto.setCreatedBy(workout.getCreatedBy());
        dto.setTargetMuscleGroups(workout.getTargetMuscleGroups());
        
        dto.setCompletionCount(workout.getCompletionCount());
        dto.setAverageRating(workout.getAverageRating());
        dto.setReviewCount(workout.getReviewCount());
        dto.setTags(workout.getTags());
        
        dto.setCreatedAt(workout.getCreatedAt() != null ? workout.getCreatedAt().toString() : null);
        dto.setUpdatedAt(workout.getUpdatedAt() != null ? workout.getUpdatedAt().toString() : null);
        
        return dto;
    }
    
    /**
     * Convert WorkoutExercise to WorkoutExerciseDTO
     */
    public WorkoutExerciseDTO workoutExerciseToDTO(WorkoutExercise workoutExercise) {
        if (workoutExercise == null) {
            return null;
        }
        
        WorkoutExerciseDTO dto = new WorkoutExerciseDTO();
        dto.setExerciseId(workoutExercise.getExerciseId());
        dto.setExerciseName(workoutExercise.getExerciseName());
        dto.setSets(workoutExercise.getSets());
        dto.setReps(workoutExercise.getReps());
        dto.setDuration(workoutExercise.getDuration());
        dto.setWeight(workoutExercise.getWeight());
        dto.setRestTimeSeconds(workoutExercise.getRestTimeSeconds());
        dto.setOrderIndex(workoutExercise.getOrderIndex());
        dto.setSuperset(workoutExercise.getSuperset());
        dto.setNotes(workoutExercise.getNotes());
        
        return dto;
    }
    
    /**
     * Convert WorkoutExerciseDTO to WorkoutExercise
     */
    public WorkoutExercise workoutExerciseFromDTO(WorkoutExerciseDTO dto) {
        if (dto == null) {
            return null;
        }
        
        WorkoutExercise workoutExercise = new WorkoutExercise();
        workoutExercise.setExerciseId(dto.getExerciseId());
        workoutExercise.setExerciseName(dto.getExerciseName());
        workoutExercise.setSets(dto.getSets());
        workoutExercise.setReps(dto.getReps());
        workoutExercise.setDuration(dto.getDuration());
        workoutExercise.setWeight(dto.getWeight());
        workoutExercise.setRestTimeSeconds(dto.getRestTimeSeconds());
        workoutExercise.setOrderIndex(dto.getOrderIndex());
        workoutExercise.setSuperset(dto.getSuperset());
        workoutExercise.setNotes(dto.getNotes());
        
        return workoutExercise;
    }
    
    /**
     * Convert list of Workout entities to list of WorkoutDTOs
     */
    public List<WorkoutDTO> toDTOList(List<Workout> workouts) {
        if (workouts == null) {
            return null;
        }
        
        return workouts.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert CreateWorkoutRequest to Workout entity
     */
    public Workout fromCreateRequest(CreateWorkoutRequest request) {
        if (request == null) {
            return null;
        }
        
        Workout workout = new Workout();
        workout.setName(request.getName());
        workout.setDescription(request.getDescription());
        workout.setCategories(request.getCategories());
        workout.setDifficulty(request.getDifficulty());
        workout.setEstimatedDuration(request.getEstimatedDuration());
        workout.setEstimatedCaloriesBurned(request.getEstimatedCaloriesBurned());
        workout.setImageUrl(request.getImageUrl());
        workout.setVideoUrl(request.getVideoUrl());
        workout.setInstructorName(request.getInstructorName());
        workout.setInstructorId(request.getInstructorId());
        
        workout.setEquipmentRequired(request.getEquipmentRequired());
        workout.setLocation(request.getLocation());
        
        // Convert exercises
        if (request.getExercises() != null) {
            workout.setExercises(request.getExercises().stream()
                    .map(this::workoutExerciseFromDTO)
                    .collect(Collectors.toList()));
        }
        
        workout.setIsCustom(request.getIsCustom());
        workout.setIsPublic(request.getIsPublic());
        workout.setCreatedBy(request.getCreatedBy());
        workout.setTargetMuscleGroups(request.getTargetMuscleGroups());
        workout.setTags(request.getTags());
        
        // Set default values for new workouts
        workout.setCompletionCount(0);
        workout.setAverageRating(0.0);
        workout.setReviewCount(0);
        workout.setCreatedAt(Timestamp.now());
        workout.setUpdatedAt(Timestamp.now());
        
        return workout;
    }
    
    /**
     * Update Workout entity from UpdateWorkoutRequest
     */
    public void updateFromRequest(UpdateWorkoutRequest request, Workout workout) {
        if (request == null || workout == null) {
            return;
        }
        
        if (request.getName() != null) {
            workout.setName(request.getName());
        }
        if (request.getDescription() != null) {
            workout.setDescription(request.getDescription());
        }
        if (request.getCategories() != null) {
            workout.setCategories(request.getCategories());
        }
        if (request.getDifficulty() != null) {
            workout.setDifficulty(request.getDifficulty());
        }
        if (request.getEstimatedDuration() != null) {
            workout.setEstimatedDuration(request.getEstimatedDuration());
        }
        if (request.getEstimatedCaloriesBurned() != null) {
            workout.setEstimatedCaloriesBurned(request.getEstimatedCaloriesBurned());
        }
        if (request.getImageUrl() != null) {
            workout.setImageUrl(request.getImageUrl());
        }
        if (request.getVideoUrl() != null) {
            workout.setVideoUrl(request.getVideoUrl());
        }
        if (request.getInstructorName() != null) {
            workout.setInstructorName(request.getInstructorName());
        }
        if (request.getInstructorId() != null) {
            workout.setInstructorId(request.getInstructorId());
        }
        if (request.getEquipmentRequired() != null) {
            workout.setEquipmentRequired(request.getEquipmentRequired());
        }
        if (request.getLocation() != null) {
            workout.setLocation(request.getLocation());
        }
        if (request.getExercises() != null) {
            workout.setExercises(request.getExercises().stream()
                    .map(this::workoutExerciseFromDTO)
                    .collect(Collectors.toList()));
        }
        if (request.getIsCustom() != null) {
            workout.setIsCustom(request.getIsCustom());
        }
        if (request.getIsPublic() != null) {
            workout.setIsPublic(request.getIsPublic());
        }
        if (request.getTargetMuscleGroups() != null) {
            workout.setTargetMuscleGroups(request.getTargetMuscleGroups());
        }
        if (request.getTags() != null) {
            workout.setTags(request.getTags());
        }
        
        // Always update the timestamp
        workout.setUpdatedAt(Timestamp.now());
    }
    
    /**
     * Convert AddExerciseToWorkoutRequest to WorkoutExercise
     */
    public WorkoutExercise fromAddExerciseRequest(AddExerciseToWorkoutRequest request) {
        if (request == null) {
            return null;
        }
        
        WorkoutExercise workoutExercise = new WorkoutExercise();
        workoutExercise.setExerciseId(request.getExerciseId());
        workoutExercise.setExerciseName(request.getExerciseName());
        workoutExercise.setSets(request.getSets());
        workoutExercise.setReps(request.getReps());
        workoutExercise.setDuration(request.getDuration());
        workoutExercise.setWeight(request.getWeight());
        workoutExercise.setRestTimeSeconds(request.getRestTimeSeconds());
        workoutExercise.setOrderIndex(request.getOrderIndex());
        workoutExercise.setSuperset(request.getSuperset());
        workoutExercise.setNotes(request.getNotes());
        
        return workoutExercise;
    }
}

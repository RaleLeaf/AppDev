package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.workout.*;
import com.basick.app.mapper.WorkoutMapper;
import com.basick.app.model.Workout;
import com.basick.app.model.WorkoutExercise;
import com.basick.app.repository.WorkoutRepository;

/**
 * Service class for Workout business logic
 */
@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutMapper workoutMapper;
    private final ExerciseService exerciseService;

    public WorkoutService(WorkoutRepository workoutRepository, WorkoutMapper workoutMapper, ExerciseService exerciseService) {
        this.workoutRepository = workoutRepository;
        this.workoutMapper = workoutMapper;
        this.exerciseService = exerciseService;
    }

    /**
     * Get all workouts
     */
    public List<WorkoutDTO> getAllWorkouts() {
        try {
            List<Workout> workouts = workoutRepository.findAll();
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workouts", e);
        }
    }

    /**
     * Get workout by ID
     */
    public WorkoutDTO getWorkoutById(String workoutId) {
        try {
            Workout workout = workoutRepository.findById(workoutId);
            return workout != null ? workoutMapper.toDTO(workout) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workout with ID: " + workoutId, e);
        }
    }

    /**
     * Create a new workout
     */
    public WorkoutDTO createWorkout(CreateWorkoutRequest request) {
        try {
            Workout workout = workoutMapper.fromCreateRequest(request);
            Workout savedWorkout = workoutRepository.save(workout);
            return workoutMapper.toDTO(savedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error creating workout", e);
        }
    }

    /**
     * Update workout
     */
    public WorkoutDTO updateWorkout(String workoutId, UpdateWorkoutRequest request) {
        try {
            Workout existingWorkout = workoutRepository.findById(workoutId);
            if (existingWorkout == null) {
                return null;
            }
            
            workoutMapper.updateFromRequest(request, existingWorkout);
            Workout updatedWorkout = workoutRepository.update(existingWorkout);
            return workoutMapper.toDTO(updatedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error updating workout with ID: " + workoutId, e);
        }
    }

    /**
     * Delete workout
     */
    public boolean deleteWorkout(String workoutId) {
        try {
            return workoutRepository.deleteById(workoutId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting workout with ID: " + workoutId, e);
        }
    }

    /**
     * Search workouts by name or description
     */
    public List<WorkoutDTO> searchWorkouts(String query) {
        try {
            List<Workout> workouts = workoutRepository.searchByNameOrDescription(query);
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error searching workouts with query: " + query, e);
        }
    }

    /**
     * Get workouts by difficulty
     */
    public List<WorkoutDTO> getWorkoutsByDifficulty(String difficulty) {
        try {
            List<Workout> workouts = workoutRepository.findByDifficulty(difficulty);
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workouts for difficulty: " + difficulty, e);
        }
    }

    /**
     * Get workouts by category
     */
    public List<WorkoutDTO> getWorkoutsByCategory(String category) {
        try {
            List<Workout> workouts = workoutRepository.findByCategory(category);
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workouts for category: " + category, e);
        }
    }

    /**
     * Get workouts by creator
     */
    public List<WorkoutDTO> getWorkoutsByCreator(String creatorId) {
        try {
            List<Workout> workouts = workoutRepository.findByCreatedBy(creatorId);
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workouts for creator: " + creatorId, e);
        }
    }

    /**
     * Add exercise to workout
     */
    public WorkoutDTO addExerciseToWorkout(String workoutId, AddExerciseToWorkoutRequest request) {
        try {
            Workout workout = workoutRepository.findById(workoutId);
            if (workout == null) {
                return null;
            }
            
            // Increment usage count for the exercise
            exerciseService.incrementUsageCount(request.getExerciseId());
            
            WorkoutExercise workoutExercise = workoutMapper.fromAddExerciseRequest(request);
            workout.addExercise(workoutExercise);
            
            Workout updatedWorkout = workoutRepository.update(workout);
            return workoutMapper.toDTO(updatedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error adding exercise to workout with ID: " + workoutId, e);
        }
    }

    /**
     * Remove exercise from workout
     */
    public WorkoutDTO removeExerciseFromWorkout(String workoutId, int exerciseIndex) {
        try {
            Workout workout = workoutRepository.findById(workoutId);
            if (workout == null) {
                return null;
            }
            
            workout.removeExercise(exerciseIndex);
            
            Workout updatedWorkout = workoutRepository.update(workout);
            return workoutMapper.toDTO(updatedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error removing exercise from workout with ID: " + workoutId, e);
        }
    }

    /**
     * Rate a workout
     */
    public WorkoutDTO rateWorkout(String workoutId, double rating) {
        try {
            Workout workout = workoutRepository.findById(workoutId);
            if (workout == null) {
                return null;
            }
            
            workout.updateRating(rating);
            Workout updatedWorkout = workoutRepository.update(workout);
            return workoutMapper.toDTO(updatedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error rating workout with ID: " + workoutId, e);
        }
    }

    /**
     * Mark workout as completed
     */
    public WorkoutDTO completeWorkout(String workoutId) {
        try {
            Workout workout = workoutRepository.findById(workoutId);
            if (workout == null) {
                return null;
            }
            
            workout.incrementCompletionCount();
            Workout updatedWorkout = workoutRepository.update(workout);
            return workoutMapper.toDTO(updatedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error completing workout with ID: " + workoutId, e);
        }
    }

    /**
     * Get public workouts only
     */
    public List<WorkoutDTO> getPublicWorkouts() {
        try {
            List<Workout> workouts = workoutRepository.findByIsPublic(true);
            return workouts.stream()
                    .map(workoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving public workouts", e);
        }
    }
}

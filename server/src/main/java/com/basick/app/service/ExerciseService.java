package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.exercise.CreateExerciseRequest;
import com.basick.app.dto.exercise.ExerciseDTO;
import com.basick.app.dto.exercise.UpdateExerciseRequest;
import com.basick.app.mapper.ExerciseMapper;
import com.basick.app.model.Exercise;
import com.basick.app.repository.ExerciseRepository;

/**
 * Service class for Exercise business logic
 */
@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;

    public ExerciseService(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
    }

    /**
     * Get all exercises
     */
    public List<ExerciseDTO> getAllExercises() {
        try {
            List<Exercise> exercises = exerciseRepository.findAll();
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises", e);
        }
    }

    /**
     * Get exercise by ID
     */
    public ExerciseDTO getExerciseById(String exerciseId) {
        try {
            Exercise exercise = exerciseRepository.findById(exerciseId);
            return exercise != null ? exerciseMapper.toDTO(exercise) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Create a new exercise
     */
    public ExerciseDTO createExercise(CreateExerciseRequest request) {
        try {
            Exercise exercise = exerciseMapper.fromCreateRequest(request);
            Exercise savedExercise = exerciseRepository.save(exercise);
            return exerciseMapper.toDTO(savedExercise);
        } catch (Exception e) {
            throw new RuntimeException("Error creating exercise", e);
        }
    }

    /**
     * Update exercise
     */
    public ExerciseDTO updateExercise(String exerciseId, UpdateExerciseRequest request) {
        try {
            Exercise existingExercise = exerciseRepository.findById(exerciseId);
            if (existingExercise == null) {
                return null;
            }

            exerciseMapper.updateFromRequest(request, existingExercise);
            Exercise updatedExercise = exerciseRepository.update(existingExercise);
            return exerciseMapper.toDTO(updatedExercise);
        } catch (Exception e) {
            throw new RuntimeException("Error updating exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Delete exercise
     */
    public boolean deleteExercise(String exerciseId) {
        try {
            return exerciseRepository.deleteById(exerciseId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Search exercises by name or description
     */
    public List<ExerciseDTO> searchExercises(String query) {
        try {
            List<Exercise> exercises = exerciseRepository.searchByNameOrDescription(query);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error searching exercises with query: " + query, e);
        }
    }

    /**
     * Get exercises by muscle group
     */
    public List<ExerciseDTO> getExercisesByMuscleGroup(String muscleGroup) {
        try {
            List<Exercise> exercises = exerciseRepository.findByMuscleGroup(muscleGroup);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises for muscle group: " + muscleGroup, e);
        }
    }

    /**
     * Get exercises by difficulty
     */
    public List<ExerciseDTO> getExercisesByDifficulty(String difficulty) {
        try {
            List<Exercise> exercises = exerciseRepository.findByDifficulty(difficulty);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises for difficulty: " + difficulty, e);
        }
    }

    /**
     * Get exercises by category
     */
    public List<ExerciseDTO> getExercisesByCategory(String category) {
        try {
            List<Exercise> exercises = exerciseRepository.findByCategory(category, 0);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises for category: " + category, e);
        }
    }

    /**
     * Rate an exercise
     */
    public ExerciseDTO rateExercise(String exerciseId, double rating) {
        try {
            Exercise exercise = exerciseRepository.findById(exerciseId);
            if (exercise == null) {
                return null;
            }

            exercise.updateRating(rating);
            Exercise updatedExercise = exerciseRepository.update(exercise);
            return exerciseMapper.toDTO(updatedExercise);
        } catch (Exception e) {
            throw new RuntimeException("Error rating exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Increment usage count for an exercise
     */
    public ExerciseDTO incrementUsageCount(String exerciseId) {
        try {
            Exercise exercise = exerciseRepository.findById(exerciseId);
            if (exercise == null) {
                return null;
            }

            exercise.incrementUsageCount();
            Exercise updatedExercise = exerciseRepository.update(exercise);
            return exerciseMapper.toDTO(updatedExercise);
        } catch (Exception e) {
            throw new RuntimeException("Error incrementing usage count for exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Get public exercises only
     */
    public List<ExerciseDTO> getPublicExercises() {
        try {
            List<Exercise> exercises = exerciseRepository.findByIsPublic(true);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving public exercises", e);
        }
    }

    /**
     * Get exercises by creator
     */
    public List<ExerciseDTO> getExercisesByCreator(String creatorId) {
        try {
            List<Exercise> exercises = exerciseRepository.findByCreatedBy(creatorId);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises for creator: " + creatorId, e);
        }
    }


    // 🏋️ NEW: Add method with environment filtering
    public List<ExerciseDTO> getExercisesByWorkoutCategoryDifficultyAndEnvironment(String workoutCategory, String difficulty, String environment, int limit) {
        try {
            List<Exercise> exercises = exerciseRepository.findByWorkoutCategoryDifficultyAndEnvironment(workoutCategory, difficulty, environment, limit);
            return exercises.stream()
                    .map(exerciseMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving exercises by workout category, difficulty and environment: " + workoutCategory + ", " + difficulty + ", " + environment, e);
        }
    }
}

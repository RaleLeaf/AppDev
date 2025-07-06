package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Exercise;
import com.basick.app.service.FirestoreService;

/**
 * Repository class for Exercise CRUD operations with Firestore
 */
@Repository
public class ExerciseRepository {

    private static final String COLLECTION_NAME = "exercises";
    
    // Dependency injection of Firestore service
    private final FirestoreService firestoreService;

    public ExerciseRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new exercise
     */
    public Exercise save(Exercise exercise) {
        try {
            String id = UUID.randomUUID().toString();
            exercise.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, exercise);
            return exercise;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving exercise", e);
        }
    }

    /**
     * Update an existing exercise
     */
    public Exercise update(Exercise exercise) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, exercise.getId(), exercise);
            return exercise;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating exercise", e);
        }
    }

    /**
     * Find exercise by ID
     */
    public Exercise findById(String exerciseId) {
        try {
            return firestoreService.findById(COLLECTION_NAME, exerciseId, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercise by ID: " + exerciseId, e);
        }
    }

    /**
     * Find all exercises
     */
    public List<Exercise> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all exercises", e);
        }
    }

    /**
     * Delete exercise by ID
     */
    public boolean deleteById(String exerciseId) {
        try {
            firestoreService.delete(COLLECTION_NAME, exerciseId);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Search exercises by name or description - simplified implementation
     */
    public List<Exercise> searchByNameOrDescription(String query) {
        try {
            String lowercaseQuery = query.toLowerCase();
            List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
            
            return allExercises.stream()
                    .filter(exercise -> 
                        (exercise.getName() != null && exercise.getName().toLowerCase().contains(lowercaseQuery)) ||
                        (exercise.getDescription() != null && exercise.getDescription().toLowerCase().contains(lowercaseQuery))
                    )
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error searching exercises", e);
        }
    }

    /**
     * Find exercises by muscle group
     */
    public List<Exercise> findByMuscleGroup(String muscleGroup) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "muscleGroup", muscleGroup, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by muscle group: " + muscleGroup, e);
        }
    }

    /**
     * Find exercises by difficulty
     */
    public List<Exercise> findByDifficulty(String difficulty) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "difficulty", difficulty, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by difficulty: " + difficulty, e);
        }
    }

    /**
     * Find exercises by category
     */
    public List<Exercise> findByCategory(String category) {
        try {
            // For array contains queries, we need to use the FirestoreService with custom logic
            List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
            
            return allExercises.stream()
                    .filter(exercise -> exercise.getCategories() != null && exercise.getCategories().contains(category))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by category: " + category, e);
        }
    }

    /**
     * Find exercises by public status
     */
    public List<Exercise> findByIsPublic(boolean isPublic) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "isPublic", isPublic, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by public status: " + isPublic, e);
        }
    }

    /**
     * Find exercises by creator
     */
    public List<Exercise> findByCreatedBy(String createdBy) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "createdBy", createdBy, Exercise.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by creator: " + createdBy, e);
        }
    }
}

package com.basick.app.repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Workout;
import com.basick.app.service.FirestoreService;

/**
 * Repository class for Workout CRUD operations with Firestore
 */
@Repository
public class WorkoutRepository {

    private static final String COLLECTION_NAME = "workouts";
    
    // Dependency injection of Firestore service
    private final FirestoreService firestoreService;

    public WorkoutRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new workout
     */
    public Workout save(Workout workout) {
        try {
            String id = UUID.randomUUID().toString();
            workout.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, workout);
            return workout;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving workout", e);
        }
    }

    /**
     * Update an existing workout
     */
    public Workout update(Workout workout) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, workout.getId(), workout);
            return workout;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating workout", e);
        }
    }

    /**
     * Find workout by ID
     */
    public Workout findById(String workoutId) {
        try {
            return firestoreService.findById(COLLECTION_NAME, workoutId, Workout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding workout by ID: " + workoutId, e);
        }
    }

    /**
     * Find all workouts
     */
    public List<Workout> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, Workout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all workouts", e);
        }
    }

    /**
     * Delete workout by ID
     */
    public boolean deleteById(String workoutId) {
        try {
            firestoreService.delete(COLLECTION_NAME, workoutId);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting workout with ID: " + workoutId, e);
        }
    }

    /**
     * Search workouts by name or description - simplified implementation
     */
    public List<Workout> searchByNameOrDescription(String query) {
        try {
            String lowercaseQuery = query.toLowerCase();
            List<Workout> allWorkouts = firestoreService.findAll(COLLECTION_NAME, Workout.class);
            
            return allWorkouts.stream()
                    .filter(workout -> 
                        (workout.getName() != null && workout.getName().toLowerCase().contains(lowercaseQuery)) ||
                        (workout.getDescription() != null && workout.getDescription().toLowerCase().contains(lowercaseQuery))
                    )
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error searching workouts", e);
        }
    }

    /**
     * Find workouts by difficulty
     */
    public List<Workout> findByDifficulty(String difficulty) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "difficulty", difficulty, Workout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding workouts by difficulty: " + difficulty, e);
        }
    }

    /**
     * Find workouts by category
     */
    public List<Workout> findByCategory(String category) {
        try {
            // For array contains queries, we need to use the FirestoreService with custom logic
            List<Workout> allWorkouts = firestoreService.findAll(COLLECTION_NAME, Workout.class);
            
            return allWorkouts.stream()
                    .filter(workout -> workout.getCategories() != null && workout.getCategories().contains(category))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding workouts by category: " + category, e);
        }
    }

    /**
     * Find workouts by public status
     */
    public List<Workout> findByIsPublic(boolean isPublic) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "isPublic", isPublic, Workout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding workouts by public status: " + isPublic, e);
        }
    }

    /**
     * Find workouts by creator
     */
    public List<Workout> findByCreatedBy(String createdBy) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "createdBy", createdBy, Workout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding workouts by creator: " + createdBy, e);
        }
    }
}

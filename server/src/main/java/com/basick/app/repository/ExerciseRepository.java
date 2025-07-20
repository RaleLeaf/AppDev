package com.basick.app.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
            // Apply pagination limit after fetching all exercises
            List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);

            String lowercaseQuery = query.toLowerCase();
            return allExercises.stream()
                    .filter(exercise
                            -> (exercise.getName() != null && exercise.getName().toLowerCase().contains(lowercaseQuery))
                    || (exercise.getDescription() != null && exercise.getDescription().toLowerCase().contains(lowercaseQuery))
                    )
                    .limit(20)
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
    public List<Exercise> findByCategory(String category, int limit) {
        try {
            String normalizedCategory = category.toLowerCase().trim();

            List<Exercise> results = firestoreService.findByField(COLLECTION_NAME, "bodyPart", normalizedCategory, Exercise.class);
            return results.stream().limit(limit).collect(Collectors.toList());
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

    /**
     * Get all existing exercise names (for duplicate checking during import)
     */
    public Set<String> getAllExerciseNames() {
        try {
            List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
            return allExercises.stream()
                    .map(Exercise::getName)
                    .filter(name -> name != null)
                    .map(name -> name.toLowerCase().trim())
                    .collect(Collectors.toSet());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting exercise names", e);
        }
    }

    /**
     * Check if an exercise with the given name already exists
     */
    public boolean existsByName(String name) {
        if (name == null) return false;
        String normalizedName = name.toLowerCase().trim();
        return getAllExerciseNames().contains(normalizedName);
    }

    /**
     * Count exercises by muscle group
     */
    public long countByMuscleGroup(String muscleGroup) {
        try {
            List<Exercise> exercises = firestoreService.findByField(COLLECTION_NAME, "muscleGroup", muscleGroup, Exercise.class);
            return exercises.size();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting exercises by muscle group: " + muscleGroup, e);
        }
    }

    /**
     * Count exercises by category
     */
    public long countByCategory(String category) {
        try {
            List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
            return allExercises.stream()
                    .filter(exercise -> exercise.getCategories() != null && exercise.getCategories().contains(category))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting exercises by category: " + category, e);
        }
    }

    // Add this improved method to map your categories to muscle groups:
    public List<Exercise> findByWorkoutCategory(String workoutCategory, int limit) {
        try {
            List<Exercise> balancedResults = new ArrayList<>();
            List<String> targetMuscleGroups = new ArrayList<>();

            // Define muscle groups for each category
            switch (workoutCategory.toLowerCase()) {
                case "arms":
                    targetMuscleGroups.addAll(List.of("Biceps", "Triceps", "Forearms", "Delts"));
                    break;

                case "full body":
                    targetMuscleGroups.addAll(List.of("Pectorals", "Upper Back", "Quads", "Delts", "Biceps", "Triceps", "Glutes", "Hamstrings"));
                    break;

                case "lower body":
                    targetMuscleGroups.addAll(List.of("Quads", "Hamstrings", "Glutes", "Calves"));
                    break;

                case "upper body":
                    targetMuscleGroups.addAll(List.of("Lats", "Upper Back", "Shoulders", "Biceps", "Triceps", "Delts", "Pectorals"));
                    break;

                case "abs":
                    targetMuscleGroups.addAll(List.of("Abs", "Core"));
                    break;

                case "cardio":
                    // Handle cardio separately since it uses tags
                    List<Exercise> allExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
                    return allExercises.stream()
                            .filter(exercise -> exercise.getTags() != null
                            && exercise.getTags().stream().anyMatch(tag -> tag.toLowerCase().contains("cardio")))
                            .limit(limit)
                            .collect(Collectors.toList());

                default:
                    return new ArrayList<>();
            }

            // Cycle through muscle groups to get balanced selection
            int muscleGroupIndex = 0;
            while (balancedResults.size() < limit && muscleGroupIndex < targetMuscleGroups.size() * 3) { // Max 3 cycles
                String currentMuscleGroup = targetMuscleGroups.get(muscleGroupIndex % targetMuscleGroups.size());

                // Get exercises for current muscle group
                List<Exercise> muscleGroupExercises = firestoreService.findByField(COLLECTION_NAME, "muscleGroup", currentMuscleGroup, Exercise.class);

                // Find an exercise from this muscle group that we haven't added yet
                for (Exercise exercise : muscleGroupExercises) {
                    if (!balancedResults.contains(exercise)) {
                        balancedResults.add(exercise);
                        break; // Move to next muscle group after finding one exercise
                    }
                }

                muscleGroupIndex++;
            }

            return balancedResults.stream()
                    .limit(limit)
                    .collect(Collectors.toList());

        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by workout category: " + workoutCategory, e);
        }
    }
}

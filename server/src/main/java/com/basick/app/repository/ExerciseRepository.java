package com.basick.app.repository;

import java.util.ArrayList;
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

    // 🚀 CACHING
    private List<Exercise> cachedExercises = null;
    private long lastCacheTime = 0;
    private static final long CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    public ExerciseRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Get all exercises with caching to prevent quota exhaustion
     */
    private List<Exercise> getAllExercisesWithCache() throws InterruptedException, ExecutionException {
        long currentTime = System.currentTimeMillis();

        // If cache is empty or expired, fetch from Firestore
        if (cachedExercises == null || (currentTime - lastCacheTime) > CACHE_DURATION) {
            System.out.println("🔄 Fetching exercises from Firestore (cache miss/expired)");
            cachedExercises = firestoreService.findAll(COLLECTION_NAME, Exercise.class);
            lastCacheTime = currentTime;
            System.out.println("✅ Cached " + cachedExercises.size() + " exercises");
        } else {
            System.out.println("🚀 Using cached exercises (" + cachedExercises.size() + " exercises)");
        }

        return new ArrayList<>(cachedExercises); // Return copy to prevent modification
    }

    /**
     * Clear cache when data is modified
     */
    private void clearCache() {
        System.out.println("🧹 Clearing exercise cache");
        cachedExercises = null;
        lastCacheTime = 0;
    }

    // 🏋️ NEW: Helper method to filter exercises by environment
    private boolean isExerciseValidForEnvironment(Exercise exercise, String environment) {
        List<String> equipmentRequired = exercise.getEquipmentRequired();
        
        if (equipmentRequired == null || equipmentRequired.isEmpty()) {
            // If no equipment specified, assume it's bodyweight
            return true;
        }

        switch (environment.toUpperCase()) {
            case "HOME":
                // Home workout: only bodyweight and bands
                return equipmentRequired.stream().allMatch(equipment -> 
                    equipment.toUpperCase().contains("BODY_WEIGHT") || 
                    equipment.toUpperCase().contains("BAND") ||
                    equipment.toUpperCase().contains("RESISTANCE_BAND")
                );
                
            case "BAKAL_GYM":
                // Bakal gym: exclude machines and cables
                return equipmentRequired.stream().noneMatch(equipment -> 
                    equipment.toUpperCase().contains("MACHINE") || 
                    equipment.toUpperCase().contains("CABLE")
                );
                
            case "GYM":
            default:
                // Full gym: include all exercises
                return true;
        }
    }

    /**
     * Save a new exercise
     */
    public Exercise save(Exercise exercise) {
        try {
            String id = UUID.randomUUID().toString();
            exercise.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, exercise);
            clearCache(); // Clear cache when data changes
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
            clearCache(); // Clear cache when data changes
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
            // Use cache for findById too
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> exerciseId.equals(exercise.getId()))
                    .findFirst()
                    .orElse(null);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercise by ID: " + exerciseId, e);
        }
    }

    /**
     * Find all exercises
     */
    public List<Exercise> findAll() {
        try {
            return getAllExercisesWithCache();
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
            clearCache(); // Clear cache when data changes
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting exercise with ID: " + exerciseId, e);
        }
    }

    /**
     * Search exercises by name or description - using cache
     */
    public List<Exercise> searchByNameOrDescription(String query) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();

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
     * Find exercises by muscle group - using cache
     */
    public List<Exercise> findByMuscleGroup(String muscleGroup) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> muscleGroup.equalsIgnoreCase(exercise.getMuscleGroup()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by muscle group: " + muscleGroup, e);
        }
    }

    /**
     * Find exercises by difficulty - using cache
     */
    public List<Exercise> findByDifficulty(String difficulty) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> difficulty.equalsIgnoreCase(exercise.getDifficulty()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by difficulty: " + difficulty, e);
        }
    }

    /**
     * Find exercises by category - using cache
     */
    public List<Exercise> findByCategory(String category, int limit) {
        try {
            String normalizedCategory = category.toLowerCase().trim();
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> exercise.getCategories() != null && exercise.getCategories().stream()
                        .anyMatch(cat -> normalizedCategory.equalsIgnoreCase(cat)))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by category: " + category, e);
        }
    }

    /**
     * Find exercises by public status - using cache
     */
    public List<Exercise> findByIsPublic(boolean isPublic) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> isPublic == exercise.getIsPublic())
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by public status: " + isPublic, e);
        }
    }

    /**
     * Find exercises by creator - using cache
     */
    public List<Exercise> findByCreatedBy(String createdBy) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> createdBy.equals(exercise.getCreatedBy()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding exercises by creator: " + createdBy, e);
        }
    }

    /**
     * Count exercises by muscle group - using cache
     */
    public long countByMuscleGroup(String muscleGroup) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> muscleGroup.equalsIgnoreCase(exercise.getMuscleGroup()))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting exercises by muscle group: " + muscleGroup, e);
        }
    }

    /**
     * Count exercises by category - using cache
     */
    public long countByCategory(String category) {
        try {
            // 🚀 USE CACHE instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            return allExercises.stream()
                    .filter(exercise -> exercise.getCategories() != null && exercise.getCategories().contains(category))
                    .count();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error counting exercises by category: " + category, e);
        }
    }



    /**
     * 🏋️ NEW: Find exercises by workout category, difficulty, and environment with caching
     */
    public List<Exercise> findByWorkoutCategoryDifficultyAndEnvironment(String workoutCategory, String difficulty, String environment, int limit) {
        try {
            System.out.println("🎯 Repository - Category: " + workoutCategory + ", Difficulty: " + difficulty + ", Environment: " + environment + ", Limit: " + limit);

            List<Exercise> balancedResults = new ArrayList<>();
            List<String> targetMuscleGroups = new ArrayList<>();

            // Define muscle groups for each category
            switch (workoutCategory.toLowerCase()) {
                case "arms":
                    targetMuscleGroups.addAll(List.of("Biceps", "Triceps", "Forearms"));
                    break;

                case "full body":
                    targetMuscleGroups.addAll(List.of("Upper Back", "Triceps", "Quads", "Delts", "Biceps", "Glutes", "Abs", "Hamstrings"));
                    break;

                case "lower body":
                    targetMuscleGroups.addAll(List.of("Quads", "Hamstrings", "Glutes", "Calves"));
                    break;

                case "upper body":
                    targetMuscleGroups.addAll(List.of("Upper Back", "Delts", "Biceps", "Triceps", "Forearms"));
                    break;

                case "abs":
                    targetMuscleGroups.addAll(List.of("Abs", "Core"));
                    break;

                case "cardio":
                    System.out.println("🏃 Processing cardio category");
                    List<Exercise> allExercises = getAllExercisesWithCache();
                    List<Exercise> cardioExercises = allExercises.stream()
                            .filter(exercise -> exercise.getTags() != null
                            && exercise.getTags().stream().anyMatch(tag -> tag.toLowerCase().contains("cardio"))
                            && difficulty.equalsIgnoreCase(exercise.getDifficulty())
                            && isExerciseValidForEnvironment(exercise, environment)) // 🏋️ NEW: Environment filter
                            .limit(limit)
                            .collect(Collectors.toList());
                    System.out.println("🏃 Found " + cardioExercises.size() + " cardio exercises for " + environment);
                    return cardioExercises;

                default:
                    System.out.println("❌ Unknown category: " + workoutCategory);
                    return new ArrayList<>();
            }

            System.out.println("🎯 Target muscle groups: " + targetMuscleGroups);

            // 🚀 USE CACHED VERSION instead of direct Firestore call
            List<Exercise> allExercises = getAllExercisesWithCache();
            System.out.println("📊 Total exercises in cache: " + allExercises.size());

            // Filter exercises by difficulty and environment first
            List<Exercise> exercisesWithDifficultyAndEnvironment = allExercises.stream()
                    .filter(exercise -> difficulty.equalsIgnoreCase(exercise.getDifficulty()))
                    .filter(exercise -> isExerciseValidForEnvironment(exercise, environment)) // 🏋️ NEW: Environment filter
                    .collect(Collectors.toList());
            System.out.println("📊 Exercises with difficulty " + difficulty + " and environment " + environment + ": " + exercisesWithDifficultyAndEnvironment.size());

            // Cycle through muscle groups to get balanced selection
            int muscleGroupIndex = 0;
            while (balancedResults.size() < limit && muscleGroupIndex < targetMuscleGroups.size() * 3) {
                String currentMuscleGroup = targetMuscleGroups.get(muscleGroupIndex % targetMuscleGroups.size());

                // Get exercises for current muscle group
                List<Exercise> muscleGroupExercises = exercisesWithDifficultyAndEnvironment.stream()
                        .filter(exercise -> currentMuscleGroup.equalsIgnoreCase(exercise.getMuscleGroup()))
                        .collect(Collectors.toList());

                System.out.println("🔍 " + currentMuscleGroup + " (" + environment + "): " + muscleGroupExercises.size() + " exercises");

                // Find an exercise from this muscle group that we haven't added yet
                for (Exercise exercise : muscleGroupExercises) {
                    if (!balancedResults.contains(exercise)) {
                        balancedResults.add(exercise);
                        System.out.println("✅ Added: " + exercise.getName() + " (" + exercise.getMuscleGroup() + ", " + exercise.getDifficulty() + ", " + environment + ")");
                        break; // Move to next muscle group after finding one exercise
                    }
                }

                muscleGroupIndex++;
            }

            System.out.println("🏁 Final result: " + balancedResults.size() + " exercises for " + environment + " environment");
            return balancedResults;

        } catch (InterruptedException | ExecutionException e) {
            System.err.println("❌ Repository Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error finding exercises by workout category, difficulty and environment: " + workoutCategory + ", " + difficulty + ", " + environment, e);
        }
    }
}
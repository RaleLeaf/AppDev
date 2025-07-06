package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.UserFinishedWorkout;
import com.basick.app.service.FirestoreService;
import com.google.cloud.Timestamp;

/**
 * Repository class for UserFinishedWorkout CRUD operations with Firestore
 */
@Repository
public class UserFinishedWorkoutRepository {

    private static final String COLLECTION_NAME = "userFinishedWorkouts";
    
    private final FirestoreService firestoreService;

    public UserFinishedWorkoutRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new user finished workout
     */
    public UserFinishedWorkout save(UserFinishedWorkout userFinishedWorkout) {
        try {
            String id = UUID.randomUUID().toString();
            userFinishedWorkout.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, userFinishedWorkout);
            return userFinishedWorkout;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving user finished workout", e);
        }
    }

    /**
     * Update an existing user finished workout
     */
    public UserFinishedWorkout update(UserFinishedWorkout userFinishedWorkout) {
        try {
            userFinishedWorkout.updateTimestamp();
            firestoreService.saveWithId(COLLECTION_NAME, userFinishedWorkout.getId(), userFinishedWorkout);
            return userFinishedWorkout;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating user finished workout", e);
        }
    }

    /**
     * Find user finished workout by ID
     */
    public UserFinishedWorkout findById(String id) {
        try {
            return firestoreService.findById(COLLECTION_NAME, id, UserFinishedWorkout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user finished workout by ID: " + id, e);
        }
    }

    /**
     * Find all user finished workouts by user ID
     */
    public List<UserFinishedWorkout> findByUserId(String userId) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFinishedWorkout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user finished workouts by user ID: " + userId, e);
        }
    }

    /**
     * Find all user finished workouts by workout ID
     */
    public List<UserFinishedWorkout> findByWorkoutId(String workoutId) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "workoutId", workoutId, UserFinishedWorkout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user finished workouts by workout ID: " + workoutId, e);
        }
    }

    /**
     * Find user finished workouts by user ID and date range
     */
    public List<UserFinishedWorkout> findByUserIdAndDateRange(String userId, String startDate, String endDate) {
        try {
            // Parse dates and convert to Timestamps
            Timestamp startTimestamp = parseToTimestamp(startDate);
            Timestamp endTimestamp = parseToTimestamp(endDate);
            
            List<UserFinishedWorkout> allUserWorkouts = findByUserId(userId);
            return allUserWorkouts.stream()
                    .filter(workout -> workout.getCompletedAt() != null)
                    .filter(workout -> 
                        workout.getCompletedAt().compareTo(startTimestamp) >= 0 &&
                        workout.getCompletedAt().compareTo(endTimestamp) <= 0
                    )
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error finding user finished workouts by date range", e);
        }
    }

    /**
     * Find recent user finished workouts by user ID
     */
    public List<UserFinishedWorkout> findRecentByUserId(String userId, int limit) {
        try {
            List<UserFinishedWorkout> allUserWorkouts = findByUserId(userId);
            return allUserWorkouts.stream()
                    .filter(workout -> workout.getCompletedAt() != null)
                    .sorted((w1, w2) -> w2.getCompletedAt().compareTo(w1.getCompletedAt())) // Most recent first
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error finding recent user finished workouts", e);
        }
    }

    /**
     * Find all user finished workouts
     */
    public List<UserFinishedWorkout> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, UserFinishedWorkout.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all user finished workouts", e);
        }
    }

    /**
     * Delete user finished workout by ID
     */
    public boolean deleteById(String id) {
        try {
            firestoreService.delete(COLLECTION_NAME, id);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user finished workout with ID: " + id, e);
        }
    }

    /**
     * Delete all user finished workouts by user ID
     */
    public boolean deleteByUserId(String userId) {
        try {
            List<UserFinishedWorkout> userWorkouts = findByUserId(userId);
            for (UserFinishedWorkout workout : userWorkouts) {
                firestoreService.delete(COLLECTION_NAME, workout.getId());
            }
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user finished workouts for user ID: " + userId, e);
        }
    }

    /**
     * Count total workouts by user ID
     */
    public int countByUserId(String userId) {
        try {
            List<UserFinishedWorkout> userWorkouts = findByUserId(userId);
            return userWorkouts.size();
        } catch (Exception e) {
            throw new RuntimeException("Error counting user finished workouts for user ID: " + userId, e);
        }
    }

    /**
     * Parse string date to Timestamp
     * Expected format: "YYYY-MM-DD" or ISO format
     */
    private Timestamp parseToTimestamp(String dateString) {
        try {
            // If the date string contains 'T', it's likely an ISO format
            if (dateString.contains("T")) {
                return Timestamp.parseTimestamp(dateString);
            } else {
                // Assume format is "YYYY-MM-DD", convert to ISO format
                return Timestamp.parseTimestamp(dateString + "T00:00:00Z");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing date string: " + dateString, e);
        }
    }
}
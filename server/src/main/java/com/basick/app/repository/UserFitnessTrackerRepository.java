package com.basick.app.repository;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.UserFitnessTracker;
import com.basick.app.service.FirestoreService;
import com.google.cloud.Timestamp;

/**
 * Repository class for UserFitnessTracker CRUD operations with Firestore
 */
@Repository
public class UserFitnessTrackerRepository {

    private static final String COLLECTION_NAME = "userFitnessTrackers";
    
    private final FirestoreService firestoreService;

    public UserFitnessTrackerRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new user fitness tracker
     */
    public UserFitnessTracker save(UserFitnessTracker userFitnessTracker) {
        try {
            String id = UUID.randomUUID().toString();
            userFitnessTracker.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, userFitnessTracker);
            return userFitnessTracker;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving user fitness tracker", e);
        }
    }

    /**
     * Update an existing user fitness tracker
     */
    public UserFitnessTracker update(UserFitnessTracker userFitnessTracker) {
        try {
            userFitnessTracker.updateTimestamp();
            firestoreService.saveWithId(COLLECTION_NAME, userFitnessTracker.getId(), userFitnessTracker);
            return userFitnessTracker;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating user fitness tracker", e);
        }
    }

    /**
     * Find user fitness tracker by ID
     */
    public UserFitnessTracker findById(String id) {
        try {
            return firestoreService.findById(COLLECTION_NAME, id, UserFitnessTracker.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user fitness tracker by ID: " + id, e);
        }
    }

    /**
     * Find all user fitness trackers by user ID
     */
    public List<UserFitnessTracker> findByUserId(String userId) {
        try {
            return firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFitnessTracker.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user fitness trackers by user ID: " + userId, e);
        }
    }

    /**
     * Find user fitness tracker by user ID and specific date
     */
    public UserFitnessTracker findByUserIdAndDate(String userId, String date) {
        try {
            List<UserFitnessTracker> trackers = findByUserId(userId);
            Timestamp targetDate = parseToTimestamp(date);
            
            return trackers.stream()
                    .filter(tracker -> tracker.getTrackingDate() != null)
                    .filter(tracker -> isSameDate(tracker.getTrackingDate(), targetDate))
                    .findFirst()
                    .orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Error finding user fitness tracker by date", e);
        }
    }

    /**
     * Find user fitness trackers by user ID and date range
     */
    public List<UserFitnessTracker> findByUserIdAndDateRange(String userId, String startDate, String endDate) {
        try {
            // Parse dates and convert to Timestamps
            Timestamp startTimestamp = parseToTimestamp(startDate);
            Timestamp endTimestamp = parseToTimestamp(endDate);
            
            List<UserFitnessTracker> allUserTrackers = findByUserId(userId);
            return allUserTrackers.stream()
                    .filter(tracker -> tracker.getTrackingDate() != null)
                    .filter(tracker -> 
                        tracker.getTrackingDate().compareTo(startTimestamp) >= 0 &&
                        tracker.getTrackingDate().compareTo(endTimestamp) <= 0
                    )
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error finding user fitness trackers by date range", e);
        }
    }

    /**
     * Find recent user fitness trackers by user ID
     */
    public List<UserFitnessTracker> findRecentByUserId(String userId, int limit) {
        try {
            List<UserFitnessTracker> allUserTrackers = findByUserId(userId);
            return allUserTrackers.stream()
                    .filter(tracker -> tracker.getTrackingDate() != null)
                    .sorted((t1, t2) -> t2.getTrackingDate().compareTo(t1.getTrackingDate())) // Most recent first
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error finding recent user fitness trackers", e);
        }
    }

    /**
     * Find all user fitness trackers
     */
    public List<UserFitnessTracker> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, UserFitnessTracker.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all user fitness trackers", e);
        }
    }

    /**
     * Delete user fitness tracker by ID
     */
    public boolean deleteById(String id) {
        try {
            firestoreService.delete(COLLECTION_NAME, id);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user fitness tracker with ID: " + id, e);
        }
    }

    /**
     * Delete all user fitness trackers by user ID
     */
    public boolean deleteByUserId(String userId) {
        try {
            List<UserFitnessTracker> userTrackers = findByUserId(userId);
            for (UserFitnessTracker tracker : userTrackers) {
                firestoreService.delete(COLLECTION_NAME, tracker.getId());
            }
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user fitness trackers for user ID: " + userId, e);
        }
    }

    /**
     * Count total trackers by user ID
     */
    public int countByUserId(String userId) {
        try {
            List<UserFitnessTracker> userTrackers = findByUserId(userId);
            return userTrackers.size();
        } catch (Exception e) {
            throw new RuntimeException("Error counting user fitness trackers for user ID: " + userId, e);
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

    /**
     * Check if two timestamps are on the same date (ignoring time)
     */
    private boolean isSameDate(Timestamp date1, Timestamp date2) {
        try {
            // Convert to date strings and compare
            String date1Str = date1.toString().substring(0, 10); // YYYY-MM-DD
            String date2Str = date2.toString().substring(0, 10); // YYYY-MM-DD
            return date1Str.equals(date2Str);
        } catch (Exception e) {
            return false;
        }
    }
}

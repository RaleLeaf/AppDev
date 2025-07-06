package com.basick.app.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.UserMacroTracker;
import com.basick.app.service.FirestoreService;
import com.google.cloud.Timestamp;

/**
 * Repository class for UserMacroTracker CRUD operations with Firestore
 */
@Repository
public class UserMacroTrackerRepository {

    private static final String COLLECTION_NAME = "userMacroTrackers";
    
    private final FirestoreService firestoreService;

    public UserMacroTrackerRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new user macro tracker
     */
    public UserMacroTracker save(UserMacroTracker tracker) {
        try {
            String id = UUID.randomUUID().toString();
            tracker.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, tracker);
            return tracker;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving user macro tracker", e);
        }
    }

    /**
     * Update an existing user macro tracker
     */
    public UserMacroTracker update(UserMacroTracker tracker) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, tracker.getId(), tracker);
            return tracker;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating user macro tracker", e);
        }
    }

    /**
     * Find user macro tracker by ID
     */
    public UserMacroTracker findById(String trackerId) {
        try {
            return firestoreService.findById(COLLECTION_NAME, trackerId, UserMacroTracker.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user macro tracker by ID", e);
        }
    }

    /**
     * Delete user macro tracker by ID
     */
    public boolean delete(String trackerId) {
        try {
            firestoreService.delete(COLLECTION_NAME, trackerId);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting user macro tracker", e);
        }
    }

    /**
     * Find macro tracker by user ID and date
     */
    public UserMacroTracker findByUserIdAndDate(String userId, String date) {
        try {
            List<UserMacroTracker> userTrackers = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserMacroTracker.class);
            
            // Parse the date and create start/end timestamps for the day
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
            Timestamp startOfDay = Timestamp.ofTimeSecondsAndNanos(
                localDate.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            Timestamp endOfDay = Timestamp.ofTimeSecondsAndNanos(
                localDate.plusDays(1).atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            
            return userTrackers.stream()
                    .filter(tracker -> tracker.getDate() != null &&
                                      tracker.getDate().compareTo(startOfDay) >= 0 &&
                                      tracker.getDate().compareTo(endOfDay) < 0)
                    .findFirst()
                    .orElse(null);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding macro tracker by user ID and date", e);
        }
    }

    /**
     * Find macro trackers for a user within specified days
     */
    public List<UserMacroTracker> findByUserIdWithinDays(String userId, int days) {
        try {
            List<UserMacroTracker> userTrackers = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserMacroTracker.class);
            
            LocalDate endDate = LocalDate.now();
            LocalDate startDate = endDate.minusDays(days - 1);
            
            Timestamp startTimestamp = Timestamp.ofTimeSecondsAndNanos(
                startDate.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            Timestamp endTimestamp = Timestamp.ofTimeSecondsAndNanos(
                endDate.plusDays(1).atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            
            return userTrackers.stream()
                    .filter(tracker -> tracker.getDate() != null &&
                                      tracker.getDate().compareTo(startTimestamp) >= 0 &&
                                      tracker.getDate().compareTo(endTimestamp) < 0)
                    .sorted((t1, t2) -> t2.getDate().compareTo(t1.getDate()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding macro trackers within days", e);
        }
    }

    /**
     * Find all macro trackers for a user
     */
    public List<UserMacroTracker> findByUserId(String userId, int limit) {
        try {
            List<UserMacroTracker> userTrackers = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserMacroTracker.class);
            return userTrackers.stream()
                    .sorted((t1, t2) -> {
                        if (t1.getDate() == null && t2.getDate() == null) return 0;
                        if (t1.getDate() == null) return 1;
                        if (t2.getDate() == null) return -1;
                        return t2.getDate().compareTo(t1.getDate());
                    })
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding macro trackers by user ID", e);
        }
    }

    /**
     * Find macro trackers by date range
     */
    public List<UserMacroTracker> findByUserIdAndDateRange(String userId, String startDate, String endDate) {
        try {
            List<UserMacroTracker> userTrackers = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserMacroTracker.class);
            
            LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE);
            
            Timestamp startTimestamp = Timestamp.ofTimeSecondsAndNanos(
                start.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            Timestamp endTimestamp = Timestamp.ofTimeSecondsAndNanos(
                end.plusDays(1).atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            
            return userTrackers.stream()
                    .filter(tracker -> tracker.getDate() != null &&
                                      tracker.getDate().compareTo(startTimestamp) >= 0 &&
                                      tracker.getDate().compareTo(endTimestamp) < 0)
                    .sorted((t1, t2) -> t1.getDate().compareTo(t2.getDate()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding macro trackers by date range", e);
        }
    }

    /**
     * Get average daily calories for a user over specified days
     */
    public Double getAverageDailyCalories(String userId, int days) {
        try {
            List<UserMacroTracker> trackers = findByUserIdWithinDays(userId, days);
            if (trackers.isEmpty()) {
                return 0.0;
            }
            
            double totalCalories = trackers.stream()
                    .filter(tracker -> tracker.getCaloriesConsumed() != null)
                    .mapToDouble(UserMacroTracker::getCaloriesConsumed)
                    .sum();
            
            return totalCalories / trackers.size();
        } catch (Exception e) {
            throw new RuntimeException("Error calculating average daily calories", e);
        }
    }

    /**
     * Check if user has tracked on a specific date
     */
    public boolean hasTrackedOnDate(String userId, String date) {
        try {
            UserMacroTracker tracker = findByUserIdAndDate(userId, date);
            return tracker != null;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get streak of consecutive tracking days
     */
    public int getTrackingStreak(String userId) {
        try {
            List<UserMacroTracker> trackers = findByUserId(userId, 365); // Check last year
            if (trackers.isEmpty()) {
                return 0;
            }
            
            LocalDate currentDate = LocalDate.now();
            int streak = 0;
            
            // Check if today has tracking
            if (!hasTrackedOnDate(userId, currentDate.format(DateTimeFormatter.ISO_LOCAL_DATE))) {
                return 0;
            }
            
            // Count consecutive days backwards
            for (int i = 0; i < 365; i++) {
                String dateStr = currentDate.minusDays(i).format(DateTimeFormatter.ISO_LOCAL_DATE);
                if (hasTrackedOnDate(userId, dateStr)) {
                    streak++;
                } else {
                    break;
                }
            }
            
            return streak;
        } catch (Exception e) {
            return 0;
        }
    }
}

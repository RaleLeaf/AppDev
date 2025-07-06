package com.basick.app.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.UserFoodLog;
import com.basick.app.service.FirestoreService;
import com.google.cloud.Timestamp;

/**
 * Repository class for UserFoodLog CRUD operations with Firestore
 */
@Repository
public class UserFoodLogRepository {

    private static final String COLLECTION_NAME = "userFoodLogs";
    
    private final FirestoreService firestoreService;

    public UserFoodLogRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new user food log
     */
    public UserFoodLog save(UserFoodLog userFoodLog) {
        try {
            String id = UUID.randomUUID().toString();
            userFoodLog.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, userFoodLog);
            return userFoodLog;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving user food log", e);
        }
    }

    /**
     * Update an existing user food log
     */
    public UserFoodLog update(UserFoodLog userFoodLog) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, userFoodLog.getId(), userFoodLog);
            return userFoodLog;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating user food log", e);
        }
    }

    /**
     * Find user food log by ID
     */
    public UserFoodLog findById(String foodLogId) {
        try {
            return firestoreService.findById(COLLECTION_NAME, foodLogId, UserFoodLog.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding user food log by ID", e);
        }
    }

    /**
     * Delete user food log by ID
     */
    public boolean delete(String foodLogId) {
        try {
            firestoreService.delete(COLLECTION_NAME, foodLogId);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting user food log", e);
        }
    }

    /**
     * Find all food logs for a user
     */
    public List<UserFoodLog> findByUserId(String userId, int limit) {
        try {
            List<UserFoodLog> allLogs = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFoodLog.class);
            return allLogs.stream()
                    .sorted((log1, log2) -> log2.getLoggedAt().compareTo(log1.getLoggedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food logs by user ID", e);
        }
    }

    /**
     * Find food logs for a specific date
     */
    public List<UserFoodLog> findByUserIdAndDate(String userId, String date) {
        try {
            List<UserFoodLog> userLogs = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFoodLog.class);
            
            // Parse the date and create start/end timestamps for the day
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
            Timestamp startOfDay = Timestamp.ofTimeSecondsAndNanos(
                localDate.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            Timestamp endOfDay = Timestamp.ofTimeSecondsAndNanos(
                localDate.plusDays(1).atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            
            return userLogs.stream()
                    .filter(log -> log.getConsumedAt() != null &&
                                  log.getConsumedAt().compareTo(startOfDay) >= 0 &&
                                  log.getConsumedAt().compareTo(endOfDay) < 0)
                    .sorted((log1, log2) -> log1.getConsumedAt().compareTo(log2.getConsumedAt()))
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food logs by user ID and date", e);
        }
    }

    /**
     * Find food logs by meal type for a specific date
     */
    public List<UserFoodLog> findByUserIdDateAndMeal(String userId, String date, String mealType) {
        try {
            List<UserFoodLog> dateLogs = findByUserIdAndDate(userId, date);
            return dateLogs.stream()
                    .filter(log -> mealType.equalsIgnoreCase(log.getMealType()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error finding food logs by user ID, date, and meal", e);
        }
    }

    /**
     * Find recent food logs for a user
     */
    public List<UserFoodLog> findRecentByUserId(String userId, int limit) {
        try {
            List<UserFoodLog> userLogs = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFoodLog.class);
            return userLogs.stream()
                    .filter(log -> log.getLoggedAt() != null)
                    .sorted((log1, log2) -> log2.getLoggedAt().compareTo(log1.getLoggedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding recent food logs", e);
        }
    }

    /**
     * Find frequently consumed foods by user
     */
    public List<UserFoodLog> findFrequentlyConsumed(String userId, int limit) {
        try {
            List<UserFoodLog> userLogs = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFoodLog.class);
            
            // Group by food name and count occurrences, then return most frequent
            return userLogs.stream()
                    .filter(log -> log.getFoodName() != null)
                    .collect(Collectors.groupingBy(UserFoodLog::getFoodName, Collectors.counting()))
                    .entrySet().stream()
                    .sorted((entry1, entry2) -> Long.compare(entry2.getValue(), entry1.getValue()))
                    .limit(limit)
                    .map(entry -> {
                        // Return the most recent log for each frequently consumed food
                        return userLogs.stream()
                                .filter(log -> entry.getKey().equals(log.getFoodName()))
                                .sorted((log1, log2) -> log2.getLoggedAt().compareTo(log1.getLoggedAt()))
                                .findFirst()
                                .orElse(null);
                    })
                    .filter(log -> log != null)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding frequently consumed foods", e);
        }
    }

    /**
     * Find food logs by food ID
     */
    public List<UserFoodLog> findByFoodId(String foodId, int limit) {
        try {
            List<UserFoodLog> allLogs = firestoreService.findByField(COLLECTION_NAME, "foodId", foodId, UserFoodLog.class);
            return allLogs.stream()
                    .sorted((log1, log2) -> log2.getLoggedAt().compareTo(log1.getLoggedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food logs by food ID", e);
        }
    }

    /**
     * Find food logs by barcode
     */
    public List<UserFoodLog> findByBarcode(String barcode, int limit) {
        try {
            List<UserFoodLog> allLogs = firestoreService.findByField(COLLECTION_NAME, "barcode", barcode, UserFoodLog.class);
            return allLogs.stream()
                    .sorted((log1, log2) -> log2.getLoggedAt().compareTo(log1.getLoggedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food logs by barcode", e);
        }
    }

    /**
     * Get total calories consumed by user in date range
     */
    public Double getTotalCaloriesByUserInDateRange(String userId, String startDate, String endDate) {
        try {
            List<UserFoodLog> userLogs = firestoreService.findByField(COLLECTION_NAME, "userId", userId, UserFoodLog.class);
            
            LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE);
            
            Timestamp startTimestamp = Timestamp.ofTimeSecondsAndNanos(
                start.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            Timestamp endTimestamp = Timestamp.ofTimeSecondsAndNanos(
                end.plusDays(1).atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
            
            return userLogs.stream()
                    .filter(log -> log.getConsumedAt() != null &&
                                  log.getConsumedAt().compareTo(startTimestamp) >= 0 &&
                                  log.getConsumedAt().compareTo(endTimestamp) < 0 &&
                                  log.getCalories() != null)
                    .mapToDouble(UserFoodLog::getCalories)
                    .sum();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error calculating total calories", e);
        }
    }
}

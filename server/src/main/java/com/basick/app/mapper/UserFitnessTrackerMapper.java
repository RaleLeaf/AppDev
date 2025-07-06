package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.userfitnesstracker.CreateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UpdateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UserFitnessTrackerDTO;
import com.basick.app.dto.userfitnesstracker.UserFitnessSummaryDTO;
import com.basick.app.model.UserFitnessTracker;

/**
 * Mapper class for UserFitnessTracker entity and DTOs
 */
@Component
public class UserFitnessTrackerMapper {

    /**
     * Convert UserFitnessTracker entity to DTO
     */
    public UserFitnessTrackerDTO toDTO(UserFitnessTracker userFitnessTracker) {
        if (userFitnessTracker == null) {
            return null;
        }

        UserFitnessTrackerDTO dto = new UserFitnessTrackerDTO();
        dto.setId(userFitnessTracker.getId());
        dto.setUserId(userFitnessTracker.getUserId());
        dto.setTrackingDate(userFitnessTracker.getTrackingDate());
        dto.setNumberOfWorkouts(userFitnessTracker.getNumberOfWorkouts());
        dto.setCaloriesConsumed(userFitnessTracker.getCaloriesConsumed());
        dto.setCaloriesBurned(userFitnessTracker.getCaloriesBurned());
        dto.setCaloriesNet(userFitnessTracker.getCaloriesNet());
        dto.setSteps(userFitnessTracker.getSteps());
        dto.setDistanceKm(userFitnessTracker.getDistanceKm());
        dto.setActiveMinutes(userFitnessTracker.getActiveMinutes());
        dto.setAverageHeartRate(userFitnessTracker.getAverageHeartRate());
        dto.setRestingHeartRate(userFitnessTracker.getRestingHeartRate());
        dto.setWeightKg(userFitnessTracker.getWeightKg());
        dto.setBodyFatPercentage(userFitnessTracker.getBodyFatPercentage());
        dto.setWaterIntakeLiters(userFitnessTracker.getWaterIntakeLiters());
        dto.setSleepHours(userFitnessTracker.getSleepHours());
        dto.setStressLevel(userFitnessTracker.getStressLevel());
        dto.setMood(userFitnessTracker.getMood());
        dto.setNotes(userFitnessTracker.getNotes());
        dto.setCreatedAt(userFitnessTracker.getCreatedAt());
        dto.setUpdatedAt(userFitnessTracker.getUpdatedAt());

        return dto;
    }

    /**
     * Convert UserFitnessTracker entity list to DTO list
     */
    public List<UserFitnessTrackerDTO> toDTOList(List<UserFitnessTracker> userFitnessTrackers) {
        if (userFitnessTrackers == null) {
            return null;
        }

        return userFitnessTrackers.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert CreateUserFitnessTrackerRequest to UserFitnessTracker entity
     */
    public UserFitnessTracker toEntity(CreateUserFitnessTrackerRequest request) {
        if (request == null) {
            return null;
        }

        UserFitnessTracker userFitnessTracker = new UserFitnessTracker();
        userFitnessTracker.setUserId(request.getUserId());
        userFitnessTracker.setTrackingDate(request.getTrackingDate());
        userFitnessTracker.setNumberOfWorkouts(request.getNumberOfWorkouts());
        userFitnessTracker.setCaloriesConsumed(request.getCaloriesConsumed());
        userFitnessTracker.setCaloriesBurned(request.getCaloriesBurned());
        userFitnessTracker.setSteps(request.getSteps());
        userFitnessTracker.setDistanceKm(request.getDistanceKm());
        userFitnessTracker.setActiveMinutes(request.getActiveMinutes());
        userFitnessTracker.setAverageHeartRate(request.getAverageHeartRate());
        userFitnessTracker.setRestingHeartRate(request.getRestingHeartRate());
        userFitnessTracker.setWeightKg(request.getWeightKg());
        userFitnessTracker.setBodyFatPercentage(request.getBodyFatPercentage());
        userFitnessTracker.setWaterIntakeLiters(request.getWaterIntakeLiters());
        userFitnessTracker.setSleepHours(request.getSleepHours());
        userFitnessTracker.setStressLevel(request.getStressLevel());
        userFitnessTracker.setMood(request.getMood());
        userFitnessTracker.setNotes(request.getNotes());

        return userFitnessTracker;
    }

    /**
     * Update UserFitnessTracker entity with UpdateUserFitnessTrackerRequest data
     */
    public void updateEntity(UserFitnessTracker userFitnessTracker, UpdateUserFitnessTrackerRequest request) {
        if (userFitnessTracker == null || request == null) {
            return;
        }

        if (request.getNumberOfWorkouts() != null) {
            userFitnessTracker.setNumberOfWorkouts(request.getNumberOfWorkouts());
        }
        
        if (request.getCaloriesConsumed() != null) {
            userFitnessTracker.setCaloriesConsumed(request.getCaloriesConsumed());
        }
        
        if (request.getCaloriesBurned() != null) {
            userFitnessTracker.setCaloriesBurned(request.getCaloriesBurned());
        }
        
        if (request.getSteps() != null) {
            userFitnessTracker.setSteps(request.getSteps());
        }
        
        if (request.getDistanceKm() != null) {
            userFitnessTracker.setDistanceKm(request.getDistanceKm());
        }
        
        if (request.getActiveMinutes() != null) {
            userFitnessTracker.setActiveMinutes(request.getActiveMinutes());
        }
        
        if (request.getAverageHeartRate() != null) {
            userFitnessTracker.setAverageHeartRate(request.getAverageHeartRate());
        }
        
        if (request.getRestingHeartRate() != null) {
            userFitnessTracker.setRestingHeartRate(request.getRestingHeartRate());
        }
        
        if (request.getWeightKg() != null) {
            userFitnessTracker.setWeightKg(request.getWeightKg());
        }
        
        if (request.getBodyFatPercentage() != null) {
            userFitnessTracker.setBodyFatPercentage(request.getBodyFatPercentage());
        }
        
        if (request.getWaterIntakeLiters() != null) {
            userFitnessTracker.setWaterIntakeLiters(request.getWaterIntakeLiters());
        }
        
        if (request.getSleepHours() != null) {
            userFitnessTracker.setSleepHours(request.getSleepHours());
        }
        
        if (request.getStressLevel() != null) {
            userFitnessTracker.setStressLevel(request.getStressLevel());
        }
        
        if (request.getMood() != null) {
            userFitnessTracker.setMood(request.getMood());
        }
        
        if (request.getNotes() != null) {
            userFitnessTracker.setNotes(request.getNotes());
        }
    }

    /**
     * Convert UserFitnessTracker list to UserFitnessSummaryDTO
     * This method aggregates data from multiple tracking records
     */
    public UserFitnessSummaryDTO toSummaryDTO(String userId, List<UserFitnessTracker> trackers) {
        if (trackers == null || trackers.isEmpty()) {
            UserFitnessSummaryDTO summary = new UserFitnessSummaryDTO();
            summary.setUserId(userId);
            summary.setDaysTracked(0);
            // Set all other fields to appropriate default values
            summary.setAverageWeightKg(0.0);
            summary.setAverageBodyFatPercentage(0.0);
            summary.setAverageSteps(0);
            summary.setAverageCaloriesConsumed(0.0);
            summary.setAverageCaloriesBurned(0.0);
            summary.setAverageCaloriesNet(0.0);
            summary.setAverageDistanceKm(0.0);
            summary.setAverageWaterIntakeLiters(0.0);
            summary.setAverageSleepHours(0);
            summary.setAverageActiveMinutes(0.0);
            summary.setAverageHeartRate(0);
            summary.setAverageStressLevel(0.0);
            summary.setTotalWorkoutsRecorded(0);
            return summary;
        }

        UserFitnessSummaryDTO summary = new UserFitnessSummaryDTO();
        summary.setUserId(userId);
        summary.setDaysTracked(trackers.size());

        // Calculate averages and totals
        double totalWeight = 0;
        double totalBodyFat = 0;
        int totalSteps = 0;
        double totalCaloriesConsumed = 0;
        double totalCaloriesBurned = 0;
        double totalCaloriesNet = 0;
        double totalDistanceKm = 0;
        double totalWater = 0;
        int totalSleep = 0;
        double totalActiveMinutes = 0;
        double totalAvgHR = 0;
        double totalStressLevel = 0;
        int totalWorkouts = 0;

        int weightCount = 0;
        int bodyFatCount = 0;
        int avgHRCount = 0;
        int stressLevelCount = 0;
        int sleepCount = 0;
        int distanceCount = 0;
        int waterCount = 0;
        int activeMinutesCount = 0;
        int caloriesConsumedCount = 0;
        int caloriesBurnedCount = 0;
        int caloriesNetCount = 0;

        for (UserFitnessTracker tracker : trackers) {
            if (tracker.getWeightKg() != null && tracker.getWeightKg() > 0) {
                totalWeight += tracker.getWeightKg();
                weightCount++;
            }
            if (tracker.getBodyFatPercentage() != null) {
                totalBodyFat += tracker.getBodyFatPercentage();
                bodyFatCount++;
            }
            if (tracker.getSteps() != null) {
                totalSteps += tracker.getSteps();
            }
            if (tracker.getCaloriesConsumed() != null) {
                totalCaloriesConsumed += tracker.getCaloriesConsumed();
                caloriesConsumedCount++;
            }
            if (tracker.getCaloriesBurned() != null) {
                totalCaloriesBurned += tracker.getCaloriesBurned();
                caloriesBurnedCount++;
            }
            if (tracker.getCaloriesNet() != null) {
                totalCaloriesNet += tracker.getCaloriesNet();
                caloriesNetCount++;
            }
            if (tracker.getDistanceKm() != null) {
                totalDistanceKm += tracker.getDistanceKm();
                distanceCount++;
            }
            if (tracker.getWaterIntakeLiters() != null) {
                totalWater += tracker.getWaterIntakeLiters();
                waterCount++;
            }
            if (tracker.getSleepHours() != null) {
                totalSleep += tracker.getSleepHours();
                sleepCount++;
            }
            if (tracker.getActiveMinutes() != null) {
                totalActiveMinutes += tracker.getActiveMinutes();
                activeMinutesCount++;
            }
            if (tracker.getAverageHeartRate() != null) {
                totalAvgHR += tracker.getAverageHeartRate();
                avgHRCount++;
            }
            if (tracker.getStressLevel() != null) {
                totalStressLevel += tracker.getStressLevel();
                stressLevelCount++;
            }
            if (tracker.getNumberOfWorkouts() != null) {
                totalWorkouts += tracker.getNumberOfWorkouts();
            }
        }

        // Set calculated values
        summary.setAverageWeightKg(weightCount > 0 ? totalWeight / weightCount : 0.0);
        summary.setAverageBodyFatPercentage(bodyFatCount > 0 ? totalBodyFat / bodyFatCount : 0.0);
        summary.setAverageSteps(totalSteps / trackers.size());
        summary.setAverageCaloriesConsumed(caloriesConsumedCount > 0 ? totalCaloriesConsumed / caloriesConsumedCount : 0.0);
        summary.setAverageCaloriesBurned(caloriesBurnedCount > 0 ? totalCaloriesBurned / caloriesBurnedCount : 0.0);
        summary.setAverageCaloriesNet(caloriesNetCount > 0 ? totalCaloriesNet / caloriesNetCount : 0.0);
        summary.setAverageDistanceKm(distanceCount > 0 ? totalDistanceKm / distanceCount : 0.0);
        summary.setAverageWaterIntakeLiters(waterCount > 0 ? totalWater / waterCount : 0.0);
        summary.setAverageSleepHours(sleepCount > 0 ? totalSleep / sleepCount : 0);
        summary.setAverageActiveMinutes(activeMinutesCount > 0 ? totalActiveMinutes / activeMinutesCount : 0.0);
        summary.setAverageHeartRate(avgHRCount > 0 ? (int)(totalAvgHR / avgHRCount) : 0);
        summary.setAverageStressLevel(stressLevelCount > 0 ? totalStressLevel / stressLevelCount : 0.0);
        summary.setTotalWorkoutsRecorded(totalWorkouts);

        return summary;
    }
}

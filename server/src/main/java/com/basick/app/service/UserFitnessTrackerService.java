package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.userfitnesstracker.CreateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UpdateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UserFitnessSummaryDTO;
import com.basick.app.dto.userfitnesstracker.UserFitnessTrackerDTO;
import com.basick.app.mapper.UserFitnessTrackerMapper;
import com.basick.app.model.UserFitnessTracker;
import com.basick.app.repository.UserFitnessTrackerRepository;

/**
 * Service class for UserFitnessTracker business logic
 */
@Service
public class UserFitnessTrackerService {

    private final UserFitnessTrackerRepository userFitnessTrackerRepository;
    private final UserFitnessTrackerMapper userFitnessTrackerMapper;

    public UserFitnessTrackerService(UserFitnessTrackerRepository userFitnessTrackerRepository,
                                   UserFitnessTrackerMapper userFitnessTrackerMapper) {
        this.userFitnessTrackerRepository = userFitnessTrackerRepository;
        this.userFitnessTrackerMapper = userFitnessTrackerMapper;
    }

    /**
     * Get all fitness tracker data for a user
     */
    public List<UserFitnessTrackerDTO> getFitnessTrackerByUser(String userId) {
        try {
            List<UserFitnessTracker> trackerData = userFitnessTrackerRepository.findByUserId(userId);
            return trackerData.stream()
                    .map(userFitnessTrackerMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving fitness tracker data for user: " + userId, e);
        }
    }

    /**
     * Get fitness tracker data by ID
     */
    public UserFitnessTrackerDTO getFitnessTrackerById(String id) {
        try {
            UserFitnessTracker trackerData = userFitnessTrackerRepository.findById(id);
            return trackerData != null ? userFitnessTrackerMapper.toDTO(trackerData) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving fitness tracker data with ID: " + id, e);
        }
    }

    /**
     * Create new fitness tracker entry
     */
    public UserFitnessTrackerDTO createFitnessTracker(CreateUserFitnessTrackerRequest request) {
        try {
            UserFitnessTracker trackerData = userFitnessTrackerMapper.toEntity(request);
            UserFitnessTracker savedTrackerData = userFitnessTrackerRepository.save(trackerData);
            return userFitnessTrackerMapper.toDTO(savedTrackerData);
        } catch (Exception e) {
            throw new RuntimeException("Error creating fitness tracker entry", e);
        }
    }

    /**
     * Update fitness tracker entry
     */
    public UserFitnessTrackerDTO updateFitnessTracker(String id, UpdateUserFitnessTrackerRequest request) {
        try {
            UserFitnessTracker existingTrackerData = userFitnessTrackerRepository.findById(id);
            if (existingTrackerData == null) {
                return null;
            }
            
            userFitnessTrackerMapper.updateEntity(existingTrackerData, request);
            UserFitnessTracker updatedTrackerData = userFitnessTrackerRepository.update(existingTrackerData);
            return userFitnessTrackerMapper.toDTO(updatedTrackerData);
        } catch (Exception e) {
            throw new RuntimeException("Error updating fitness tracker entry with ID: " + id, e);
        }
    }

    /**
     * Delete fitness tracker entry
     */
    public boolean deleteFitnessTracker(String id) {
        try {
            return userFitnessTrackerRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting fitness tracker entry with ID: " + id, e);
        }
    }

    /**
     * Get fitness tracker data within a date range for a user
     */
    public List<UserFitnessTrackerDTO> getFitnessTrackerByDateRange(String userId, String startDate, String endDate) {
        try {
            List<UserFitnessTracker> trackerData = userFitnessTrackerRepository.findByUserIdAndDateRange(userId, startDate, endDate);
            return trackerData.stream()
                    .map(userFitnessTrackerMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving fitness tracker data for user: " + userId + " in date range: " + startDate + " to " + endDate, e);
        }
    }

    /**
     * Get latest fitness tracker entry for a user
     */
    public UserFitnessTrackerDTO getLatestFitnessTracker(String userId) {
        try {
            List<UserFitnessTracker> trackers = userFitnessTrackerRepository.findRecentByUserId(userId, 1);
            UserFitnessTracker latestTracker = trackers.isEmpty() ? null : trackers.get(0);
            return latestTracker != null ? userFitnessTrackerMapper.toDTO(latestTracker) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving latest fitness tracker data for user: " + userId, e);
        }
    }

    /**
     * Get fitness summary for a user
     */
    public UserFitnessSummaryDTO getUserFitnessSummary(String userId) {
        try {
            List<UserFitnessTracker> allTrackerData = userFitnessTrackerRepository.findByUserId(userId);
            return userFitnessTrackerMapper.toSummaryDTO(userId, allTrackerData);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating fitness summary for user: " + userId, e);
        }
    }

    /**
     * Update daily calories consumed
     */
    public UserFitnessTrackerDTO updateCaloriesConsumed(String id, Double caloriesConsumed) {
        try {
            UserFitnessTracker trackerData = userFitnessTrackerRepository.findById(id);
            if (trackerData == null) {
                return null;
            }
            
            trackerData.setCaloriesConsumed(caloriesConsumed);
            trackerData.updateTimestamp();
            UserFitnessTracker updatedTrackerData = userFitnessTrackerRepository.update(trackerData);
            return userFitnessTrackerMapper.toDTO(updatedTrackerData);
        } catch (Exception e) {
            throw new RuntimeException("Error updating calories consumed for fitness tracker entry with ID: " + id, e);
        }
    }

    /**
     * Add workout calories to daily total
     */
    public UserFitnessTrackerDTO addWorkoutCalories(String id, Double calories) {
        try {
            UserFitnessTracker trackerData = userFitnessTrackerRepository.findById(id);
            if (trackerData == null) {
                return null;
            }
            
            trackerData.addCaloriesBurned(calories);
            UserFitnessTracker updatedTrackerData = userFitnessTrackerRepository.update(trackerData);
            return userFitnessTrackerMapper.toDTO(updatedTrackerData);
        } catch (Exception e) {
            throw new RuntimeException("Error adding workout calories for fitness tracker entry with ID: " + id, e);
        }
    }

    /**
     * Get fitness tracker by user and date
     */
    public UserFitnessTrackerDTO getFitnessTrackerByUserAndDate(String userId, String date) {
        try {
            UserFitnessTracker trackerData = userFitnessTrackerRepository.findByUserIdAndDate(userId, date);
            return trackerData != null ? userFitnessTrackerMapper.toDTO(trackerData) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving fitness tracker data for user: " + userId + " on date: " + date, e);
        }
    }

    /**
     * Create or update daily fitness tracker entry
     */
    public UserFitnessTrackerDTO createOrUpdateDailyTracker(String userId, String date, UpdateUserFitnessTrackerRequest request) {
        try {
            UserFitnessTracker existingTracker = userFitnessTrackerRepository.findByUserIdAndDate(userId, date);
            
            if (existingTracker != null) {
                // Update existing entry
                userFitnessTrackerMapper.updateEntity(existingTracker, request);
                UserFitnessTracker updatedTracker = userFitnessTrackerRepository.update(existingTracker);
                return userFitnessTrackerMapper.toDTO(updatedTracker);
            } else {
                // Create new entry with default values from request
                CreateUserFitnessTrackerRequest createRequest = new CreateUserFitnessTrackerRequest();
                createRequest.setUserId(userId);
                createRequest.setTrackingDate(parseToTimestamp(date));
                createRequest.setNumberOfWorkouts(request.getNumberOfWorkouts());
                createRequest.setCaloriesConsumed(request.getCaloriesConsumed());
                createRequest.setCaloriesBurned(request.getCaloriesBurned());
                createRequest.setSteps(request.getSteps());
                createRequest.setDistanceKm(request.getDistanceKm());
                createRequest.setActiveMinutes(request.getActiveMinutes());
                createRequest.setAverageHeartRate(request.getAverageHeartRate());
                createRequest.setRestingHeartRate(request.getRestingHeartRate());
                createRequest.setWeightKg(request.getWeightKg());
                createRequest.setBodyFatPercentage(request.getBodyFatPercentage());
                createRequest.setWaterIntakeLiters(request.getWaterIntakeLiters());
                createRequest.setSleepHours(request.getSleepHours());
                createRequest.setStressLevel(request.getStressLevel());
                createRequest.setMood(request.getMood());
                createRequest.setNotes(request.getNotes());
                
                return createFitnessTracker(createRequest);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error creating or updating daily fitness tracker for user: " + userId + " on date: " + date, e);
        }
    }

    /**
     * Parse string date to Timestamp
     */
    private com.google.cloud.Timestamp parseToTimestamp(String dateString) {
        try {
            if (dateString.contains("T")) {
                return com.google.cloud.Timestamp.parseTimestamp(dateString);
            } else {
                return com.google.cloud.Timestamp.parseTimestamp(dateString + "T00:00:00Z");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing date string: " + dateString, e);
        }
    }
}

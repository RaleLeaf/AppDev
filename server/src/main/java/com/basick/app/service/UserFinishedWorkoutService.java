package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.userfinishedworkout.CreateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UpdateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UserFinishedWorkoutDTO;
import com.basick.app.dto.userfinishedworkout.UserWorkoutStatsDTO;
import com.basick.app.mapper.UserFinishedWorkoutMapper;
import com.basick.app.model.UserFinishedWorkout;
import com.basick.app.repository.UserFinishedWorkoutRepository;

/**
 * Service class for UserFinishedWorkout business logic
 */
@Service
public class UserFinishedWorkoutService {

    private final UserFinishedWorkoutRepository userFinishedWorkoutRepository;
    private final UserFinishedWorkoutMapper userFinishedWorkoutMapper;

    public UserFinishedWorkoutService(UserFinishedWorkoutRepository userFinishedWorkoutRepository, 
                                    UserFinishedWorkoutMapper userFinishedWorkoutMapper) {
        this.userFinishedWorkoutRepository = userFinishedWorkoutRepository;
        this.userFinishedWorkoutMapper = userFinishedWorkoutMapper;
    }

    /**
     * Get all finished workouts for a user
     */
    public List<UserFinishedWorkoutDTO> getFinishedWorkoutsByUser(String userId) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findByUserId(userId);
            return finishedWorkouts.stream()
                    .map(userFinishedWorkoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving finished workouts for user: " + userId, e);
        }
    }

    /**
     * Get finished workout by ID
     */
    public UserFinishedWorkoutDTO getFinishedWorkoutById(String id) {
        try {
            UserFinishedWorkout finishedWorkout = userFinishedWorkoutRepository.findById(id);
            return finishedWorkout != null ? userFinishedWorkoutMapper.toDTO(finishedWorkout) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving finished workout with ID: " + id, e);
        }
    }

    /**
     * Record a new finished workout
     */
    public UserFinishedWorkoutDTO recordFinishedWorkout(CreateUserFinishedWorkoutRequest request) {
        try {
            UserFinishedWorkout finishedWorkout = userFinishedWorkoutMapper.toEntity(request);
            UserFinishedWorkout savedFinishedWorkout = userFinishedWorkoutRepository.save(finishedWorkout);
            return userFinishedWorkoutMapper.toDTO(savedFinishedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error recording finished workout", e);
        }
    }

    /**
     * Update a finished workout record
     */
    public UserFinishedWorkoutDTO updateFinishedWorkout(String id, UpdateUserFinishedWorkoutRequest request) {
        try {
            UserFinishedWorkout existingFinishedWorkout = userFinishedWorkoutRepository.findById(id);
            if (existingFinishedWorkout == null) {
                return null;
            }
            
            userFinishedWorkoutMapper.updateEntity(existingFinishedWorkout, request);
            UserFinishedWorkout updatedFinishedWorkout = userFinishedWorkoutRepository.update(existingFinishedWorkout);
            return userFinishedWorkoutMapper.toDTO(updatedFinishedWorkout);
        } catch (Exception e) {
            throw new RuntimeException("Error updating finished workout with ID: " + id, e);
        }
    }

    /**
     * Delete a finished workout record
     */
    public boolean deleteFinishedWorkout(String id) {
        try {
            return userFinishedWorkoutRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting finished workout with ID: " + id, e);
        }
    }

    /**
     * Get finished workouts by workout ID
     */
    public List<UserFinishedWorkoutDTO> getFinishedWorkoutsByWorkoutId(String workoutId) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findByWorkoutId(workoutId);
            return finishedWorkouts.stream()
                    .map(userFinishedWorkoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving finished workouts for workout ID: " + workoutId, e);
        }
    }

    /**
     * Get finished workouts within a date range for a user
     */
    public List<UserFinishedWorkoutDTO> getFinishedWorkoutsByDateRange(String userId, String startDate, String endDate) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findByUserIdAndDateRange(userId, startDate, endDate);
            return finishedWorkouts.stream()
                    .map(userFinishedWorkoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving finished workouts for user: " + userId + " in date range: " + startDate + " to " + endDate, e);
        }
    }

    /**
     * Get workout statistics for a user
     */
    public UserWorkoutStatsDTO getUserWorkoutStatistics(String userId) {
        try {
            List<UserFinishedWorkout> allFinishedWorkouts = userFinishedWorkoutRepository.findByUserId(userId);
            return calculateWorkoutStats(userId, allFinishedWorkouts);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating workout statistics for user: " + userId, e);
        }
    }

    /**
     * Get recent finished workouts for a user
     */
    public List<UserFinishedWorkoutDTO> getRecentFinishedWorkouts(String userId, int limit) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findRecentByUserId(userId, limit);
            return finishedWorkouts.stream()
                    .map(userFinishedWorkoutMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent finished workouts for user: " + userId, e);
        }
    }

    /**
     * Get total calories burned by user
     */
    public Double getTotalCaloriesBurnedByUser(String userId) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findByUserId(userId);
            return finishedWorkouts.stream()
                    .mapToDouble(workout -> workout.getCaloriesBurned() != null ? workout.getCaloriesBurned() : 0.0)
                    .sum();
        } catch (Exception e) {
            throw new RuntimeException("Error calculating total calories burned for user: " + userId, e);
        }
    }

    /**
     * Get total workout time by user
     */
    public Integer getTotalWorkoutTimeByUser(String userId) {
        try {
            List<UserFinishedWorkout> finishedWorkouts = userFinishedWorkoutRepository.findByUserId(userId);
            return finishedWorkouts.stream()
                    .mapToInt(workout -> workout.getDurationMinutes() != null ? workout.getDurationMinutes() : 0)
                    .sum();
        } catch (Exception e) {
            throw new RuntimeException("Error calculating total workout time for user: " + userId, e);
        }
    }

    /**
     * Calculate workout statistics for a user
     */
    private UserWorkoutStatsDTO calculateWorkoutStats(String userId, List<UserFinishedWorkout> workouts) {
        UserWorkoutStatsDTO stats = new UserWorkoutStatsDTO();
        stats.setUserId(userId);
        stats.setTotalWorkouts(workouts.size());

        if (workouts.isEmpty()) {
            return stats;
        }

        double totalCalories = workouts.stream()
                .mapToDouble(w -> w.getCaloriesBurned() != null ? w.getCaloriesBurned() : 0.0)
                .sum();
        
        int totalMinutes = workouts.stream()
                .mapToInt(w -> w.getDurationMinutes() != null ? w.getDurationMinutes() : 0)
                .sum();

        double avgRating = workouts.stream()
                .filter(w -> w.getUserRating() != null)
                .mapToDouble(w -> w.getUserRating())
                .average()
                .orElse(0.0);

        stats.setTotalCaloriesBurned(totalCalories);
        stats.setTotalMinutesExercised(totalMinutes);
        stats.setAverageWorkoutDuration((double) totalMinutes / workouts.size());
        stats.setAverageCaloriesPerWorkout(totalCalories / workouts.size());
        stats.setAverageUserRating(avgRating);

        return stats;
    }
}
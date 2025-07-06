package com.basick.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.basick.app.dto.userfinishedworkout.CreateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UpdateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UserFinishedWorkoutDTO;
import com.basick.app.model.UserFinishedWorkout;

/**
 * Mapper class for UserFinishedWorkout entity and DTOs
 */
@Component
public class UserFinishedWorkoutMapper {

    /**
     * Convert UserFinishedWorkout entity to DTO
     */
    public UserFinishedWorkoutDTO toDTO(UserFinishedWorkout userFinishedWorkout) {
        if (userFinishedWorkout == null) {
            return null;
        }

        UserFinishedWorkoutDTO dto = new UserFinishedWorkoutDTO();
        dto.setId(userFinishedWorkout.getId());
        dto.setUserId(userFinishedWorkout.getUserId());
        dto.setWorkoutId(userFinishedWorkout.getWorkoutId());
        dto.setWorkoutName(userFinishedWorkout.getWorkoutName());
        dto.setWorkoutDescription(userFinishedWorkout.getWorkoutDescription());
        dto.setDurationMinutes(userFinishedWorkout.getDurationMinutes());
        dto.setCaloriesBurned(userFinishedWorkout.getCaloriesBurned());
        dto.setAverageHeartRate(userFinishedWorkout.getAverageHeartRate());
        dto.setDifficulty(userFinishedWorkout.getDifficulty());
        dto.setUserRating(userFinishedWorkout.getUserRating());
        dto.setNotes(userFinishedWorkout.getNotes());
        dto.setCompletedAt(userFinishedWorkout.getCompletedAt());
        dto.setCreatedAt(userFinishedWorkout.getCreatedAt());
        dto.setUpdatedAt(userFinishedWorkout.getUpdatedAt());

        return dto;
    }

    /**
     * Convert UserFinishedWorkout entity list to DTO list
     */
    public List<UserFinishedWorkoutDTO> toDTOList(List<UserFinishedWorkout> userFinishedWorkouts) {
        if (userFinishedWorkouts == null) {
            return null;
        }

        return userFinishedWorkouts.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert CreateUserFinishedWorkoutRequest to UserFinishedWorkout entity
     */
    public UserFinishedWorkout toEntity(CreateUserFinishedWorkoutRequest request) {
        if (request == null) {
            return null;
        }

        UserFinishedWorkout userFinishedWorkout = new UserFinishedWorkout();
        userFinishedWorkout.setUserId(request.getUserId());
        userFinishedWorkout.setWorkoutId(request.getWorkoutId());
        userFinishedWorkout.setWorkoutName(request.getWorkoutName());
        userFinishedWorkout.setWorkoutDescription(request.getWorkoutDescription());
        userFinishedWorkout.setDurationMinutes(request.getDurationMinutes());
        userFinishedWorkout.setCaloriesBurned(request.getCaloriesBurned());
        userFinishedWorkout.setAverageHeartRate(request.getAverageHeartRate());
        userFinishedWorkout.setDifficulty(request.getDifficulty());
        userFinishedWorkout.setUserRating(request.getUserRating());
        userFinishedWorkout.setNotes(request.getNotes());
        userFinishedWorkout.setCompletedAt(request.getCompletedAt());

        return userFinishedWorkout;
    }

    /**
     * Update UserFinishedWorkout entity with UpdateUserFinishedWorkoutRequest data
     */
    public void updateEntity(UserFinishedWorkout userFinishedWorkout, UpdateUserFinishedWorkoutRequest request) {
        if (userFinishedWorkout == null || request == null) {
            return;
        }

        if (request.getCaloriesBurned() != null) {
            userFinishedWorkout.setCaloriesBurned(request.getCaloriesBurned());
        }
        
        if (request.getDurationMinutes() != null) {
            userFinishedWorkout.setDurationMinutes(request.getDurationMinutes());
        }
        
        if (request.getAverageHeartRate() != null) {
            userFinishedWorkout.setAverageHeartRate(request.getAverageHeartRate());
        }
        
        if (request.getDifficulty() != null) {
            userFinishedWorkout.setDifficulty(request.getDifficulty());
        }
        
        if (request.getUserRating() != null) {
            userFinishedWorkout.setUserRating(request.getUserRating());
        }
        
        if (request.getNotes() != null) {
            userFinishedWorkout.setNotes(request.getNotes());
        }
    }

}

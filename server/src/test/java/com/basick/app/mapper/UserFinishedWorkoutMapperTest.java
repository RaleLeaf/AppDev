package com.basick.app.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.basick.app.dto.userfinishedworkout.CreateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UpdateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UserFinishedWorkoutDTO;
import com.basick.app.model.UserFinishedWorkout;
import com.google.cloud.Timestamp;

class UserFinishedWorkoutMapperTest {

    private UserFinishedWorkoutMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new UserFinishedWorkoutMapper();
    }

    @Test
    void testToDTO() {
        // Given
        UserFinishedWorkout entity = new UserFinishedWorkout();
        entity.setId("1");
        entity.setUserId("user1");
        entity.setWorkoutId("workout1");
        entity.setWorkoutName("Test Workout");
        entity.setDurationMinutes(30);
        entity.setCaloriesBurned(200.0);
        entity.setUserRating(4.5);
        entity.setNotes("Great workout!");

        // When
        UserFinishedWorkoutDTO dto = mapper.toDTO(entity);

        // Then
        assertNotNull(dto);
        assertEquals("1", dto.getId());
        assertEquals("user1", dto.getUserId());
        assertEquals("workout1", dto.getWorkoutId());
        assertEquals("Test Workout", dto.getWorkoutName());
        assertEquals(30, dto.getDurationMinutes());
        assertEquals(200.0, dto.getCaloriesBurned());
        assertEquals(4.5, dto.getUserRating());
        assertEquals("Great workout!", dto.getNotes());
    }

    @Test
    void testToDTOWithNull() {
        // When
        UserFinishedWorkoutDTO dto = mapper.toDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void testToEntity() {
        // Given
        CreateUserFinishedWorkoutRequest request = new CreateUserFinishedWorkoutRequest();
        request.setUserId("user1");
        request.setWorkoutId("workout1");
        request.setWorkoutName("Test Workout");
        request.setDurationMinutes(30);
        request.setCaloriesBurned(200.0);
        request.setUserRating(4.5);
        request.setNotes("Great workout!");
        request.setCompletedAt(Timestamp.now());

        // When
        UserFinishedWorkout entity = mapper.toEntity(request);

        // Then
        assertNotNull(entity);
        assertEquals("user1", entity.getUserId());
        assertEquals("workout1", entity.getWorkoutId());
        assertEquals("Test Workout", entity.getWorkoutName());
        assertEquals(30, entity.getDurationMinutes());
        assertEquals(200.0, entity.getCaloriesBurned());
        assertEquals(4.5, entity.getUserRating());
        assertEquals("Great workout!", entity.getNotes());
    }

    @Test
    void testToEntityWithNull() {
        // When
        UserFinishedWorkout entity = mapper.toEntity(null);

        // Then
        assertNull(entity);
    }

    @Test
    void testUpdateEntity() {
        // Given
        UserFinishedWorkout entity = new UserFinishedWorkout();
        entity.setId("1");
        entity.setUserId("user1");
        entity.setWorkoutId("workout1");
        entity.setWorkoutName("Original Workout");
        entity.setDurationMinutes(20);
        entity.setCaloriesBurned(150.0);
        entity.setUserRating(3.0);

        UpdateUserFinishedWorkoutRequest request = new UpdateUserFinishedWorkoutRequest();
        request.setDurationMinutes(40);
        request.setCaloriesBurned(300.0);
        request.setUserRating(5.0);
        request.setNotes("Updated notes");

        // When
        mapper.updateEntity(entity, request);

        // Then
        assertEquals(40, entity.getDurationMinutes());
        assertEquals(300.0, entity.getCaloriesBurned());
        assertEquals(5.0, entity.getUserRating());
        assertEquals("Updated notes", entity.getNotes());
        
        // Should not change these fields
        assertEquals("1", entity.getId());
        assertEquals("user1", entity.getUserId());
        assertEquals("workout1", entity.getWorkoutId());
    }

    @Test
    void testUpdateEntityWithNulls() {
        // Given
        UserFinishedWorkout entity = new UserFinishedWorkout();
        entity.setDurationMinutes(20);
        entity.setCaloriesBurned(150.0);

        // When
        mapper.updateEntity(entity, null);
        mapper.updateEntity(null, new UpdateUserFinishedWorkoutRequest());

        // Then - should not crash and entity should remain unchanged
        assertEquals(20, entity.getDurationMinutes());
        assertEquals(150.0, entity.getCaloriesBurned());
    }
}

package com.basick.app.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.basick.app.dto.userfitnesstracker.CreateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UpdateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UserFitnessTrackerDTO;
import com.basick.app.dto.userfitnesstracker.UserFitnessSummaryDTO;
import com.basick.app.model.UserFitnessTracker;
import com.google.cloud.Timestamp;

class UserFitnessTrackerMapperTest {

    private UserFitnessTrackerMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new UserFitnessTrackerMapper();
    }

    @Test
    void testToDTO() {
        // Given
        UserFitnessTracker entity = new UserFitnessTracker();
        entity.setId("1");
        entity.setUserId("user1");
        entity.setTrackingDate(Timestamp.now());
        entity.setNumberOfWorkouts(2);
        entity.setCaloriesConsumed(2000.0);
        entity.setCaloriesBurned(500.0);
        entity.setSteps(10000);
        entity.setWeightKg(70.5);
        entity.setBodyFatPercentage(15.0);
        entity.setSleepHours(8);

        // When
        UserFitnessTrackerDTO dto = mapper.toDTO(entity);

        // Then
        assertNotNull(dto);
        assertEquals("1", dto.getId());
        assertEquals("user1", dto.getUserId());
        assertEquals(2, dto.getNumberOfWorkouts());
        assertEquals(2000.0, dto.getCaloriesConsumed());
        assertEquals(500.0, dto.getCaloriesBurned());
        assertEquals(10000, dto.getSteps());
        assertEquals(70.5, dto.getWeightKg());
        assertEquals(15.0, dto.getBodyFatPercentage());
        assertEquals(8, dto.getSleepHours());
    }

    @Test
    void testToDTOWithNull() {
        // When
        UserFitnessTrackerDTO dto = mapper.toDTO(null);

        // Then
        assertNull(dto);
    }

    @Test
    void testToEntity() {
        // Given
        CreateUserFitnessTrackerRequest request = new CreateUserFitnessTrackerRequest();
        request.setUserId("user1");
        request.setTrackingDate(Timestamp.now());
        request.setNumberOfWorkouts(3);
        request.setCaloriesConsumed(2200.0);
        request.setCaloriesBurned(600.0);
        request.setSteps(12000);
        request.setWeightKg(72.0);
        request.setBodyFatPercentage(14.5);
        request.setSleepHours(7);

        // When
        UserFitnessTracker entity = mapper.toEntity(request);

        // Then
        assertNotNull(entity);
        assertEquals("user1", entity.getUserId());
        assertEquals(3, entity.getNumberOfWorkouts());
        assertEquals(2200.0, entity.getCaloriesConsumed());
        assertEquals(600.0, entity.getCaloriesBurned());
        assertEquals(12000, entity.getSteps());
        assertEquals(72.0, entity.getWeightKg());
        assertEquals(14.5, entity.getBodyFatPercentage());
        assertEquals(7, entity.getSleepHours());
    }

    @Test
    void testToEntityWithNull() {
        // When
        UserFitnessTracker entity = mapper.toEntity(null);

        // Then
        assertNull(entity);
    }

    @Test
    void testUpdateEntity() {
        // Given
        UserFitnessTracker entity = new UserFitnessTracker();
        entity.setId("1");
        entity.setUserId("user1");
        entity.setCaloriesConsumed(2000.0);
        entity.setSteps(8000);
        entity.setWeightKg(70.0);

        UpdateUserFitnessTrackerRequest request = new UpdateUserFitnessTrackerRequest();
        request.setCaloriesConsumed(2500.0);
        request.setSteps(15000);
        request.setBodyFatPercentage(16.0);

        // When
        mapper.updateEntity(entity, request);

        // Then
        assertEquals(2500.0, entity.getCaloriesConsumed());
        assertEquals(15000, entity.getSteps());
        assertEquals(16.0, entity.getBodyFatPercentage());
        assertEquals(70.0, entity.getWeightKg()); // Should remain unchanged
        
        // Should not change these fields
        assertEquals("1", entity.getId());
        assertEquals("user1", entity.getUserId());
    }

    @Test
    void testToSummaryDTO() {
        // Given
        UserFitnessTracker tracker1 = new UserFitnessTracker();
        tracker1.setWeightKg(70.0);
        tracker1.setCaloriesConsumed(2000.0);
        tracker1.setCaloriesBurned(500.0);
        tracker1.setSteps(10000);
        tracker1.setBodyFatPercentage(15.0);
        tracker1.setSleepHours(8);
        tracker1.setNumberOfWorkouts(2);

        UserFitnessTracker tracker2 = new UserFitnessTracker();
        tracker2.setWeightKg(69.5);
        tracker2.setCaloriesConsumed(2200.0);
        tracker2.setCaloriesBurned(600.0);
        tracker2.setSteps(12000);
        tracker2.setBodyFatPercentage(14.5);
        tracker2.setSleepHours(7);
        tracker2.setNumberOfWorkouts(3);

        List<UserFitnessTracker> trackers = Arrays.asList(tracker1, tracker2);

        // When
        UserFitnessSummaryDTO summary = mapper.toSummaryDTO("user1", trackers);

        // Then
        assertNotNull(summary);
        assertEquals("user1", summary.getUserId());
        assertEquals(2, summary.getDaysTracked());
        assertEquals(69.75, summary.getAverageWeightKg()); // (70.0 + 69.5) / 2
        assertEquals(11000, summary.getAverageSteps()); // (10000 + 12000) / 2
        assertEquals(2100.0, summary.getAverageCaloriesConsumed()); // (2000 + 2200) / 2
        assertEquals(550.0, summary.getAverageCaloriesBurned()); // (500 + 600) / 2
        assertEquals(7, summary.getAverageSleepHours()); // (8 + 7) / 2
        assertEquals(5, summary.getTotalWorkoutsRecorded()); // 2 + 3
    }

    @Test
    void testToSummaryDTOWithEmptyList() {
        // When
        UserFitnessSummaryDTO summary = mapper.toSummaryDTO("user1", Arrays.asList());

        // Then
        assertNotNull(summary);
        assertEquals(0, summary.getDaysTracked());
    }

    @Test
    void testToSummaryDTOWithNull() {
        // When
        UserFitnessSummaryDTO summary = mapper.toSummaryDTO("user1", null);

        // Then
        assertNotNull(summary);
        assertEquals(0, summary.getDaysTracked());
    }
}

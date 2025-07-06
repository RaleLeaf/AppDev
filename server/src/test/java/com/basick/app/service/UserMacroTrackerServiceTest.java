package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.usermacrotracker.AddMealEntryRequest;
import com.basick.app.dto.usermacrotracker.AddWaterRequest;
import com.basick.app.dto.usermacrotracker.CreateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UpdateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UserMacroSummaryDTO;
import com.basick.app.dto.usermacrotracker.UserMacroTrackerDTO;
import com.basick.app.mapper.UserMacroTrackerMapper;
import com.basick.app.model.UserMacroTracker;
import com.basick.app.repository.UserMacroTrackerRepository;

@ExtendWith(MockitoExtension.class)
class UserMacroTrackerServiceTest {

    @Mock
    private UserMacroTrackerRepository repository;

    @Mock
    private UserMacroTrackerMapper mapper;

    @InjectMocks
    private UserMacroTrackerService service;

    private UserMacroTracker sampleTracker;
    private UserMacroTrackerDTO sampleTrackerDTO;
    private CreateUserMacroTrackerRequest createRequest;
    private UpdateUserMacroTrackerRequest updateRequest;

    @BeforeEach
    void setUp() {
        sampleTracker = new UserMacroTracker();
        sampleTracker.setId("tracker-1");
        sampleTracker.setUserId("user-1");
        sampleTracker.setDailyCalorieGoal(2000.0);
        sampleTracker.setDailyProteinGoal(150.0);
        sampleTracker.setCaloriesConsumed(1500.0);
        sampleTracker.setProteinConsumed(100.0);
        sampleTracker.setWaterGoal(2000.0);
        sampleTracker.setWaterConsumed(1000.0);
        sampleTracker.setMeals(new ArrayList<>());

        sampleTrackerDTO = new UserMacroTrackerDTO();
        sampleTrackerDTO.setId("tracker-1");
        sampleTrackerDTO.setUserId("user-1");
        sampleTrackerDTO.setDate("2023-12-01");
        sampleTrackerDTO.setDailyCalorieGoal(2000.0);
        sampleTrackerDTO.setDailyProteinGoal(150.0);
        sampleTrackerDTO.setCaloriesConsumed(1500.0);
        sampleTrackerDTO.setProteinConsumed(100.0);

        createRequest = new CreateUserMacroTrackerRequest();
        createRequest.setUserId("user-1");
        createRequest.setDate("2023-12-01");
        createRequest.setDailyCalorieGoal(2000.0);
        createRequest.setDailyProteinGoal(150.0);

        updateRequest = new UpdateUserMacroTrackerRequest();
        updateRequest.setDailyCalorieGoal(2200.0);
    }

    @Test
    void createUserMacroTracker_ShouldReturnTrackerDTO() {
        // Arrange
        when(mapper.toEntity(createRequest)).thenReturn(sampleTracker);
        when(repository.save(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        UserMacroTrackerDTO result = service.createUserMacroTracker(createRequest);

        // Assert
        assertNotNull(result);
        assertEquals(sampleTrackerDTO.getId(), result.getId());
        assertEquals(sampleTrackerDTO.getUserId(), result.getUserId());
        verify(repository).save(sampleTracker);
        verify(mapper).toEntity(createRequest);
        verify(mapper).toDTO(sampleTracker);
    }

    @Test
    void getUserMacroTrackerById_WhenExists_ShouldReturnTrackerDTO() {
        // Arrange
        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.getUserMacroTrackerById("tracker-1");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(sampleTrackerDTO.getId(), result.get().getId());
        verify(repository).findById("tracker-1");
    }

    @Test
    void getUserMacroTrackerById_WhenNotExists_ShouldReturnEmpty() {
        // Arrange
        when(repository.findById("non-existing")).thenReturn(null);

        // Act
        Optional<UserMacroTrackerDTO> result = service.getUserMacroTrackerById("non-existing");

        // Assert
        assertFalse(result.isPresent());
        verify(repository).findById("non-existing");
    }

    @Test
    void getUserMacroTrackerByUserIdAndDate_ShouldReturnTrackerDTO() {
        // Arrange
        LocalDate date = LocalDate.of(2023, 12, 1);
        when(repository.findByUserIdAndDate("user-1", "2023-12-01")).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.getUserMacroTrackerByUserIdAndDate("user-1", date);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(sampleTrackerDTO.getUserId(), result.get().getUserId());
        verify(repository).findByUserIdAndDate("user-1", "2023-12-01");
    }

    @Test
    void getUserMacroTrackersByUserId_ShouldReturnList() {
        // Arrange
        List<UserMacroTracker> trackers = Arrays.asList(sampleTracker);
        when(repository.findByUserId("user-1", 50)).thenReturn(trackers);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        List<UserMacroTrackerDTO> result = service.getUserMacroTrackersByUserId("user-1");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleTrackerDTO.getUserId(), result.get(0).getUserId());
        verify(repository).findByUserId("user-1", 50);
    }

    @Test
    void updateUserMacroTracker_WhenExists_ShouldReturnUpdatedDTO() {
        // Arrange
        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        doNothing().when(mapper).updateEntityFromRequest(sampleTracker, updateRequest);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.updateUserMacroTracker("tracker-1", updateRequest);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(sampleTrackerDTO.getId(), result.get().getId());
        verify(repository).findById("tracker-1");
        verify(mapper).updateEntityFromRequest(sampleTracker, updateRequest);
        verify(repository).update(sampleTracker);
    }

    @Test
    void deleteUserMacroTracker_WhenExists_ShouldReturnTrue() {
        // Arrange
        when(repository.delete("tracker-1")).thenReturn(true);

        // Act
        boolean result = service.deleteUserMacroTracker("tracker-1");

        // Assert
        assertTrue(result);
        verify(repository).delete("tracker-1");
    }

    @Test
    void addMealEntry_WhenTrackerExists_ShouldReturnUpdatedDTO() {
        // Arrange
        AddMealEntryRequest mealRequest = new AddMealEntryRequest();
        mealRequest.setFoodId("food-1");
        mealRequest.setQuantity(100.0);
        mealRequest.setMealType("breakfast");

        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.addMealEntry("tracker-1", mealRequest);

        // Assert
        assertTrue(result.isPresent());
        verify(repository).findById("tracker-1");
        verify(repository).update(sampleTracker);
    }

    @Test
    void addWaterIntake_WhenTrackerExists_ShouldReturnUpdatedDTO() {
        // Arrange
        AddWaterRequest waterRequest = new AddWaterRequest();
        waterRequest.setWaterAmount(250.0);

        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.addWaterIntake("tracker-1", waterRequest);

        // Assert
        assertTrue(result.isPresent());
        verify(repository).findById("tracker-1");
        verify(repository).update(sampleTracker);
    }

    @Test
    void getMacroSummary_WhenTrackerExists_ShouldReturnSummaryDTO() {
        // Arrange
        UserMacroSummaryDTO summaryDTO = new UserMacroSummaryDTO();
        summaryDTO.setUserId("user-1");
        
        LocalDate date = LocalDate.of(2023, 12, 1);
        when(repository.findByUserIdAndDate("user-1", "2023-12-01")).thenReturn(sampleTracker);
        when(mapper.toSummaryDTO(sampleTracker)).thenReturn(summaryDTO);

        // Act
        Optional<UserMacroSummaryDTO> result = service.getMacroSummary("user-1", date);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("user-1", result.get().getUserId());
        verify(repository).findByUserIdAndDate("user-1", "2023-12-01");
        verify(mapper).toSummaryDTO(sampleTracker);
    }

    @Test
    void setDailyGoals_WhenTrackerExists_ShouldReturnUpdatedDTO() {
        // Arrange
        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.setDailyGoals("tracker-1", 2200.0, 160.0, 250.0, 70.0, 2500.0);

        // Assert
        assertTrue(result.isPresent());
        verify(repository).findById("tracker-1");
        verify(repository).update(sampleTracker);
    }

    @Test
    void clearMealsForDate_WhenTrackerExists_ShouldReturnUpdatedDTO() {
        // Arrange
        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.clearMealsForDate("tracker-1");

        // Assert
        assertTrue(result.isPresent());
        verify(repository).findById("tracker-1");
        verify(repository).update(sampleTracker);
    }

    @Test
    void resetWaterIntake_WhenTrackerExists_ShouldReturnUpdatedDTO() {
        // Arrange
        when(repository.findById("tracker-1")).thenReturn(sampleTracker);
        when(repository.update(sampleTracker)).thenReturn(sampleTracker);
        when(mapper.toDTO(sampleTracker)).thenReturn(sampleTrackerDTO);

        // Act
        Optional<UserMacroTrackerDTO> result = service.resetWaterIntake("tracker-1");

        // Assert
        assertTrue(result.isPresent());
        verify(repository).findById("tracker-1");
        verify(repository).update(sampleTracker);
        // Verify water consumed was reset to 0
        assertEquals(0.0, sampleTracker.getWaterConsumed());
    }
}

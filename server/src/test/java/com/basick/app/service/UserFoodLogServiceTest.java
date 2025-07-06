package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.userfoodlog.CreateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UpdateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UserFoodLogDTO;
import com.basick.app.mapper.UserFoodLogMapper;
import com.basick.app.model.UserFoodLog;
import com.basick.app.repository.FoodRepository;
import com.basick.app.repository.UserFoodLogRepository;
import com.basick.app.service.FoodService;

@ExtendWith(MockitoExtension.class)
class UserFoodLogServiceTest {

    @Mock
    private UserFoodLogRepository repository;

    @Mock
    private UserFoodLogMapper mapper;

    @Mock
    private FoodRepository foodRepository;

    @Mock
    private FoodService foodService;

    @InjectMocks
    private UserFoodLogService service;

    private UserFoodLog sampleFoodLog;
    private UserFoodLogDTO sampleFoodLogDTO;
    private CreateUserFoodLogRequest createRequest;
    private UpdateUserFoodLogRequest updateRequest;

    @BeforeEach
    void setUp() {
        sampleFoodLog = new UserFoodLog();
        sampleFoodLog.setId("log-1");
        sampleFoodLog.setUserId("user-1");
        sampleFoodLog.setFoodId("food-1");
        sampleFoodLog.setQuantity(150.0);
        sampleFoodLog.setUnit("grams");
        sampleFoodLog.setMealType("breakfast");
        sampleFoodLog.setCalories(200.0);

        sampleFoodLogDTO = new UserFoodLogDTO();
        sampleFoodLogDTO.setId("log-1");
        sampleFoodLogDTO.setUserId("user-1");
        sampleFoodLogDTO.setFoodId("food-1");
        sampleFoodLogDTO.setQuantity(150.0);
        sampleFoodLogDTO.setUnit("grams");
        sampleFoodLogDTO.setMealType("breakfast");
        sampleFoodLogDTO.setCalories(200.0);

        createRequest = new CreateUserFoodLogRequest();
        createRequest.setUserId("user-1");
        createRequest.setFoodId("food-1");
        createRequest.setQuantity(150.0);
        createRequest.setUnit("grams");
        createRequest.setMealType("breakfast");

        updateRequest = new UpdateUserFoodLogRequest();
        updateRequest.setQuantity(200.0);
        updateRequest.setMealType("lunch");
    }

    @Test
    void createFoodLog_ShouldReturnFoodLogDTO() {
        // Arrange
        when(mapper.toEntity(createRequest)).thenReturn(sampleFoodLog);
        when(repository.save(sampleFoodLog)).thenReturn(sampleFoodLog);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        UserFoodLogDTO result = service.createFoodLog(createRequest);

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodLogDTO.getId(), result.getId());
        assertEquals(sampleFoodLogDTO.getUserId(), result.getUserId());
        verify(repository).save(sampleFoodLog);
        verify(mapper).toEntity(createRequest);
        verify(mapper).toDTO(sampleFoodLog);
    }

    @Test
    void getFoodLogById_WhenExists_ShouldReturnFoodLogDTO() {
        // Arrange
        when(repository.findById("log-1")).thenReturn(sampleFoodLog);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        UserFoodLogDTO result = service.getFoodLogById("log-1");

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodLogDTO.getId(), result.getId());
        verify(repository).findById("log-1");
    }

    @Test
    void getFoodLogById_WhenNotExists_ShouldReturnNull() {
        // Arrange
        when(repository.findById("non-existing")).thenReturn(null);

        // Act
        UserFoodLogDTO result = service.getFoodLogById("non-existing");

        // Assert
        assertNull(result);
        verify(repository).findById("non-existing");
    }

    @Test
    void getUserFoodLogs_ShouldReturnList() {
        // Arrange
        List<UserFoodLog> logs = Arrays.asList(sampleFoodLog);
        when(repository.findByUserId("user-1", 50)).thenReturn(logs);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        List<UserFoodLogDTO> result = service.getUserFoodLogs("user-1", 50);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleFoodLogDTO.getUserId(), result.get(0).getUserId());
        verify(repository).findByUserId("user-1", 50);
    }

    @Test
    void getUserFoodLogsByDate_ShouldReturnList() {
        // Arrange
        List<UserFoodLog> logs = Arrays.asList(sampleFoodLog);
        when(repository.findByUserIdAndDate("user-1", "2023-12-01")).thenReturn(logs);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        List<UserFoodLogDTO> result = service.getUserFoodLogsByDate("user-1", "2023-12-01");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleFoodLogDTO.getUserId(), result.get(0).getUserId());
        verify(repository).findByUserIdAndDate("user-1", "2023-12-01");
    }

    @Test
    void updateFoodLog_WhenExists_ShouldReturnUpdatedDTO() {
        // Arrange
        when(repository.findById("log-1")).thenReturn(sampleFoodLog);
        doNothing().when(mapper).updateEntityFromRequest(sampleFoodLog, updateRequest);
        when(repository.update(sampleFoodLog)).thenReturn(sampleFoodLog);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        UserFoodLogDTO result = service.updateFoodLog("log-1", updateRequest);

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodLogDTO.getId(), result.getId());
        verify(repository).findById("log-1");
        verify(mapper).updateEntityFromRequest(sampleFoodLog, updateRequest);
        verify(repository).update(sampleFoodLog);
    }

    @Test
    void updateFoodLog_WhenNotExists_ShouldReturnNull() {
        // Arrange
        when(repository.findById("non-existing")).thenReturn(null);

        // Act
        UserFoodLogDTO result = service.updateFoodLog("non-existing", updateRequest);

        // Assert
        assertNull(result);
        verify(repository).findById("non-existing");
    }

    @Test
    void deleteFoodLog_WhenExists_ShouldReturnTrue() {
        // Arrange
        when(repository.delete("log-1")).thenReturn(true);

        // Act
        boolean result = service.deleteFoodLog("log-1");

        // Assert
        assertTrue(result);
        verify(repository).delete("log-1");
    }

    @Test
    void deleteFoodLog_WhenNotExists_ShouldReturnFalse() {
        // Arrange
        when(repository.delete("non-existing")).thenReturn(false);

        // Act
        boolean result = service.deleteFoodLog("non-existing");

        // Assert
        assertFalse(result);
        verify(repository).delete("non-existing");
    }

    @Test
    void getUserFoodLogsByDateAndMeal_ShouldReturnList() {
        // Arrange
        List<UserFoodLog> logs = Arrays.asList(sampleFoodLog);
        when(repository.findByUserIdDateAndMeal("user-1", "2023-12-01", "breakfast")).thenReturn(logs);
        when(mapper.toDTO(sampleFoodLog)).thenReturn(sampleFoodLogDTO);

        // Act
        List<UserFoodLogDTO> result = service.getUserFoodLogsByDateAndMeal("user-1", "2023-12-01", "breakfast");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("breakfast", result.get(0).getMealType());
        verify(repository).findByUserIdDateAndMeal("user-1", "2023-12-01", "breakfast");
    }
}

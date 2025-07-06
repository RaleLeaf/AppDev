package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.food.CreateFoodRequest;
import com.basick.app.dto.food.FoodDTO;
import com.basick.app.dto.food.UpdateFoodRequest;
import com.basick.app.mapper.FoodMapper;
import com.basick.app.model.Food;
import com.basick.app.repository.FoodRepository;

@ExtendWith(MockitoExtension.class)
class FoodServiceTest {

    @Mock
    private FoodRepository foodRepository;

    @Mock
    private FoodMapper foodMapper;

    @InjectMocks
    private FoodService foodService;

    private Food sampleFood;
    private FoodDTO sampleFoodDTO;
    private CreateFoodRequest createRequest;
    private UpdateFoodRequest updateRequest;

    @BeforeEach
    void setUp() {
        sampleFood = new Food();
        sampleFood.setId("food-1");
        sampleFood.setName("Apple");
        sampleFood.setBrand("Organic Farm");
        sampleFood.setCaloriesPer100g(95.0);
        sampleFood.setProteinPer100g(0.3);
        sampleFood.setCarbsPer100g(25.0);
        sampleFood.setFatsPer100g(0.2);
        sampleFood.setCategory("Fruits");

        sampleFoodDTO = new FoodDTO();
        sampleFoodDTO.setId("food-1");
        sampleFoodDTO.setName("Apple");
        sampleFoodDTO.setBrand("Organic Farm");
        sampleFoodDTO.setCaloriesPer100g(95.0);
        sampleFoodDTO.setProteinPer100g(0.3);
        sampleFoodDTO.setCarbsPer100g(25.0);
        sampleFoodDTO.setFatsPer100g(0.2);
        sampleFoodDTO.setCategory("Fruits");

        createRequest = new CreateFoodRequest();
        createRequest.setName("Apple");
        createRequest.setBrand("Organic Farm");
        createRequest.setCaloriesPer100g(95.0);
        createRequest.setProteinPer100g(0.3);
        createRequest.setCarbsPer100g(25.0);
        createRequest.setFatsPer100g(0.2);
        createRequest.setCategory("Fruits");

        updateRequest = new UpdateFoodRequest();
        updateRequest.setName("Green Apple");
        updateRequest.setCaloriesPer100g(90.0);
    }

    @Test
    void createFood_ShouldReturnFoodDTO() {
        // Arrange
        when(foodMapper.toEntity(createRequest)).thenReturn(sampleFood);
        when(foodRepository.save(sampleFood)).thenReturn(sampleFood);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        FoodDTO result = foodService.createFood(createRequest);

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodDTO.getId(), result.getId());
        assertEquals(sampleFoodDTO.getName(), result.getName());
        verify(foodRepository).save(sampleFood);
        verify(foodMapper).toEntity(createRequest);
        verify(foodMapper).toDTO(sampleFood);
    }

    @Test
    void getFoodById_WhenExists_ShouldReturnFoodDTO() {
        // Arrange
        when(foodRepository.findById("food-1")).thenReturn(sampleFood);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        FoodDTO result = foodService.getFoodById("food-1");

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodDTO.getId(), result.getId());
        verify(foodRepository).findById("food-1");
    }

    @Test
    void getFoodById_WhenNotExists_ShouldReturnNull() {
        // Arrange
        when(foodRepository.findById("non-existing")).thenReturn(null);

        // Act
        FoodDTO result = foodService.getFoodById("non-existing");

        // Assert
        assertNull(result);
        verify(foodRepository).findById("non-existing");
    }

    @Test
    void searchFoodsByName_ShouldReturnList() {
        // Arrange
        List<Food> foods = Arrays.asList(sampleFood);
        when(foodRepository.searchByName("Apple", 10)).thenReturn(foods);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        List<FoodDTO> result = foodService.searchFoodsByName("Apple", 10);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleFoodDTO.getName(), result.get(0).getName());
        verify(foodRepository).searchByName("Apple", 10);
    }

    @Test
    void getFoodsByCategory_ShouldReturnList() {
        // Arrange
        List<Food> foods = Arrays.asList(sampleFood);
        when(foodRepository.findByCategory("Fruits", 20)).thenReturn(foods);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        List<FoodDTO> result = foodService.getFoodsByCategory("Fruits", 20);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Fruits", result.get(0).getCategory());
        verify(foodRepository).findByCategory("Fruits", 20);
    }

    @Test
    void updateFood_WhenExists_ShouldReturnUpdatedFoodDTO() {
        // Arrange
        when(foodRepository.findById("food-1")).thenReturn(sampleFood);
        doNothing().when(foodMapper).updateEntityFromRequest(sampleFood, updateRequest);
        when(foodRepository.update(sampleFood)).thenReturn(sampleFood);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        FoodDTO result = foodService.updateFood("food-1", updateRequest);

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodDTO.getId(), result.getId());
        verify(foodRepository).findById("food-1");
        verify(foodMapper).updateEntityFromRequest(sampleFood, updateRequest);
        verify(foodRepository).update(sampleFood);
    }

    @Test
    void updateFood_WhenNotExists_ShouldReturnNull() {
        // Arrange
        when(foodRepository.findById("non-existing")).thenReturn(null);

        // Act
        FoodDTO result = foodService.updateFood("non-existing", updateRequest);

        // Assert
        assertNull(result);
        verify(foodRepository).findById("non-existing");
        verify(foodRepository, never()).update(any());
    }

    @Test
    void deleteFood_WhenExists_ShouldReturnTrue() {
        // Arrange
        when(foodRepository.delete("food-1")).thenReturn(true);

        // Act
        boolean result = foodService.deleteFood("food-1");

        // Assert
        assertTrue(result);
        verify(foodRepository).delete("food-1");
    }

    @Test
    void deleteFood_WhenNotExists_ShouldReturnFalse() {
        // Arrange
        when(foodRepository.delete("non-existing")).thenReturn(false);

        // Act
        boolean result = foodService.deleteFood("non-existing");

        // Assert
        assertFalse(result);
        verify(foodRepository).delete("non-existing");
    }

    @Test
    void getFoodByBarcode_WhenExists_ShouldReturnFoodDTO() {
        // Arrange
        when(foodRepository.findByBarcode("123456789")).thenReturn(sampleFood);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        FoodDTO result = foodService.getFoodByBarcode("123456789");

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodDTO.getId(), result.getId());
        verify(foodRepository).findByBarcode("123456789");
    }

    @Test
    void getPopularFoods_ShouldReturnList() {
        // Arrange
        List<Food> foods = Arrays.asList(sampleFood);
        when(foodRepository.findPopularFoods(15)).thenReturn(foods);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        List<FoodDTO> result = foodService.getPopularFoods(15);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(foodRepository).findPopularFoods(15);
    }

    @Test
    void getRecentFoods_ShouldReturnList() {
        // Arrange
        List<Food> foods = Arrays.asList(sampleFood);
        when(foodRepository.findRecentFoods(10)).thenReturn(foods);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        List<FoodDTO> result = foodService.getRecentFoods(10);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(foodRepository).findRecentFoods(10);
    }

    @Test
    void verifyFood_ShouldReturnFoodDTO() {
        // Arrange
        when(foodRepository.findById("food-1")).thenReturn(sampleFood);
        when(foodRepository.update(sampleFood)).thenReturn(sampleFood);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        FoodDTO result = foodService.verifyFood("food-1");

        // Assert
        assertNotNull(result);
        assertEquals(sampleFoodDTO.getId(), result.getId());
        verify(foodRepository).findById("food-1");
        verify(foodRepository).update(sampleFood);
    }

    @Test
    void incrementUsageCount_ShouldUpdateFood() {
        // Arrange
        when(foodRepository.findById("food-1")).thenReturn(sampleFood);
        when(foodRepository.update(sampleFood)).thenReturn(sampleFood);

        // Act
        foodService.incrementUsageCount("food-1");

        // Assert
        verify(foodRepository).findById("food-1");
        verify(foodRepository).update(sampleFood);
    }

    @Test
    void getAllFoods_ShouldReturnList() {
        // Arrange
        List<Food> foods = Arrays.asList(sampleFood);
        when(foodRepository.findAll()).thenReturn(foods);
        when(foodMapper.toDTO(sampleFood)).thenReturn(sampleFoodDTO);

        // Act
        List<FoodDTO> result = foodService.getAllFoods();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(foodRepository).findAll();
    }
}

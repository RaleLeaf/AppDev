package com.basick.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.food.CreateFoodRequest;
import com.basick.app.dto.food.FoodDTO;
import com.basick.app.dto.food.UpdateFoodRequest;
import com.basick.app.mapper.FoodMapper;
import com.basick.app.model.Food;
import com.basick.app.repository.FoodRepository;

/**
 * Service class for Food business logic
 */
@Service
public class FoodService {

    private final FoodRepository foodRepository;
    private final FoodMapper foodMapper;

    public FoodService(FoodRepository foodRepository, FoodMapper foodMapper) {
        this.foodRepository = foodRepository;
        this.foodMapper = foodMapper;
    }

    /**
     * Create a new food
     */
    public FoodDTO createFood(CreateFoodRequest request) {
        try {
            Food food = foodMapper.toEntity(request);
            Food savedFood = foodRepository.save(food);
            return foodMapper.toDTO(savedFood);
        } catch (Exception e) {
            throw new RuntimeException("Error creating food", e);
        }
    }

    /**
     * Get food by ID
     */
    public FoodDTO getFoodById(String foodId) {
        try {
            Food food = foodRepository.findById(foodId);
            return food != null ? foodMapper.toDTO(food) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving food by ID", e);
        }
    }

    /**
     * Update food
     */
    public FoodDTO updateFood(String foodId, UpdateFoodRequest request) {
        try {
            Food existingFood = foodRepository.findById(foodId);
            if (existingFood == null) {
                return null;
            }

            // Update fields from request
            foodMapper.updateEntityFromRequest(existingFood, request);
            Food updatedFood = foodRepository.update(existingFood);
            return foodMapper.toDTO(updatedFood);
        } catch (Exception e) {
            throw new RuntimeException("Error updating food", e);
        }
    }

    /**
     * Delete food
     */
    public boolean deleteFood(String foodId) {
        try {
            return foodRepository.delete(foodId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting food", e);
        }
    }

    /**
     * Search foods by name
     */
    public List<FoodDTO> searchFoodsByName(String query, int limit) {
        try {
            List<Food> foods = foodRepository.searchByName(query, limit);
            return foods.stream()
                    .map(foodMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error searching foods by name", e);
        }
    }

    /**
     * Get food by barcode
     */
    public FoodDTO getFoodByBarcode(String barcode) {
        try {
            Food food = foodRepository.findByBarcode(barcode);
            return food != null ? foodMapper.toDTO(food) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving food by barcode", e);
        }
    }

    /**
     * Get foods by category
     */
    public List<FoodDTO> getFoodsByCategory(String category, int limit) {
        try {
            List<Food> foods = foodRepository.findByCategory(category, limit);
            return foods.stream()
                    .map(foodMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving foods by category", e);
        }
    }

    /**
     * Get popular foods (most used)
     */
    public List<FoodDTO> getPopularFoods(int limit) {
        try {
            List<Food> foods = foodRepository.findPopularFoods(limit);
            return foods.stream()
                    .map(foodMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving popular foods", e);
        }
    }

    /**
     * Get recently added foods
     */
    public List<FoodDTO> getRecentFoods(int limit) {
        try {
            List<Food> foods = foodRepository.findRecentFoods(limit);
            return foods.stream()
                    .map(foodMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent foods", e);
        }
    }

    /**
     * Verify a food entry
     */
    public FoodDTO verifyFood(String foodId) {
        try {
            Food food = foodRepository.findById(foodId);
            if (food == null) {
                return null;
            }

            food.verify();
            Food updatedFood = foodRepository.update(food);
            return foodMapper.toDTO(updatedFood);
        } catch (Exception e) {
            throw new RuntimeException("Error verifying food", e);
        }
    }

    /**
     * Increment usage count for a food
     */
    public void incrementUsageCount(String foodId) {
        try {
            Food food = foodRepository.findById(foodId);
            if (food != null) {
                food.incrementUsageCount();
                foodRepository.update(food);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error incrementing usage count", e);
        }
    }

    /**
     * Get all foods
     */
    public List<FoodDTO> getAllFoods() {
        try {
            List<Food> foods = foodRepository.findAll();
            return foods.stream()
                    .map(foodMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all foods", e);
        }
    }
}

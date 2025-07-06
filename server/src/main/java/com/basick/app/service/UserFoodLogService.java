package com.basick.app.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.basick.app.dto.userfoodlog.CreateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UpdateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UserFoodLogDTO;
import com.basick.app.mapper.UserFoodLogMapper;
import com.basick.app.model.Food;
import com.basick.app.model.UserFoodLog;
import com.basick.app.repository.FoodRepository;
import com.basick.app.repository.UserFoodLogRepository;

/**
 * Service class for UserFoodLog business logic
 */
@Service
public class UserFoodLogService {

    private final UserFoodLogRepository userFoodLogRepository;
    private final UserFoodLogMapper userFoodLogMapper;
    private final FoodRepository foodRepository;
    private final FoodService foodService;

    public UserFoodLogService(UserFoodLogRepository userFoodLogRepository, 
                             UserFoodLogMapper userFoodLogMapper,
                             FoodRepository foodRepository,
                             FoodService foodService) {
        this.userFoodLogRepository = userFoodLogRepository;
        this.userFoodLogMapper = userFoodLogMapper;
        this.foodRepository = foodRepository;
        this.foodService = foodService;
    }

    /**
     * Create a new food log entry
     */
    public UserFoodLogDTO createFoodLog(CreateUserFoodLogRequest request) {
        try {
            UserFoodLog foodLog = userFoodLogMapper.toEntity(request);
            
            // Calculate nutritional values if food exists and nutrients aren't provided
            if (request.getFoodId() != null && 
                (request.getCalories() == null || request.getProtein() == null)) {
                calculateNutritionFromFood(foodLog, request.getFoodId(), request.getQuantity(), request.getUnit());
            }
            
            UserFoodLog savedFoodLog = userFoodLogRepository.save(foodLog);
            
            // Increment usage count for the food
            if (request.getFoodId() != null) {
                foodService.incrementUsageCount(request.getFoodId());
            }
            
            return userFoodLogMapper.toDTO(savedFoodLog);
        } catch (Exception e) {
            throw new RuntimeException("Error creating food log", e);
        }
    }

    /**
     * Get food log by ID
     */
    public UserFoodLogDTO getFoodLogById(String foodLogId) {
        try {
            UserFoodLog foodLog = userFoodLogRepository.findById(foodLogId);
            return foodLog != null ? userFoodLogMapper.toDTO(foodLog) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving food log by ID", e);
        }
    }

    /**
     * Update food log
     */
    public UserFoodLogDTO updateFoodLog(String foodLogId, UpdateUserFoodLogRequest request) {
        try {
            UserFoodLog existingFoodLog = userFoodLogRepository.findById(foodLogId);
            if (existingFoodLog == null) {
                return null;
            }

            // Update fields from request
            userFoodLogMapper.updateEntityFromRequest(existingFoodLog, request);
            
            // Recalculate nutritional values if needed
            if (request.getFoodId() != null && 
                (request.getCalories() == null || request.getProtein() == null)) {
                calculateNutritionFromFood(existingFoodLog, request.getFoodId(), 
                                         request.getQuantity(), request.getUnit());
            }
            
            UserFoodLog updatedFoodLog = userFoodLogRepository.update(existingFoodLog);
            return userFoodLogMapper.toDTO(updatedFoodLog);
        } catch (Exception e) {
            throw new RuntimeException("Error updating food log", e);
        }
    }

    /**
     * Delete food log
     */
    public boolean deleteFoodLog(String foodLogId) {
        try {
            return userFoodLogRepository.delete(foodLogId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting food log", e);
        }
    }

    /**
     * Get all food logs for a user
     */
    public List<UserFoodLogDTO> getUserFoodLogs(String userId, int limit) {
        try {
            List<UserFoodLog> foodLogs = userFoodLogRepository.findByUserId(userId, limit);
            return foodLogs.stream()
                    .map(userFoodLogMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user food logs", e);
        }
    }

    /**
     * Get food logs for a specific date
     */
    public List<UserFoodLogDTO> getUserFoodLogsByDate(String userId, String date) {
        try {
            List<UserFoodLog> foodLogs = userFoodLogRepository.findByUserIdAndDate(userId, date);
            return foodLogs.stream()
                    .map(userFoodLogMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving food logs by date", e);
        }
    }

    /**
     * Get food logs by meal type for a specific date
     */
    public List<UserFoodLogDTO> getUserFoodLogsByDateAndMeal(String userId, String date, String mealType) {
        try {
            List<UserFoodLog> foodLogs = userFoodLogRepository.findByUserIdDateAndMeal(userId, date, mealType);
            return foodLogs.stream()
                    .map(userFoodLogMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving food logs by date and meal", e);
        }
    }

    /**
     * Get recent food logs for a user
     */
    public List<UserFoodLogDTO> getRecentUserFoodLogs(String userId, int limit) {
        try {
            List<UserFoodLog> foodLogs = userFoodLogRepository.findRecentByUserId(userId, limit);
            return foodLogs.stream()
                    .map(userFoodLogMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recent food logs", e);
        }
    }

    /**
     * Get frequently consumed foods by user
     */
    public List<UserFoodLogDTO> getFrequentlyConsumedFoods(String userId, int limit) {
        try {
            List<UserFoodLog> foodLogs = userFoodLogRepository.findFrequentlyConsumed(userId, limit);
            return foodLogs.stream()
                    .map(userFoodLogMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving frequently consumed foods", e);
        }
    }

    /**
     * Calculate nutritional values from food database
     */
    private void calculateNutritionFromFood(UserFoodLog foodLog, String foodId, Double quantity, String unit) {
        try {
            Food food = foodRepository.findById(foodId);
            if (food != null && quantity != null) {
                Food.NutritionInfo nutrition = food.calculateForQuantity(quantity, unit);
                foodLog.setCalories(nutrition.calories);
                foodLog.setProtein(nutrition.protein);
                foodLog.setCarbs(nutrition.carbs);
                foodLog.setFats(nutrition.fats);
                foodLog.setFiber(nutrition.fiber);
                foodLog.setSugar(nutrition.sugar);
                foodLog.setSodium(nutrition.sodium);
            }
        } catch (Exception e) {
            // Log error but don't fail the operation
            System.err.println("Error calculating nutrition from food: " + e.getMessage());
        }
    }
}

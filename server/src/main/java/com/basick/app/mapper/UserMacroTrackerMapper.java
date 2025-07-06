package com.basick.app.mapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.basick.app.dto.usermacrotracker.CreateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UpdateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UserMacroSummaryDTO;
import com.basick.app.dto.usermacrotracker.UserMacroTrackerDTO;
import com.basick.app.model.UserMacroTracker;
import com.google.cloud.Timestamp;

/**
 * Mapper class for UserMacroTracker entity and DTOs
 */
@Component
public class UserMacroTrackerMapper {

    /**
     * Convert UserMacroTracker entity to DTO
     */
    public UserMacroTrackerDTO toDTO(UserMacroTracker entity) {
        if (entity == null) {
            return null;
        }

        UserMacroTrackerDTO dto = new UserMacroTrackerDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setDate(timestampToDateString(entity.getDate()));
        
        // Daily goals
        dto.setDailyCalorieGoal(entity.getDailyCalorieGoal());
        dto.setDailyProteinGoal(entity.getDailyProteinGoal());
        dto.setDailyCarbsGoal(entity.getDailyCarbsGoal());
        dto.setDailyFatsGoal(entity.getDailyFatsGoal());
        dto.setDailyFiberGoal(entity.getDailyFiberGoal());
        dto.setDailySugarGoal(entity.getDailySugarGoal());
        dto.setDailySodiumGoal(entity.getDailySodiumGoal());
        
        // Consumed amounts
        dto.setCaloriesConsumed(entity.getCaloriesConsumed());
        dto.setProteinConsumed(entity.getProteinConsumed());
        dto.setCarbsConsumed(entity.getCarbsConsumed());
        dto.setFatsConsumed(entity.getFatsConsumed());
        dto.setFiberConsumed(entity.getFiberConsumed());
        dto.setSugarConsumed(entity.getSugarConsumed());
        dto.setSodiumConsumed(entity.getSodiumConsumed());
        
        // Micronutrients
        dto.setVitamins(entity.getVitamins());
        dto.setMinerals(entity.getMinerals());
        
        // Water tracking
        dto.setWaterGoal(entity.getWaterGoal());
        dto.setWaterConsumed(entity.getWaterConsumed());
        
        // Meal tracking - convert entity MealEntry to DTO MealEntryDTO
        if (entity.getMeals() != null) {
            List<UserMacroTrackerDTO.MealEntryDTO> mealDTOs = new ArrayList<>();
            for (UserMacroTracker.MealEntry meal : entity.getMeals()) {
                UserMacroTrackerDTO.MealEntryDTO mealDTO = new UserMacroTrackerDTO.MealEntryDTO();
                mealDTO.setMealType(meal.getMealType());
                mealDTO.setFoodName(meal.getFoodName());
                mealDTO.setQuantity(meal.getQuantity());
                mealDTO.setUnit(meal.getUnit());
                mealDTO.setCalories(meal.getCalories());
                mealDTO.setProtein(meal.getProtein());
                mealDTO.setCarbs(meal.getCarbs());
                mealDTO.setFats(meal.getFats());
                mealDTO.setFiber(meal.getFiber());
                mealDTO.setSugar(meal.getSugar());
                mealDTO.setSodium(meal.getSodium());
                mealDTO.setConsumedAt(timestampToDateString(meal.getConsumedAt()));
                mealDTO.setFoodId(meal.getFoodId());
                mealDTO.setBarcode(meal.getBarcode());
                mealDTOs.add(mealDTO);
            }
            dto.setMeals(mealDTOs);
        }
        
        // Progress percentages
        dto.setCalorieProgress(entity.getCalorieProgress());
        dto.setProteinProgress(entity.getProteinProgress());
        dto.setCarbsProgress(entity.getCarbsProgress());
        dto.setFatsProgress(entity.getFatsProgress());
        
        // Intermittent fasting
        dto.setIsIntermittentFasting(entity.getIsIntermittentFasting());
        dto.setFastingHours(entity.getFastingHours());
        dto.setFirstMealTime(timestampToDateString(entity.getFirstMealTime()));
        dto.setLastMealTime(timestampToDateString(entity.getLastMealTime()));
        
        // Activity adjustments
        dto.setExerciseCaloriesBurned(entity.getExerciseCaloriesBurned());
        dto.setAdjustedCalorieGoal(entity.getAdjustedCalorieGoal());
        
        // Timestamps
        dto.setCreatedAt(timestampToDateString(entity.getCreatedAt()));
        dto.setUpdatedAt(timestampToDateString(entity.getUpdatedAt()));

        return dto;
    }

    /**
     * Convert CreateUserMacroTrackerRequest to entity
     */
    public UserMacroTracker toEntity(CreateUserMacroTrackerRequest request) {
        if (request == null) {
            return null;
        }

        UserMacroTracker entity = new UserMacroTracker();
        entity.setUserId(request.getUserId());
        entity.setDate(dateStringToTimestamp(request.getDate()));
        
        // Daily goals
        entity.setDailyCalorieGoal(request.getDailyCalorieGoal());
        entity.setDailyProteinGoal(request.getDailyProteinGoal());
        entity.setDailyCarbsGoal(request.getDailyCarbsGoal());
        entity.setDailyFatsGoal(request.getDailyFatsGoal());
        entity.setDailyFiberGoal(request.getDailyFiberGoal());
        entity.setDailySugarGoal(request.getDailySugarGoal());
        entity.setDailySodiumGoal(request.getDailySodiumGoal());
        
        // Water tracking
        entity.setWaterGoal(request.getWaterGoal());
        
        // Intermittent fasting
        entity.setIsIntermittentFasting(request.getIsIntermittentFasting());
        entity.setFastingHours(request.getFastingHours());
        
        // Initialize consumed amounts to 0
        entity.setCaloriesConsumed(0.0);
        entity.setProteinConsumed(0.0);
        entity.setCarbsConsumed(0.0);
        entity.setFatsConsumed(0.0);
        entity.setFiberConsumed(0.0);
        entity.setSugarConsumed(0.0);
        entity.setSodiumConsumed(0.0);
        entity.setWaterConsumed(0.0);

        return entity;
    }

    /**
     * Update entity from UpdateUserMacroTrackerRequest
     */
    public void updateEntityFromRequest(UserMacroTracker entity, UpdateUserMacroTrackerRequest request) {
        if (entity == null || request == null) {
            return;
        }

        if (request.getDate() != null) {
            entity.setDate(dateStringToTimestamp(request.getDate()));
        }
        
        // Update daily goals if provided
        if (request.getDailyCalorieGoal() != null) {
            entity.setDailyCalorieGoal(request.getDailyCalorieGoal());
        }
        if (request.getDailyProteinGoal() != null) {
            entity.setDailyProteinGoal(request.getDailyProteinGoal());
        }
        if (request.getDailyCarbsGoal() != null) {
            entity.setDailyCarbsGoal(request.getDailyCarbsGoal());
        }
        if (request.getDailyFatsGoal() != null) {
            entity.setDailyFatsGoal(request.getDailyFatsGoal());
        }
        if (request.getDailyFiberGoal() != null) {
            entity.setDailyFiberGoal(request.getDailyFiberGoal());
        }
        if (request.getDailySugarGoal() != null) {
            entity.setDailySugarGoal(request.getDailySugarGoal());
        }
        if (request.getDailySodiumGoal() != null) {
            entity.setDailySodiumGoal(request.getDailySodiumGoal());
        }
        
        // Update water goal if provided
        if (request.getWaterGoal() != null) {
            entity.setWaterGoal(request.getWaterGoal());
        }
        
        // Update intermittent fasting settings if provided
        if (request.getIsIntermittentFasting() != null) {
            entity.setIsIntermittentFasting(request.getIsIntermittentFasting());
        }
        if (request.getFastingHours() != null) {
            entity.setFastingHours(request.getFastingHours());
        }
    }

    /**
     * Convert UserMacroTracker entity to summary DTO
     */
    public UserMacroSummaryDTO toSummaryDTO(UserMacroTracker entity) {
        if (entity == null) {
            return null;
        }

        UserMacroSummaryDTO dto = new UserMacroSummaryDTO();
        dto.setUserId(entity.getUserId());
        dto.setStartDate(timestampToDateString(entity.getDate()));
        dto.setEndDate(timestampToDateString(entity.getDate()));
        dto.setDaysCovered(1);
        
        // Single day averages (same as consumed amounts)
        dto.setAvgCaloriesConsumed(entity.getCaloriesConsumed());
        dto.setAvgProteinConsumed(entity.getProteinConsumed());
        dto.setAvgCarbsConsumed(entity.getCarbsConsumed());
        dto.setAvgFatsConsumed(entity.getFatsConsumed());
        dto.setAvgFiberConsumed(entity.getFiberConsumed());
        dto.setAvgWaterConsumed(entity.getWaterConsumed());
        
        // Goals
        dto.setAvgCalorieGoal(entity.getDailyCalorieGoal());
        dto.setAvgProteinGoal(entity.getDailyProteinGoal());
        dto.setAvgCarbsGoal(entity.getDailyCarbsGoal());
        dto.setAvgFatsGoal(entity.getDailyFatsGoal());
        dto.setAvgWaterGoal(entity.getWaterGoal());
        
        // Achievement percentages
        if (entity.getDailyCalorieGoal() != null && entity.getDailyCalorieGoal() > 0 && entity.getCaloriesConsumed() != null) {
            dto.setCalorieGoalAchievement((entity.getCaloriesConsumed() / entity.getDailyCalorieGoal()) * 100);
        } else {
            dto.setCalorieGoalAchievement(0.0);
        }
        
        if (entity.getDailyProteinGoal() != null && entity.getDailyProteinGoal() > 0 && entity.getProteinConsumed() != null) {
            dto.setProteinGoalAchievement((entity.getProteinConsumed() / entity.getDailyProteinGoal()) * 100);
        } else {
            dto.setProteinGoalAchievement(0.0);
        }
        
        if (entity.getDailyCarbsGoal() != null && entity.getDailyCarbsGoal() > 0 && entity.getCarbsConsumed() != null) {
            dto.setCarbsGoalAchievement((entity.getCarbsConsumed() / entity.getDailyCarbsGoal()) * 100);
        } else {
            dto.setCarbsGoalAchievement(0.0);
        }
        
        if (entity.getDailyFatsGoal() != null && entity.getDailyFatsGoal() > 0 && entity.getFatsConsumed() != null) {
            dto.setFatsGoalAchievement((entity.getFatsConsumed() / entity.getDailyFatsGoal()) * 100);
        } else {
            dto.setFatsGoalAchievement(0.0);
        }
        
        if (entity.getWaterGoal() != null && entity.getWaterGoal() > 0 && entity.getWaterConsumed() != null) {
            dto.setWaterGoalAchievement((entity.getWaterConsumed() / entity.getWaterGoal()) * 100);
        } else {
            dto.setWaterGoalAchievement(0.0);
        }
        
        // Statistics
        dto.setConsecutiveDaysTracked(1);
        dto.setTotalMealsLogged(entity.getMeals() != null ? entity.getMeals().size() : 0);

        return dto;
    }

    /**
     * Convert date string to Timestamp
     */
    private Timestamp dateStringToTimestamp(String dateString) {
        if (dateString == null) {
            return null;
        }
        try {
            LocalDate date = LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE);
            return Timestamp.ofTimeSecondsAndNanos(
                date.atStartOfDay().toEpochSecond(java.time.ZoneOffset.UTC), 0);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Convert Timestamp to date string
     */
    private String timestampToDateString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        try {
            LocalDate date = LocalDate.ofEpochDay(timestamp.getSeconds() / 86400);
            return date.format(DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (Exception e) {
            return null;
        }
    }
}

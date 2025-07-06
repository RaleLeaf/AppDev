package com.basick.app.dto.usermacrotracker;

import java.util.List;
import java.util.Map;

/**
 * Data Transfer Object for UserMacroTracker
 */
public class UserMacroTrackerDTO {
    private String id;
    private String userId;
    private String date;
    
    // Daily goals
    private Double dailyCalorieGoal;
    private Double dailyProteinGoal;
    private Double dailyCarbsGoal;
    private Double dailyFatsGoal;
    private Double dailyFiberGoal;
    private Double dailySugarGoal;
    private Double dailySodiumGoal;
    
    // Consumed amounts
    private Double caloriesConsumed;
    private Double proteinConsumed;
    private Double carbsConsumed;
    private Double fatsConsumed;
    private Double fiberConsumed;
    private Double sugarConsumed;
    private Double sodiumConsumed;
    
    // Micronutrients
    private Map<String, Double> vitamins;
    private Map<String, Double> minerals;
    
    // Water tracking
    private Double waterGoal;
    private Double waterConsumed;
    
    // Meal tracking
    private List<MealEntryDTO> meals;
    
    // Progress percentages (calculated fields)
    private Double calorieProgress;
    private Double proteinProgress;
    private Double carbsProgress;
    private Double fatsProgress;
    
    // Intermittent fasting
    private Boolean isIntermittentFasting;
    private Integer fastingHours;
    private String firstMealTime;
    private String lastMealTime;
    
    // Activity adjustments
    private Double exerciseCaloriesBurned;
    private Double adjustedCalorieGoal;
    
    private String createdAt;
    private String updatedAt;

    // Nested MealEntryDTO class
    public static class MealEntryDTO {
        private String mealType;
        private String foodName;
        private Double quantity;
        private String unit;
        private Double calories;
        private Double protein;
        private Double carbs;
        private Double fats;
        private Double fiber;
        private Double sugar;
        private Double sodium;
        private String consumedAt;
        private String foodId;
        private String barcode;

        public MealEntryDTO() {}

        // Getters and Setters
        public String getMealType() { return mealType; }
        public void setMealType(String mealType) { this.mealType = mealType; }

        public String getFoodName() { return foodName; }
        public void setFoodName(String foodName) { this.foodName = foodName; }

        public Double getQuantity() { return quantity; }
        public void setQuantity(Double quantity) { this.quantity = quantity; }

        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }

        public Double getCalories() { return calories; }
        public void setCalories(Double calories) { this.calories = calories; }

        public Double getProtein() { return protein; }
        public void setProtein(Double protein) { this.protein = protein; }

        public Double getCarbs() { return carbs; }
        public void setCarbs(Double carbs) { this.carbs = carbs; }

        public Double getFats() { return fats; }
        public void setFats(Double fats) { this.fats = fats; }

        public Double getFiber() { return fiber; }
        public void setFiber(Double fiber) { this.fiber = fiber; }

        public Double getSugar() { return sugar; }
        public void setSugar(Double sugar) { this.sugar = sugar; }

        public Double getSodium() { return sodium; }
        public void setSodium(Double sodium) { this.sodium = sodium; }

        public String getConsumedAt() { return consumedAt; }
        public void setConsumedAt(String consumedAt) { this.consumedAt = consumedAt; }

        public String getFoodId() { return foodId; }
        public void setFoodId(String foodId) { this.foodId = foodId; }

        public String getBarcode() { return barcode; }
        public void setBarcode(String barcode) { this.barcode = barcode; }
    }

    // Constructors
    public UserMacroTrackerDTO() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Double getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(Double dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }

    public Double getDailyProteinGoal() { return dailyProteinGoal; }
    public void setDailyProteinGoal(Double dailyProteinGoal) { this.dailyProteinGoal = dailyProteinGoal; }

    public Double getDailyCarbsGoal() { return dailyCarbsGoal; }
    public void setDailyCarbsGoal(Double dailyCarbsGoal) { this.dailyCarbsGoal = dailyCarbsGoal; }

    public Double getDailyFatsGoal() { return dailyFatsGoal; }
    public void setDailyFatsGoal(Double dailyFatsGoal) { this.dailyFatsGoal = dailyFatsGoal; }

    public Double getDailyFiberGoal() { return dailyFiberGoal; }
    public void setDailyFiberGoal(Double dailyFiberGoal) { this.dailyFiberGoal = dailyFiberGoal; }

    public Double getDailySugarGoal() { return dailySugarGoal; }
    public void setDailySugarGoal(Double dailySugarGoal) { this.dailySugarGoal = dailySugarGoal; }

    public Double getDailySodiumGoal() { return dailySodiumGoal; }
    public void setDailySodiumGoal(Double dailySodiumGoal) { this.dailySodiumGoal = dailySodiumGoal; }

    public Double getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Double caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }

    public Double getProteinConsumed() { return proteinConsumed; }
    public void setProteinConsumed(Double proteinConsumed) { this.proteinConsumed = proteinConsumed; }

    public Double getCarbsConsumed() { return carbsConsumed; }
    public void setCarbsConsumed(Double carbsConsumed) { this.carbsConsumed = carbsConsumed; }

    public Double getFatsConsumed() { return fatsConsumed; }
    public void setFatsConsumed(Double fatsConsumed) { this.fatsConsumed = fatsConsumed; }

    public Double getFiberConsumed() { return fiberConsumed; }
    public void setFiberConsumed(Double fiberConsumed) { this.fiberConsumed = fiberConsumed; }

    public Double getSugarConsumed() { return sugarConsumed; }
    public void setSugarConsumed(Double sugarConsumed) { this.sugarConsumed = sugarConsumed; }

    public Double getSodiumConsumed() { return sodiumConsumed; }
    public void setSodiumConsumed(Double sodiumConsumed) { this.sodiumConsumed = sodiumConsumed; }

    public Map<String, Double> getVitamins() { return vitamins; }
    public void setVitamins(Map<String, Double> vitamins) { this.vitamins = vitamins; }

    public Map<String, Double> getMinerals() { return minerals; }
    public void setMinerals(Map<String, Double> minerals) { this.minerals = minerals; }

    public Double getWaterGoal() { return waterGoal; }
    public void setWaterGoal(Double waterGoal) { this.waterGoal = waterGoal; }

    public Double getWaterConsumed() { return waterConsumed; }
    public void setWaterConsumed(Double waterConsumed) { this.waterConsumed = waterConsumed; }

    public List<MealEntryDTO> getMeals() { return meals; }
    public void setMeals(List<MealEntryDTO> meals) { this.meals = meals; }

    public Double getCalorieProgress() { return calorieProgress; }
    public void setCalorieProgress(Double calorieProgress) { this.calorieProgress = calorieProgress; }

    public Double getProteinProgress() { return proteinProgress; }
    public void setProteinProgress(Double proteinProgress) { this.proteinProgress = proteinProgress; }

    public Double getCarbsProgress() { return carbsProgress; }
    public void setCarbsProgress(Double carbsProgress) { this.carbsProgress = carbsProgress; }

    public Double getFatsProgress() { return fatsProgress; }
    public void setFatsProgress(Double fatsProgress) { this.fatsProgress = fatsProgress; }

    public Boolean getIsIntermittentFasting() { return isIntermittentFasting; }
    public void setIsIntermittentFasting(Boolean isIntermittentFasting) { this.isIntermittentFasting = isIntermittentFasting; }

    public Integer getFastingHours() { return fastingHours; }
    public void setFastingHours(Integer fastingHours) { this.fastingHours = fastingHours; }

    public String getFirstMealTime() { return firstMealTime; }
    public void setFirstMealTime(String firstMealTime) { this.firstMealTime = firstMealTime; }

    public String getLastMealTime() { return lastMealTime; }
    public void setLastMealTime(String lastMealTime) { this.lastMealTime = lastMealTime; }

    public Double getExerciseCaloriesBurned() { return exerciseCaloriesBurned; }
    public void setExerciseCaloriesBurned(Double exerciseCaloriesBurned) { this.exerciseCaloriesBurned = exerciseCaloriesBurned; }

    public Double getAdjustedCalorieGoal() { return adjustedCalorieGoal; }
    public void setAdjustedCalorieGoal(Double adjustedCalorieGoal) { this.adjustedCalorieGoal = adjustedCalorieGoal; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}

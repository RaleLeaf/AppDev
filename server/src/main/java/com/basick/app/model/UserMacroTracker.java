package com.basick.app.model;

import java.util.List;
import java.util.Map;

import com.google.cloud.Timestamp;

public class UserMacroTracker {
    private String id;
    private String userId;
    private Timestamp date; // Date for which this tracking is for
    
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
    private List<MealEntry> meals;
    
    // Progress percentages (calculated fields)
    private Double calorieProgress;
    private Double proteinProgress;
    private Double carbsProgress;
    private Double fatsProgress;
    
    // Intermittent fasting
    private Boolean isIntermittentFasting;
    private Integer fastingHours;
    private Timestamp firstMealTime;
    private Timestamp lastMealTime;
    
    // Activity adjustments
    private Double exerciseCaloriesBurned;
    private Double adjustedCalorieGoal; // Goal adjusted for exercise
    
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Nested MealEntry class
    public static class MealEntry {
        private String mealType; // "BREAKFAST", "LUNCH", "DINNER", "SNACK"
        private String foodName;
        private Double quantity;
        private String unit; // "GRAMS", "CUPS", "PIECES", etc.
        private Double calories;
        private Double protein;
        private Double carbs;
        private Double fats;
        private Double fiber;
        private Double sugar;
        private Double sodium;
        private Timestamp consumedAt;
        private String foodId; // Reference to food database
        private String barcode; // For scanned foods

        public MealEntry() {}

        // Getters and Setters for MealEntry
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
        public Timestamp getConsumedAt() { return consumedAt; }
        public void setConsumedAt(Timestamp consumedAt) { this.consumedAt = consumedAt; }
        public String getFoodId() { return foodId; }
        public void setFoodId(String foodId) { this.foodId = foodId; }
        public String getBarcode() { return barcode; }
        public void setBarcode(String barcode) { this.barcode = barcode; }
    }

    public UserMacroTracker() {
        this.caloriesConsumed = 0.0;
        this.proteinConsumed = 0.0;
        this.carbsConsumed = 0.0;
        this.fatsConsumed = 0.0;
        this.fiberConsumed = 0.0;
        this.sugarConsumed = 0.0;
        this.sodiumConsumed = 0.0;
        this.waterConsumed = 0.0;
        this.exerciseCaloriesBurned = 0.0;
        this.isIntermittentFasting = false;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public UserMacroTracker(String userId, Timestamp date) {
        this();
        this.userId = userId;
        this.date = date;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public Timestamp getDate() { return date; }
    public void setDate(Timestamp date) { this.date = date; }
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
    public List<MealEntry> getMeals() { return meals; }
    public void setMeals(List<MealEntry> meals) { this.meals = meals; }
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
    public Timestamp getFirstMealTime() { return firstMealTime; }
    public void setFirstMealTime(Timestamp firstMealTime) { this.firstMealTime = firstMealTime; }
    public Timestamp getLastMealTime() { return lastMealTime; }
    public void setLastMealTime(Timestamp lastMealTime) { this.lastMealTime = lastMealTime; }
    public Double getExerciseCaloriesBurned() { return exerciseCaloriesBurned; }
    public void setExerciseCaloriesBurned(Double exerciseCaloriesBurned) { this.exerciseCaloriesBurned = exerciseCaloriesBurned; }
    public Double getAdjustedCalorieGoal() { return adjustedCalorieGoal; }
    public void setAdjustedCalorieGoal(Double adjustedCalorieGoal) { this.adjustedCalorieGoal = adjustedCalorieGoal; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void calculateProgress() {
        if (dailyCalorieGoal != null && dailyCalorieGoal > 0) {
            this.calorieProgress = (caloriesConsumed != null ? caloriesConsumed : 0.0) / dailyCalorieGoal * 100;
        }
        if (dailyProteinGoal != null && dailyProteinGoal > 0) {
            this.proteinProgress = (proteinConsumed != null ? proteinConsumed : 0.0) / dailyProteinGoal * 100;
        }
        if (dailyCarbsGoal != null && dailyCarbsGoal > 0) {
            this.carbsProgress = (carbsConsumed != null ? carbsConsumed : 0.0) / dailyCarbsGoal * 100;
        }
        if (dailyFatsGoal != null && dailyFatsGoal > 0) {
            this.fatsProgress = (fatsConsumed != null ? fatsConsumed : 0.0) / dailyFatsGoal * 100;
        }
        this.updateTimestamp();
    }

    public void addMealEntry(MealEntry meal) {
        if (this.meals == null) {
            this.meals = new java.util.ArrayList<>();
        }
        this.meals.add(meal);
        
        // Update consumed totals
        if (meal.getCalories() != null) {
            this.caloriesConsumed = (this.caloriesConsumed != null ? this.caloriesConsumed : 0.0) + meal.getCalories();
        }
        if (meal.getProtein() != null) {
            this.proteinConsumed = (this.proteinConsumed != null ? this.proteinConsumed : 0.0) + meal.getProtein();
        }
        if (meal.getCarbs() != null) {
            this.carbsConsumed = (this.carbsConsumed != null ? this.carbsConsumed : 0.0) + meal.getCarbs();
        }
        if (meal.getFats() != null) {
            this.fatsConsumed = (this.fatsConsumed != null ? this.fatsConsumed : 0.0) + meal.getFats();
        }
        if (meal.getFiber() != null) {
            this.fiberConsumed = (this.fiberConsumed != null ? this.fiberConsumed : 0.0) + meal.getFiber();
        }
        if (meal.getSugar() != null) {
            this.sugarConsumed = (this.sugarConsumed != null ? this.sugarConsumed : 0.0) + meal.getSugar();
        }
        if (meal.getSodium() != null) {
            this.sodiumConsumed = (this.sodiumConsumed != null ? this.sodiumConsumed : 0.0) + meal.getSodium();
        }
        
        // Update meal timing for intermittent fasting
        if (meal.getConsumedAt() != null) {
            if (this.firstMealTime == null || meal.getConsumedAt().compareTo(this.firstMealTime) < 0) {
                this.firstMealTime = meal.getConsumedAt();
            }
            if (this.lastMealTime == null || meal.getConsumedAt().compareTo(this.lastMealTime) > 0) {
                this.lastMealTime = meal.getConsumedAt();
            }
        }
        
        this.calculateProgress();
    }

    public void addWater(Double waterAmount) {
        if (waterAmount != null && waterAmount > 0) {
            this.waterConsumed = (this.waterConsumed != null ? this.waterConsumed : 0.0) + waterAmount;
            this.updateTimestamp();
        }
    }

    public void adjustForExercise(Double caloriesBurned) {
        if (caloriesBurned != null && caloriesBurned > 0) {
            this.exerciseCaloriesBurned = (this.exerciseCaloriesBurned != null ? this.exerciseCaloriesBurned : 0.0) + caloriesBurned;
            if (this.dailyCalorieGoal != null) {
                this.adjustedCalorieGoal = this.dailyCalorieGoal + this.exerciseCaloriesBurned;
            }
            this.calculateProgress();
        }
    }
}

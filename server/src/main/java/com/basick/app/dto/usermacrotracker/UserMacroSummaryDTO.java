package com.basick.app.dto.usermacrotracker;

/**
 * DTO for macro tracking summary over a period
 */
public class UserMacroSummaryDTO {
    private String userId;
    private Integer daysCovered;
    private String startDate;
    private String endDate;
    
    // Average daily values
    private Double avgCaloriesConsumed;
    private Double avgProteinConsumed;
    private Double avgCarbsConsumed;
    private Double avgFatsConsumed;
    private Double avgFiberConsumed;
    private Double avgWaterConsumed;
    
    // Average goals
    private Double avgCalorieGoal;
    private Double avgProteinGoal;
    private Double avgCarbsGoal;
    private Double avgFatsGoal;
    private Double avgWaterGoal;
    
    // Achievement percentages
    private Double calorieGoalAchievement;
    private Double proteinGoalAchievement;
    private Double carbsGoalAchievement;
    private Double fatsGoalAchievement;
    private Double waterGoalAchievement;
    
    // Streaks and statistics
    private Integer consecutiveDaysTracked;
    private Integer totalMealsLogged;
    private Integer mostActiveDay; // Day of week (1-7, Monday = 1)
    
    // Weight management
    private Double totalCalorieDeficit; // If negative, it's surplus
    private Double estimatedWeightChange; // In kg

    // Constructors
    public UserMacroSummaryDTO() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Integer getDaysCovered() { return daysCovered; }
    public void setDaysCovered(Integer daysCovered) { this.daysCovered = daysCovered; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    public Double getAvgCaloriesConsumed() { return avgCaloriesConsumed; }
    public void setAvgCaloriesConsumed(Double avgCaloriesConsumed) { this.avgCaloriesConsumed = avgCaloriesConsumed; }

    public Double getAvgProteinConsumed() { return avgProteinConsumed; }
    public void setAvgProteinConsumed(Double avgProteinConsumed) { this.avgProteinConsumed = avgProteinConsumed; }

    public Double getAvgCarbsConsumed() { return avgCarbsConsumed; }
    public void setAvgCarbsConsumed(Double avgCarbsConsumed) { this.avgCarbsConsumed = avgCarbsConsumed; }

    public Double getAvgFatsConsumed() { return avgFatsConsumed; }
    public void setAvgFatsConsumed(Double avgFatsConsumed) { this.avgFatsConsumed = avgFatsConsumed; }

    public Double getAvgFiberConsumed() { return avgFiberConsumed; }
    public void setAvgFiberConsumed(Double avgFiberConsumed) { this.avgFiberConsumed = avgFiberConsumed; }

    public Double getAvgWaterConsumed() { return avgWaterConsumed; }
    public void setAvgWaterConsumed(Double avgWaterConsumed) { this.avgWaterConsumed = avgWaterConsumed; }

    public Double getAvgCalorieGoal() { return avgCalorieGoal; }
    public void setAvgCalorieGoal(Double avgCalorieGoal) { this.avgCalorieGoal = avgCalorieGoal; }

    public Double getAvgProteinGoal() { return avgProteinGoal; }
    public void setAvgProteinGoal(Double avgProteinGoal) { this.avgProteinGoal = avgProteinGoal; }

    public Double getAvgCarbsGoal() { return avgCarbsGoal; }
    public void setAvgCarbsGoal(Double avgCarbsGoal) { this.avgCarbsGoal = avgCarbsGoal; }

    public Double getAvgFatsGoal() { return avgFatsGoal; }
    public void setAvgFatsGoal(Double avgFatsGoal) { this.avgFatsGoal = avgFatsGoal; }

    public Double getAvgWaterGoal() { return avgWaterGoal; }
    public void setAvgWaterGoal(Double avgWaterGoal) { this.avgWaterGoal = avgWaterGoal; }

    public Double getCalorieGoalAchievement() { return calorieGoalAchievement; }
    public void setCalorieGoalAchievement(Double calorieGoalAchievement) { this.calorieGoalAchievement = calorieGoalAchievement; }

    public Double getProteinGoalAchievement() { return proteinGoalAchievement; }
    public void setProteinGoalAchievement(Double proteinGoalAchievement) { this.proteinGoalAchievement = proteinGoalAchievement; }

    public Double getCarbsGoalAchievement() { return carbsGoalAchievement; }
    public void setCarbsGoalAchievement(Double carbsGoalAchievement) { this.carbsGoalAchievement = carbsGoalAchievement; }

    public Double getFatsGoalAchievement() { return fatsGoalAchievement; }
    public void setFatsGoalAchievement(Double fatsGoalAchievement) { this.fatsGoalAchievement = fatsGoalAchievement; }

    public Double getWaterGoalAchievement() { return waterGoalAchievement; }
    public void setWaterGoalAchievement(Double waterGoalAchievement) { this.waterGoalAchievement = waterGoalAchievement; }

    public Integer getConsecutiveDaysTracked() { return consecutiveDaysTracked; }
    public void setConsecutiveDaysTracked(Integer consecutiveDaysTracked) { this.consecutiveDaysTracked = consecutiveDaysTracked; }

    public Integer getTotalMealsLogged() { return totalMealsLogged; }
    public void setTotalMealsLogged(Integer totalMealsLogged) { this.totalMealsLogged = totalMealsLogged; }

    public Integer getMostActiveDay() { return mostActiveDay; }
    public void setMostActiveDay(Integer mostActiveDay) { this.mostActiveDay = mostActiveDay; }

    public Double getTotalCalorieDeficit() { return totalCalorieDeficit; }
    public void setTotalCalorieDeficit(Double totalCalorieDeficit) { this.totalCalorieDeficit = totalCalorieDeficit; }

    public Double getEstimatedWeightChange() { return estimatedWeightChange; }
    public void setEstimatedWeightChange(Double estimatedWeightChange) { this.estimatedWeightChange = estimatedWeightChange; }
}

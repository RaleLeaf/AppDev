package com.basick.app.dto.usermacrotracker;

/**
 * Request DTO for updating a UserMacroTracker
 */
public class UpdateUserMacroTrackerRequest {
    private String date; // Format: YYYY-MM-DD
    
    // Daily goals (optional updates)
    private Double dailyCalorieGoal;
    private Double dailyProteinGoal;
    private Double dailyCarbsGoal;
    private Double dailyFatsGoal;
    private Double dailyFiberGoal;
    private Double dailySugarGoal;
    private Double dailySodiumGoal;
    
    // Water tracking
    private Double waterGoal;
    
    // Intermittent fasting
    private Boolean isIntermittentFasting;
    private Integer fastingHours;

    // Constructors
    public UpdateUserMacroTrackerRequest() {}

    // Getters and Setters
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

    public Double getWaterGoal() { return waterGoal; }
    public void setWaterGoal(Double waterGoal) { this.waterGoal = waterGoal; }

    public Boolean getIsIntermittentFasting() { return isIntermittentFasting; }
    public void setIsIntermittentFasting(Boolean isIntermittentFasting) { this.isIntermittentFasting = isIntermittentFasting; }

    public Integer getFastingHours() { return fastingHours; }
    public void setFastingHours(Integer fastingHours) { this.fastingHours = fastingHours; }
}

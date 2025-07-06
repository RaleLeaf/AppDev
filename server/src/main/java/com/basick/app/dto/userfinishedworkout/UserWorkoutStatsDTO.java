package com.basick.app.dto.userfinishedworkout;

public class UserWorkoutStatsDTO {
    private String userId;
    private Integer totalWorkouts;
    private Double totalCaloriesBurned;
    private Integer totalMinutesExercised;
    private Double averageWorkoutDuration;
    private Double averageCaloriesPerWorkout;
    private Double averageUserRating;
    private String mostFrequentWorkout;
    private Integer workoutsThisWeek;
    private Integer workoutsThisMonth;
    private Double caloriesBurnedThisWeek;
    private Double caloriesBurnedThisMonth;

    public UserWorkoutStatsDTO() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Integer getTotalWorkouts() { return totalWorkouts; }
    public void setTotalWorkouts(Integer totalWorkouts) { this.totalWorkouts = totalWorkouts; }

    public Double getTotalCaloriesBurned() { return totalCaloriesBurned; }
    public void setTotalCaloriesBurned(Double totalCaloriesBurned) { this.totalCaloriesBurned = totalCaloriesBurned; }

    public Integer getTotalMinutesExercised() { return totalMinutesExercised; }
    public void setTotalMinutesExercised(Integer totalMinutesExercised) { this.totalMinutesExercised = totalMinutesExercised; }

    public Double getAverageWorkoutDuration() { return averageWorkoutDuration; }
    public void setAverageWorkoutDuration(Double averageWorkoutDuration) { this.averageWorkoutDuration = averageWorkoutDuration; }

    public Double getAverageCaloriesPerWorkout() { return averageCaloriesPerWorkout; }
    public void setAverageCaloriesPerWorkout(Double averageCaloriesPerWorkout) { this.averageCaloriesPerWorkout = averageCaloriesPerWorkout; }

    public Double getAverageUserRating() { return averageUserRating; }
    public void setAverageUserRating(Double averageUserRating) { this.averageUserRating = averageUserRating; }

    public String getMostFrequentWorkout() { return mostFrequentWorkout; }
    public void setMostFrequentWorkout(String mostFrequentWorkout) { this.mostFrequentWorkout = mostFrequentWorkout; }

    public Integer getWorkoutsThisWeek() { return workoutsThisWeek; }
    public void setWorkoutsThisWeek(Integer workoutsThisWeek) { this.workoutsThisWeek = workoutsThisWeek; }

    public Integer getWorkoutsThisMonth() { return workoutsThisMonth; }
    public void setWorkoutsThisMonth(Integer workoutsThisMonth) { this.workoutsThisMonth = workoutsThisMonth; }

    public Double getCaloriesBurnedThisWeek() { return caloriesBurnedThisWeek; }
    public void setCaloriesBurnedThisWeek(Double caloriesBurnedThisWeek) { this.caloriesBurnedThisWeek = caloriesBurnedThisWeek; }

    public Double getCaloriesBurnedThisMonth() { return caloriesBurnedThisMonth; }
    public void setCaloriesBurnedThisMonth(Double caloriesBurnedThisMonth) { this.caloriesBurnedThisMonth = caloriesBurnedThisMonth; }
}

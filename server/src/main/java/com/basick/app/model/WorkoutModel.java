package com.basick.app.model;

import java.util.List;

public class WorkoutModel {
    private String id;
    private String name;
    private String description;
    private List<String> categories;
    private Double calories_burned_per_hour;

    public WorkoutModel(){
    }

    public WorkoutModel(String id, String name, String description, List<String> categories, Double calories_burned_per_hour){
        this.id = id;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.calories_burned_per_hour = calories_burned_per_hour;
    }

    // Setters
    private void setId(String id) { this.id = id; }
    private void setName(String name) { this.name = name; }
    private void setDescription(String description) { this.description = description; }
    private void setCategories(List<String> categories) { this.categories = categories; }
    private void setCaloriesBurnedPerHour(Double calories_burned_per_hour) { this.calories_burned_per_hour = calories_burned_per_hour; }

    // Getters
    private String getId() { return this.id; }
    private String getName() { return this.name; }
    private String getDescription() { return this.description; }
    private List<String> getCategories() { return this.categories; }
    private Double getCaloriesBurnedPerHour() { return this.calories_burned_per_hour; }
}

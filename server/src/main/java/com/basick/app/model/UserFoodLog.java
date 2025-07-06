package com.basick.app.model;

import com.google.cloud.Timestamp;

public class UserFoodLog {
    private String id;
    private String userId;
    private String foodId; // Reference to Food entity
    private String foodName;
    private String mealType; // "BREAKFAST", "LUNCH", "DINNER", "SNACK"
    private Double quantity; // Amount consumed
    private String unit; // "GRAMS", "CUPS", "PIECES", "ML", etc.
    
    // Nutritional information (calculated based on quantity)
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fats;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    
    // Timing
    private Timestamp consumedAt; // When the food was consumed
    private Timestamp loggedAt; // When this entry was created/logged
    
    // Additional metadata
    private String barcode; // For scanned foods
    private String notes; // User notes about the meal
    private String imageUrl; // Photo of the meal
    private Boolean isHomemade; // User-prepared vs restaurant/packaged
    private String brand; // Brand name if applicable
    
    // Timestamps
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public UserFoodLog() {
        this.isHomemade = false;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
        this.loggedAt = Timestamp.now();
        this.consumedAt = Timestamp.now();
    }

    public UserFoodLog(String userId, String foodId, String foodName, String mealType, Double quantity, String unit) {
        this();
        this.userId = userId;
        this.foodId = foodId;
        this.foodName = foodName;
        this.mealType = mealType;
        this.quantity = quantity;
        this.unit = unit;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFoodId() { return foodId; }
    public void setFoodId(String foodId) { this.foodId = foodId; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

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

    public Timestamp getLoggedAt() { return loggedAt; }
    public void setLoggedAt(Timestamp loggedAt) { this.loggedAt = loggedAt; }

    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsHomemade() { return isHomemade; }
    public void setIsHomemade(Boolean isHomemade) { this.isHomemade = isHomemade; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void setConsumedNow() {
        this.consumedAt = Timestamp.now();
        this.updateTimestamp();
    }
}

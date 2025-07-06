package com.basick.app.dto.userfoodlog;

/**
 * Request DTO for creating a new UserFoodLog
 */
public class CreateUserFoodLogRequest {
    private String userId;
    private String foodId;
    private String foodName;
    private String mealType; // "BREAKFAST", "LUNCH", "DINNER", "SNACK"
    private Double quantity;
    private String unit; // "GRAMS", "CUPS", "PIECES", "ML", etc.
    
    // Optional nutritional information (will be calculated if not provided)
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fats;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    
    // Timing (optional, defaults to now)
    private String consumedAt;
    
    // Additional metadata
    private String barcode;
    private String notes;
    private String imageUrl;
    private Boolean isHomemade;
    private String brand;

    // Constructors
    public CreateUserFoodLogRequest() {}

    // Getters and Setters
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

    public String getConsumedAt() { return consumedAt; }
    public void setConsumedAt(String consumedAt) { this.consumedAt = consumedAt; }

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
}

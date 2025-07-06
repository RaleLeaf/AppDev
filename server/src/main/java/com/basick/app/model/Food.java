package com.basick.app.model;

import java.util.Map;

import com.google.cloud.Timestamp;

public class Food {
    private String id;
    private String name;
    private String brand;
    private String barcode; // UPC/EAN barcode for scanning
    private String category; // "FRUITS", "VEGETABLES", "PROTEINS", "GRAINS", etc.
    private String subcategory;
    
    // Nutritional information per 100g
    private Double caloriesPer100g;
    private Double proteinPer100g;
    private Double carbsPer100g;
    private Double fatsPer100g;
    private Double fiberPer100g;
    private Double sugarPer100g;
    private Double sodiumPer100g;
    
    // Micronutrients per 100g
    private Map<String, Double> vitaminsPer100g;
    private Map<String, Double> mineralsPer100g;
    
    // Common serving sizes
    private Map<String, Double> servingSizes; // e.g., {"1 cup": 240, "1 medium": 150}
    
    // Food metadata
    private String imageUrl;
    private String description;
    private Boolean isVerified; // Verified by nutritionist
    private Boolean isUserSubmitted;
    private String submittedBy; // User ID who submitted
    private Integer usageCount; // How many times this food has been logged
    
    // Dietary tags
    private Boolean isVegan;
    private Boolean isVegetarian;
    private Boolean isGlutenFree;
    private Boolean isDairyFree;
    private Boolean isKeto;
    private Boolean isPaleo;
    private Boolean isOrganic;
    
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Food() {
        this.isVerified = false;
        this.isUserSubmitted = false;
        this.usageCount = 0;
        this.isVegan = false;
        this.isVegetarian = false;
        this.isGlutenFree = false;
        this.isDairyFree = false;
        this.isKeto = false;
        this.isPaleo = false;
        this.isOrganic = false;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Food(String name, String brand, Double caloriesPer100g) {
        this();
        this.name = name;
        this.brand = brand;
        this.caloriesPer100g = caloriesPer100g;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
    public Double getCaloriesPer100g() { return caloriesPer100g; }
    public void setCaloriesPer100g(Double caloriesPer100g) { this.caloriesPer100g = caloriesPer100g; }
    public Double getProteinPer100g() { return proteinPer100g; }
    public void setProteinPer100g(Double proteinPer100g) { this.proteinPer100g = proteinPer100g; }
    public Double getCarbsPer100g() { return carbsPer100g; }
    public void setCarbsPer100g(Double carbsPer100g) { this.carbsPer100g = carbsPer100g; }
    public Double getFatsPer100g() { return fatsPer100g; }
    public void setFatsPer100g(Double fatsPer100g) { this.fatsPer100g = fatsPer100g; }
    public Double getFiberPer100g() { return fiberPer100g; }
    public void setFiberPer100g(Double fiberPer100g) { this.fiberPer100g = fiberPer100g; }
    public Double getSugarPer100g() { return sugarPer100g; }
    public void setSugarPer100g(Double sugarPer100g) { this.sugarPer100g = sugarPer100g; }
    public Double getSodiumPer100g() { return sodiumPer100g; }
    public void setSodiumPer100g(Double sodiumPer100g) { this.sodiumPer100g = sodiumPer100g; }
    public Map<String, Double> getVitaminsPer100g() { return vitaminsPer100g; }
    public void setVitaminsPer100g(Map<String, Double> vitaminsPer100g) { this.vitaminsPer100g = vitaminsPer100g; }
    public Map<String, Double> getMineralsPer100g() { return mineralsPer100g; }
    public void setMineralsPer100g(Map<String, Double> mineralsPer100g) { this.mineralsPer100g = mineralsPer100g; }
    public Map<String, Double> getServingSizes() { return servingSizes; }
    public void setServingSizes(Map<String, Double> servingSizes) { this.servingSizes = servingSizes; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    public Boolean getIsUserSubmitted() { return isUserSubmitted; }
    public void setIsUserSubmitted(Boolean isUserSubmitted) { this.isUserSubmitted = isUserSubmitted; }
    public String getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(String submittedBy) { this.submittedBy = submittedBy; }
    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
    public Boolean getIsVegan() { return isVegan; }
    public void setIsVegan(Boolean isVegan) { this.isVegan = isVegan; }
    public Boolean getIsVegetarian() { return isVegetarian; }
    public void setIsVegetarian(Boolean isVegetarian) { this.isVegetarian = isVegetarian; }
    public Boolean getIsGlutenFree() { return isGlutenFree; }
    public void setIsGlutenFree(Boolean isGlutenFree) { this.isGlutenFree = isGlutenFree; }
    public Boolean getIsDairyFree() { return isDairyFree; }
    public void setIsDairyFree(Boolean isDairyFree) { this.isDairyFree = isDairyFree; }
    public Boolean getIsKeto() { return isKeto; }
    public void setIsKeto(Boolean isKeto) { this.isKeto = isKeto; }
    public Boolean getIsPaleo() { return isPaleo; }
    public void setIsPaleo(Boolean isPaleo) { this.isPaleo = isPaleo; }
    public Boolean getIsOrganic() { return isOrganic; }
    public void setIsOrganic(Boolean isOrganic) { this.isOrganic = isOrganic; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void incrementUsageCount() {
        this.usageCount = (this.usageCount != null) ? this.usageCount + 1 : 1;
        this.updateTimestamp();
    }

    public void verify() {
        this.isVerified = true;
        this.updateTimestamp();
    }

    /**
     * Calculate nutritional values for a specific serving size
     */
    public NutritionInfo calculateForQuantity(Double quantity, String unit) {
        if (quantity == null || quantity <= 0) {
            return new NutritionInfo();
        }

        // Convert to per 100g basis
        Double multiplier = calculateMultiplier(quantity, unit);
        
        NutritionInfo info = new NutritionInfo();
        info.calories = this.caloriesPer100g != null ? this.caloriesPer100g * multiplier : 0.0;
        info.protein = this.proteinPer100g != null ? this.proteinPer100g * multiplier : 0.0;
        info.carbs = this.carbsPer100g != null ? this.carbsPer100g * multiplier : 0.0;
        info.fats = this.fatsPer100g != null ? this.fatsPer100g * multiplier : 0.0;
        info.fiber = this.fiberPer100g != null ? this.fiberPer100g * multiplier : 0.0;
        info.sugar = this.sugarPer100g != null ? this.sugarPer100g * multiplier : 0.0;
        info.sodium = this.sodiumPer100g != null ? this.sodiumPer100g * multiplier : 0.0;
        
        return info;
    }

    private Double calculateMultiplier(Double quantity, String unit) {
        if (unit == null) {
            return quantity / 100.0; // Assume grams
        }
        
        switch (unit.toUpperCase()) {
            case "GRAMS":
            case "G":
                return quantity / 100.0;
            case "KG":
            case "KILOGRAMS":
                return quantity * 10.0; // 1kg = 1000g = 10 * 100g
            case "OZ":
            case "OUNCES":
                return (quantity * 28.35) / 100.0; // 1oz = 28.35g
            case "LB":
            case "POUNDS":
                return (quantity * 453.59) / 100.0; // 1lb = 453.59g
            default:
                // Try to find in serving sizes
                if (this.servingSizes != null && this.servingSizes.containsKey(unit)) {
                    Double gramsPerServing = this.servingSizes.get(unit);
                    return (quantity * gramsPerServing) / 100.0;
                }
                // Default to grams
                return quantity / 100.0;
        }
    }

    // Helper class for nutrition calculation
    public static class NutritionInfo {
        public Double calories = 0.0;
        public Double protein = 0.0;
        public Double carbs = 0.0;
        public Double fats = 0.0;
        public Double fiber = 0.0;
        public Double sugar = 0.0;
        public Double sodium = 0.0;
    }
}

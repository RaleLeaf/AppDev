package com.basick.app.dto.food;

import java.util.Map;

/**
 * Request DTO for creating a new Food
 */
public class CreateFoodRequest {
    private String name;
    private String brand;
    private String barcode;
    private String category;
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
    private Map<String, Double> servingSizes;
    
    // Food metadata
    private String imageUrl;
    private String description;
    private String submittedBy; // User ID who submitted
    
    // Dietary tags
    private Boolean isVegan;
    private Boolean isVegetarian;
    private Boolean isGlutenFree;
    private Boolean isDairyFree;
    private Boolean isKeto;
    private Boolean isPaleo;
    private Boolean isOrganic;

    // Constructors
    public CreateFoodRequest() {}

    // Getters and Setters
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

    public String getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(String submittedBy) { this.submittedBy = submittedBy; }

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
}

package com.basick.app.mapper;

import org.springframework.stereotype.Component;

import com.basick.app.dto.food.CreateFoodRequest;
import com.basick.app.dto.food.FoodDTO;
import com.basick.app.dto.food.UpdateFoodRequest;
import com.basick.app.model.Food;

@Component
public class FoodMapper {
    
    /**
     * Convert Food entity to FoodDTO
     */
    public FoodDTO toDTO(Food food) {
        if (food == null) {
            return null;
        }
        
        FoodDTO dto = new FoodDTO();
        dto.setId(food.getId());
        dto.setName(food.getName());
        dto.setBrand(food.getBrand());
        dto.setBarcode(food.getBarcode());
        dto.setCategory(food.getCategory());
        dto.setSubcategory(food.getSubcategory());
        
        // Nutritional information
        dto.setCaloriesPer100g(food.getCaloriesPer100g());
        dto.setProteinPer100g(food.getProteinPer100g());
        dto.setCarbsPer100g(food.getCarbsPer100g());
        dto.setFatsPer100g(food.getFatsPer100g());
        dto.setFiberPer100g(food.getFiberPer100g());
        dto.setSugarPer100g(food.getSugarPer100g());
        dto.setSodiumPer100g(food.getSodiumPer100g());
        
        // Micronutrients
        dto.setVitaminsPer100g(food.getVitaminsPer100g());
        dto.setMineralsPer100g(food.getMineralsPer100g());
        
        // Serving sizes
        dto.setServingSizes(food.getServingSizes());
        
        // Metadata
        dto.setImageUrl(food.getImageUrl());
        dto.setDescription(food.getDescription());
        dto.setIsVerified(food.getIsVerified());
        dto.setIsUserSubmitted(food.getIsUserSubmitted());
        dto.setSubmittedBy(food.getSubmittedBy());
        dto.setUsageCount(food.getUsageCount());
        
        // Dietary flags
        dto.setIsVegan(food.getIsVegan());
        dto.setIsVegetarian(food.getIsVegetarian());
        dto.setIsGlutenFree(food.getIsGlutenFree());
        dto.setIsDairyFree(food.getIsDairyFree());
        dto.setIsKeto(food.getIsKeto());
        dto.setIsPaleo(food.getIsPaleo());
        dto.setIsOrganic(food.getIsOrganic());
        
        // Timestamps
        dto.setCreatedAt(food.getCreatedAt() != null ? food.getCreatedAt().toString() : null);
        dto.setUpdatedAt(food.getUpdatedAt() != null ? food.getUpdatedAt().toString() : null);
        
        return dto;
    }
    
    /**
     * Convert CreateFoodRequest to Food entity
     */
    public Food toEntity(CreateFoodRequest request) {
        if (request == null) {
            return null;
        }
        
        Food food = new Food();
        food.setName(request.getName());
        food.setBrand(request.getBrand());
        food.setBarcode(request.getBarcode());
        food.setCategory(request.getCategory());
        food.setSubcategory(request.getSubcategory());
        
        // Nutritional information
        food.setCaloriesPer100g(request.getCaloriesPer100g());
        food.setProteinPer100g(request.getProteinPer100g());
        food.setCarbsPer100g(request.getCarbsPer100g());
        food.setFatsPer100g(request.getFatsPer100g());
        food.setFiberPer100g(request.getFiberPer100g());
        food.setSugarPer100g(request.getSugarPer100g());
        food.setSodiumPer100g(request.getSodiumPer100g());
        
        // Micronutrients
        food.setVitaminsPer100g(request.getVitaminsPer100g());
        food.setMineralsPer100g(request.getMineralsPer100g());
        
        // Serving sizes
        food.setServingSizes(request.getServingSizes());
        
        // Metadata
        food.setImageUrl(request.getImageUrl());
        food.setDescription(request.getDescription());
        food.setSubmittedBy(request.getSubmittedBy());
        food.setIsUserSubmitted(request.getSubmittedBy() != null);
        
        // Dietary flags
        food.setIsVegan(request.getIsVegan());
        food.setIsVegetarian(request.getIsVegetarian());
        food.setIsGlutenFree(request.getIsGlutenFree());
        food.setIsDairyFree(request.getIsDairyFree());
        food.setIsKeto(request.getIsKeto());
        food.setIsPaleo(request.getIsPaleo());
        food.setIsOrganic(request.getIsOrganic());
        
        return food;
    }
    
    /**
     * Update Food entity from UpdateFoodRequest
     */
    public void updateEntityFromRequest(Food food, UpdateFoodRequest request) {
        if (food == null || request == null) {
            return;
        }
        
        if (request.getName() != null) {
            food.setName(request.getName());
        }
        if (request.getBrand() != null) {
            food.setBrand(request.getBrand());
        }
        if (request.getBarcode() != null) {
            food.setBarcode(request.getBarcode());
        }
        if (request.getCategory() != null) {
            food.setCategory(request.getCategory());
        }
        if (request.getSubcategory() != null) {
            food.setSubcategory(request.getSubcategory());
        }
        
        // Nutritional information
        if (request.getCaloriesPer100g() != null) {
            food.setCaloriesPer100g(request.getCaloriesPer100g());
        }
        if (request.getProteinPer100g() != null) {
            food.setProteinPer100g(request.getProteinPer100g());
        }
        if (request.getCarbsPer100g() != null) {
            food.setCarbsPer100g(request.getCarbsPer100g());
        }
        if (request.getFatsPer100g() != null) {
            food.setFatsPer100g(request.getFatsPer100g());
        }
        if (request.getFiberPer100g() != null) {
            food.setFiberPer100g(request.getFiberPer100g());
        }
        if (request.getSugarPer100g() != null) {
            food.setSugarPer100g(request.getSugarPer100g());
        }
        if (request.getSodiumPer100g() != null) {
            food.setSodiumPer100g(request.getSodiumPer100g());
        }
        
        // Micronutrients
        if (request.getVitaminsPer100g() != null) {
            food.setVitaminsPer100g(request.getVitaminsPer100g());
        }
        if (request.getMineralsPer100g() != null) {
            food.setMineralsPer100g(request.getMineralsPer100g());
        }
        
        // Serving sizes
        if (request.getServingSizes() != null) {
            food.setServingSizes(request.getServingSizes());
        }
        
        // Metadata
        if (request.getImageUrl() != null) {
            food.setImageUrl(request.getImageUrl());
        }
        if (request.getDescription() != null) {
            food.setDescription(request.getDescription());
        }
        
        // Dietary flags
        if (request.getIsVegan() != null) {
            food.setIsVegan(request.getIsVegan());
        }
        if (request.getIsVegetarian() != null) {
            food.setIsVegetarian(request.getIsVegetarian());
        }
        if (request.getIsGlutenFree() != null) {
            food.setIsGlutenFree(request.getIsGlutenFree());
        }
        if (request.getIsDairyFree() != null) {
            food.setIsDairyFree(request.getIsDairyFree());
        }
        if (request.getIsKeto() != null) {
            food.setIsKeto(request.getIsKeto());
        }
        if (request.getIsPaleo() != null) {
            food.setIsPaleo(request.getIsPaleo());
        }
        if (request.getIsOrganic() != null) {
            food.setIsOrganic(request.getIsOrganic());
        }
        
        food.updateTimestamp();
    }
}

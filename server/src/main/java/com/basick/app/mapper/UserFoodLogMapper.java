package com.basick.app.mapper;

import org.springframework.stereotype.Component;

import com.basick.app.dto.userfoodlog.CreateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UpdateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UserFoodLogDTO;
import com.basick.app.model.UserFoodLog;
import com.google.cloud.Timestamp;

@Component
public class UserFoodLogMapper {
    
    /**
     * Convert UserFoodLog entity to UserFoodLogDTO
     */
    public UserFoodLogDTO toDTO(UserFoodLog userFoodLog) {
        if (userFoodLog == null) {
            return null;
        }
        
        UserFoodLogDTO dto = new UserFoodLogDTO();
        dto.setId(userFoodLog.getId());
        dto.setUserId(userFoodLog.getUserId());
        dto.setFoodId(userFoodLog.getFoodId());
        dto.setFoodName(userFoodLog.getFoodName());
        dto.setMealType(userFoodLog.getMealType());
        dto.setQuantity(userFoodLog.getQuantity());
        dto.setUnit(userFoodLog.getUnit());
        
        // Nutritional information
        dto.setCalories(userFoodLog.getCalories());
        dto.setProtein(userFoodLog.getProtein());
        dto.setCarbs(userFoodLog.getCarbs());
        dto.setFats(userFoodLog.getFats());
        dto.setFiber(userFoodLog.getFiber());
        dto.setSugar(userFoodLog.getSugar());
        dto.setSodium(userFoodLog.getSodium());
        
        // Timing
        dto.setConsumedAt(userFoodLog.getConsumedAt() != null ? userFoodLog.getConsumedAt().toString() : null);
        dto.setLoggedAt(userFoodLog.getLoggedAt() != null ? userFoodLog.getLoggedAt().toString() : null);
        
        // Additional metadata
        dto.setBarcode(userFoodLog.getBarcode());
        dto.setNotes(userFoodLog.getNotes());
        dto.setImageUrl(userFoodLog.getImageUrl());
        dto.setIsHomemade(userFoodLog.getIsHomemade());
        dto.setBrand(userFoodLog.getBrand());
        
        // Timestamps
        dto.setCreatedAt(userFoodLog.getCreatedAt() != null ? userFoodLog.getCreatedAt().toString() : null);
        dto.setUpdatedAt(userFoodLog.getUpdatedAt() != null ? userFoodLog.getUpdatedAt().toString() : null);
        
        return dto;
    }
    
    /**
     * Convert CreateUserFoodLogRequest to UserFoodLog entity
     */
    public UserFoodLog toEntity(CreateUserFoodLogRequest request) {
        if (request == null) {
            return null;
        }
        
        UserFoodLog userFoodLog = new UserFoodLog();
        userFoodLog.setUserId(request.getUserId());
        userFoodLog.setFoodId(request.getFoodId());
        userFoodLog.setFoodName(request.getFoodName());
        userFoodLog.setMealType(request.getMealType());
        userFoodLog.setQuantity(request.getQuantity());
        userFoodLog.setUnit(request.getUnit());
        
        // Nutritional information
        userFoodLog.setCalories(request.getCalories());
        userFoodLog.setProtein(request.getProtein());
        userFoodLog.setCarbs(request.getCarbs());
        userFoodLog.setFats(request.getFats());
        userFoodLog.setFiber(request.getFiber());
        userFoodLog.setSugar(request.getSugar());
        userFoodLog.setSodium(request.getSodium());
        
        // Timing
        if (request.getConsumedAt() != null) {
            try {
                userFoodLog.setConsumedAt(Timestamp.parseTimestamp(request.getConsumedAt()));
            } catch (Exception e) {
                // If parsing fails, use current time
                userFoodLog.setConsumedAt(Timestamp.now());
            }
        }
        
        // Additional metadata
        userFoodLog.setBarcode(request.getBarcode());
        userFoodLog.setNotes(request.getNotes());
        userFoodLog.setImageUrl(request.getImageUrl());
        userFoodLog.setIsHomemade(request.getIsHomemade());
        userFoodLog.setBrand(request.getBrand());
        
        return userFoodLog;
    }
    
    /**
     * Update UserFoodLog entity from UpdateUserFoodLogRequest
     */
    public void updateEntityFromRequest(UserFoodLog userFoodLog, UpdateUserFoodLogRequest request) {
        if (userFoodLog == null || request == null) {
            return;
        }
        
        if (request.getFoodId() != null) {
            userFoodLog.setFoodId(request.getFoodId());
        }
        if (request.getFoodName() != null) {
            userFoodLog.setFoodName(request.getFoodName());
        }
        if (request.getMealType() != null) {
            userFoodLog.setMealType(request.getMealType());
        }
        if (request.getQuantity() != null) {
            userFoodLog.setQuantity(request.getQuantity());
        }
        if (request.getUnit() != null) {
            userFoodLog.setUnit(request.getUnit());
        }
        
        // Nutritional information
        if (request.getCalories() != null) {
            userFoodLog.setCalories(request.getCalories());
        }
        if (request.getProtein() != null) {
            userFoodLog.setProtein(request.getProtein());
        }
        if (request.getCarbs() != null) {
            userFoodLog.setCarbs(request.getCarbs());
        }
        if (request.getFats() != null) {
            userFoodLog.setFats(request.getFats());
        }
        if (request.getFiber() != null) {
            userFoodLog.setFiber(request.getFiber());
        }
        if (request.getSugar() != null) {
            userFoodLog.setSugar(request.getSugar());
        }
        if (request.getSodium() != null) {
            userFoodLog.setSodium(request.getSodium());
        }
        
        // Timing
        if (request.getConsumedAt() != null) {
            try {
                userFoodLog.setConsumedAt(Timestamp.parseTimestamp(request.getConsumedAt()));
            } catch (Exception e) {
                // If parsing fails, keep existing value or use current time
                if (userFoodLog.getConsumedAt() == null) {
                    userFoodLog.setConsumedAt(Timestamp.now());
                }
            }
        }
        
        // Additional metadata
        if (request.getBarcode() != null) {
            userFoodLog.setBarcode(request.getBarcode());
        }
        if (request.getNotes() != null) {
            userFoodLog.setNotes(request.getNotes());
        }
        if (request.getImageUrl() != null) {
            userFoodLog.setImageUrl(request.getImageUrl());
        }
        if (request.getIsHomemade() != null) {
            userFoodLog.setIsHomemade(request.getIsHomemade());
        }
        if (request.getBrand() != null) {
            userFoodLog.setBrand(request.getBrand());
        }
        
        userFoodLog.updateTimestamp();
    }
}

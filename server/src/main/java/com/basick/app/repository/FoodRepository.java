package com.basick.app.repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Food;
import com.basick.app.service.FirestoreService;

/**
 * Repository class for Food CRUD operations with Firestore
 */
@Repository
public class FoodRepository {

    private static final String COLLECTION_NAME = "foods";
    
    private final FirestoreService firestoreService;

    public FoodRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a new food
     */
    public Food save(Food food) {
        try {
            String id = UUID.randomUUID().toString();
            food.setId(id);
            firestoreService.saveWithId(COLLECTION_NAME, id, food);
            return food;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error saving food", e);
        }
    }

    /**
     * Update an existing food
     */
    public Food update(Food food) {
        try {
            firestoreService.saveWithId(COLLECTION_NAME, food.getId(), food);
            return food;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating food", e);
        }
    }

    /**
     * Find food by ID
     */
    public Food findById(String foodId) {
        try {
            return firestoreService.findById(COLLECTION_NAME, foodId, Food.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food by ID", e);
        }
    }

    /**
     * Delete food by ID
     */
    public boolean delete(String foodId) {
        try {
            firestoreService.delete(COLLECTION_NAME, foodId);
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting food", e);
        }
    }

    /**
     * Find all foods
     */
    public List<Food> findAll() {
        try {
            return firestoreService.findAll(COLLECTION_NAME, Food.class);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding all foods", e);
        }
    }

    /**
     * Search foods by name
     */
    public List<Food> searchByName(String query, int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> food.getName() != null && 
                           food.getName().toLowerCase().contains(query.toLowerCase()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error searching foods by name", e);
        }
    }

    /**
     * Find food by barcode
     */
    public Food findByBarcode(String barcode) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> barcode.equals(food.getBarcode()))
                    .findFirst()
                    .orElse(null);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding food by barcode", e);
        }
    }

    /**
     * Find foods by category
     */
    public List<Food> findByCategory(String category, int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> category.equalsIgnoreCase(food.getCategory()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding foods by category", e);
        }
    }

    /**
     * Find popular foods (most used)
     */
    public List<Food> findPopularFoods(int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> food.getUsageCount() != null)
                    .sorted((f1, f2) -> Integer.compare(f2.getUsageCount(), f1.getUsageCount()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding popular foods", e);
        }
    }

    /**
     * Find recently added foods
     */
    public List<Food> findRecentFoods(int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> food.getCreatedAt() != null)
                    .sorted((f1, f2) -> f2.getCreatedAt().compareTo(f1.getCreatedAt()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding recent foods", e);
        }
    }

    /**
     * Find verified foods
     */
    public List<Food> findVerifiedFoods(int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> Boolean.TRUE.equals(food.getIsVerified()))
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding verified foods", e);
        }
    }

    /**
     * Find foods by dietary restrictions
     */
    public List<Food> findByDietaryRestrictions(String restriction, int limit) {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .filter(food -> {
                        switch (restriction.toLowerCase()) {
                            case "vegan":
                                return Boolean.TRUE.equals(food.getIsVegan());
                            case "vegetarian":
                                return Boolean.TRUE.equals(food.getIsVegetarian());
                            case "gluten-free":
                                return Boolean.TRUE.equals(food.getIsGlutenFree());
                            case "dairy-free":
                                return Boolean.TRUE.equals(food.getIsDairyFree());
                            case "keto":
                                return Boolean.TRUE.equals(food.getIsKeto());
                            case "paleo":
                                return Boolean.TRUE.equals(food.getIsPaleo());
                            case "organic":
                                return Boolean.TRUE.equals(food.getIsOrganic());
                            default:
                                return false;
                        }
                    })
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error finding foods by dietary restrictions", e);
        }
    }    /**
     * Get all existing food names (for duplicate checking during import)
     */
    public Set<String> getAllFoodNames() {
        try {
            List<Food> allFoods = firestoreService.findAll(COLLECTION_NAME, Food.class);
            return allFoods.stream()
                    .map(Food::getName)
                    .filter(name -> name != null)
                    .map(name -> name.toLowerCase().trim())
                    .collect(Collectors.toSet());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting food names", e);
        }
    }

    /**
     * Check if a food with the given name already exists
     */
    public boolean existsByName(String name) {
        if (name == null) return false;
        String normalizedName = name.toLowerCase().trim();
        return getAllFoodNames().contains(normalizedName);
    }
}

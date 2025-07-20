package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.food.CreateFoodRequest;
import com.basick.app.dto.food.FoodDTO;
import com.basick.app.dto.food.UpdateFoodRequest;
import com.basick.app.service.FoodService;
import com.basick.app.service.FoodDataImportService;

/**
 * REST Controller for Food management
 */
@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private final FoodService foodService;
    private final FoodDataImportService foodDataImportService;

    public FoodController(FoodService foodService, FoodDataImportService foodDataImportService) {
        this.foodService = foodService;
        this.foodDataImportService = foodDataImportService;
    }

    /**
     * Create a new food entry
     */
    @PostMapping
    public ResponseEntity<FoodDTO> createFood(@RequestBody CreateFoodRequest request) {
        try {
            FoodDTO createdFood = foodService.createFood(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get all foods
     */
    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        try {
            List<FoodDTO> foods = foodService.getAllFoods();
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Get food by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable String id) {
        try {
            FoodDTO food = foodService.getFoodById(id);
            if (food != null) {
                return ResponseEntity.ok(food);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update food information
     */
    @PutMapping("/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable String id, @RequestBody UpdateFoodRequest request) {
        try {
            FoodDTO updatedFood = foodService.updateFood(id, request);
            if (updatedFood != null) {
                return ResponseEntity.ok(updatedFood);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete food
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable String id) {
        try {
            boolean deleted = foodService.deleteFood(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search foods by name
     */
    @GetMapping("/search")
    public ResponseEntity<List<FoodDTO>> searchFoods(@RequestParam String query, 
                                                    @RequestParam(defaultValue = "20") int limit) {
        try {
            List<FoodDTO> foods = foodService.searchFoodsByName(query, limit);
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get food by barcode
     */
    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<FoodDTO> getFoodByBarcode(@PathVariable String barcode) {
        try {
            FoodDTO food = foodService.getFoodByBarcode(barcode);
            if (food != null) {
                return ResponseEntity.ok(food);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get foods by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<FoodDTO>> getFoodsByCategory(@PathVariable String category,
                                                           @RequestParam(defaultValue = "50") int limit) {
        try {
            List<FoodDTO> foods = foodService.getFoodsByCategory(category, limit);
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get popular foods (most used)
     */
    @GetMapping("/popular")
    public ResponseEntity<List<FoodDTO>> getPopularFoods(@RequestParam(defaultValue = "20") int limit) {
        try {
            List<FoodDTO> foods = foodService.getPopularFoods(limit);
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get recently added foods
     */
    @GetMapping("/recent")
    public ResponseEntity<List<FoodDTO>> getRecentFoods(@RequestParam(defaultValue = "20") int limit) {
        try {
            List<FoodDTO> foods = foodService.getRecentFoods(limit);
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }    /**
     * Verify a food entry (admin only)
     */
    @PostMapping("/{id}/verify")
    public ResponseEntity<FoodDTO> verifyFood(@PathVariable String id) {
        try {
            FoodDTO verifiedFood = foodService.verifyFood(id);
            if (verifiedFood != null) {
                return ResponseEntity.ok(verifiedFood);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }    /**
     * Import food data from CSV file
     */
    @PostMapping("/import")
    public ResponseEntity<String> importFoodData(@RequestParam String csvFilePath) {
        try {
            FoodDataImportService.ImportResult result = foodDataImportService.importFoodDataFromCsv(csvFilePath);
            return ResponseEntity.ok(result.getSummary());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Import failed: " + e.getMessage());
        }
    }

    /**
     * Import food data from the default CSV file
     */
    @PostMapping("/import/dataset")
    public ResponseEntity<String> importDataset() {
        try {
            // Use the provided CSV file path
            String csvFilePath = "c:\\Users\\User\\OneDrive\\Desktop\\Desktop\\AppDev\\client\\datas\\FOOD-DATA-GROUP1.csv";
            FoodDataImportService.ImportResult result = foodDataImportService.importFoodDataFromCsv(csvFilePath);
            return ResponseEntity.ok(result.getSummary());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Import failed: " + e.getMessage());
        }
    }
}

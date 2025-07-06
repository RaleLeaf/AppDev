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

import com.basick.app.dto.userfoodlog.CreateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UpdateUserFoodLogRequest;
import com.basick.app.dto.userfoodlog.UserFoodLogDTO;
import com.basick.app.service.UserFoodLogService;

/**
 * REST Controller for User Food Log management
 */
@RestController
@RequestMapping("/api/food-logs")
public class UserFoodLogController {

    private final UserFoodLogService userFoodLogService;

    public UserFoodLogController(UserFoodLogService userFoodLogService) {
        this.userFoodLogService = userFoodLogService;
    }

    /**
     * Create a new food log entry
     */
    @PostMapping
    public ResponseEntity<UserFoodLogDTO> createFoodLog(@RequestBody CreateUserFoodLogRequest request) {
        try {
            UserFoodLogDTO createdLog = userFoodLogService.createFoodLog(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdLog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get food log by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserFoodLogDTO> getFoodLogById(@PathVariable String id) {
        try {
            UserFoodLogDTO foodLog = userFoodLogService.getFoodLogById(id);
            if (foodLog != null) {
                return ResponseEntity.ok(foodLog);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update food log entry
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserFoodLogDTO> updateFoodLog(@PathVariable String id, @RequestBody UpdateUserFoodLogRequest request) {
        try {
            UserFoodLogDTO updatedLog = userFoodLogService.updateFoodLog(id, request);
            if (updatedLog != null) {
                return ResponseEntity.ok(updatedLog);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete food log entry
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodLog(@PathVariable String id) {
        try {
            boolean deleted = userFoodLogService.deleteFoodLog(id);
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
     * Get all food logs for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFoodLogDTO>> getUserFoodLogs(@PathVariable String userId,
                                                               @RequestParam(defaultValue = "100") int limit) {
        try {
            List<UserFoodLogDTO> foodLogs = userFoodLogService.getUserFoodLogs(userId, limit);
            return ResponseEntity.ok(foodLogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get food logs for a specific date
     */
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<List<UserFoodLogDTO>> getUserFoodLogsByDate(@PathVariable String userId, 
                                                                     @PathVariable String date) {
        try {
            List<UserFoodLogDTO> foodLogs = userFoodLogService.getUserFoodLogsByDate(userId, date);
            return ResponseEntity.ok(foodLogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get food logs by meal type for a specific date
     */
    @GetMapping("/user/{userId}/date/{date}/meal/{mealType}")
    public ResponseEntity<List<UserFoodLogDTO>> getUserFoodLogsByDateAndMeal(@PathVariable String userId,
                                                                            @PathVariable String date,
                                                                            @PathVariable String mealType) {
        try {
            List<UserFoodLogDTO> foodLogs = userFoodLogService.getUserFoodLogsByDateAndMeal(userId, date, mealType);
            return ResponseEntity.ok(foodLogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get recent food logs for a user
     */
    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<UserFoodLogDTO>> getRecentUserFoodLogs(@PathVariable String userId,
                                                                     @RequestParam(defaultValue = "20") int limit) {
        try {
            List<UserFoodLogDTO> foodLogs = userFoodLogService.getRecentUserFoodLogs(userId, limit);
            return ResponseEntity.ok(foodLogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get frequently consumed foods by user
     */
    @GetMapping("/user/{userId}/frequent")
    public ResponseEntity<List<UserFoodLogDTO>> getFrequentlyConsumedFoods(@PathVariable String userId,
                                                                          @RequestParam(defaultValue = "10") int limit) {
        try {
            List<UserFoodLogDTO> foodLogs = userFoodLogService.getFrequentlyConsumedFoods(userId, limit);
            return ResponseEntity.ok(foodLogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

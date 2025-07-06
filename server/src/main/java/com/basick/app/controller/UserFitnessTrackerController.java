package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basick.app.dto.userfitnesstracker.CreateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UpdateUserFitnessTrackerRequest;
import com.basick.app.dto.userfitnesstracker.UserFitnessSummaryDTO;
import com.basick.app.dto.userfitnesstracker.UserFitnessTrackerDTO;
import com.basick.app.service.UserFitnessTrackerService;

@RestController
@RequestMapping("/api/user-fitness-tracker")
public class UserFitnessTrackerController {

    private final UserFitnessTrackerService userFitnessTrackerService;

    public UserFitnessTrackerController(UserFitnessTrackerService userFitnessTrackerService) {
        this.userFitnessTrackerService = userFitnessTrackerService;
    }

    /**
     * Get fitness tracker data for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFitnessTrackerDTO>> getFitnessTrackerByUser(@PathVariable String userId) {
        List<UserFitnessTrackerDTO> trackerData = userFitnessTrackerService.getFitnessTrackerByUser(userId);
        return ResponseEntity.ok(trackerData);
    }

    /**
     * Get fitness tracker data by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserFitnessTrackerDTO> getFitnessTrackerById(@PathVariable String id) {
        UserFitnessTrackerDTO trackerData = userFitnessTrackerService.getFitnessTrackerById(id);
        if (trackerData != null) {
            return ResponseEntity.ok(trackerData);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Create new fitness tracker entry
     */
    @PostMapping
    public ResponseEntity<UserFitnessTrackerDTO> createFitnessTracker(@RequestBody CreateUserFitnessTrackerRequest request) {
        try {
            UserFitnessTrackerDTO createdTracker = userFitnessTrackerService.createFitnessTracker(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTracker);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update fitness tracker entry
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserFitnessTrackerDTO> updateFitnessTracker(
            @PathVariable String id,
            @RequestBody UpdateUserFitnessTrackerRequest request) {
        try {
            UserFitnessTrackerDTO updatedTracker = userFitnessTrackerService.updateFitnessTracker(id, request);
            if (updatedTracker != null) {
                return ResponseEntity.ok(updatedTracker);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete fitness tracker entry
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFitnessTracker(@PathVariable String id) {
        boolean deleted = userFitnessTrackerService.deleteFitnessTracker(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Get fitness tracker data within a date range for a user
     */
    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<UserFitnessTrackerDTO>> getFitnessTrackerByDateRange(
            @PathVariable String userId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            List<UserFitnessTrackerDTO> trackerData = userFitnessTrackerService.getFitnessTrackerByDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(trackerData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get latest fitness tracker entry for a user
     */
    @GetMapping("/user/{userId}/latest")
    public ResponseEntity<UserFitnessTrackerDTO> getLatestFitnessTracker(@PathVariable String userId) {
        UserFitnessTrackerDTO latestTracker = userFitnessTrackerService.getLatestFitnessTracker(userId);
        if (latestTracker != null) {
            return ResponseEntity.ok(latestTracker);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Get fitness summary for a user
     */
    @GetMapping("/user/{userId}/summary")
    public ResponseEntity<UserFitnessSummaryDTO> getUserFitnessSummary(@PathVariable String userId) {
        UserFitnessSummaryDTO summary = userFitnessTrackerService.getUserFitnessSummary(userId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Update daily calories consumed
     */
    @PatchMapping("/{id}/calories-consumed")
    public ResponseEntity<UserFitnessTrackerDTO> updateCaloriesConsumed(
            @PathVariable String id,
            @RequestBody Double caloriesConsumed) {
        try {
            UserFitnessTrackerDTO updatedTracker = userFitnessTrackerService.updateCaloriesConsumed(id, caloriesConsumed);
            if (updatedTracker != null) {
                return ResponseEntity.ok(updatedTracker);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Add workout calories to daily total
     */
    @PatchMapping("/{id}/add-workout-calories")
    public ResponseEntity<UserFitnessTrackerDTO> addWorkoutCalories(
            @PathVariable String id,
            @RequestBody Double calories) {
        try {
            UserFitnessTrackerDTO updatedTracker = userFitnessTrackerService.addWorkoutCalories(id, calories);
            if (updatedTracker != null) {
                return ResponseEntity.ok(updatedTracker);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

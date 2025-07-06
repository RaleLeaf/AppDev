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

import com.basick.app.dto.userfinishedworkout.CreateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UpdateUserFinishedWorkoutRequest;
import com.basick.app.dto.userfinishedworkout.UserFinishedWorkoutDTO;
import com.basick.app.dto.userfinishedworkout.UserWorkoutStatsDTO;
import com.basick.app.service.UserFinishedWorkoutService;

@RestController
@RequestMapping("/api/user-finished-workouts")
public class UserFinishedWorkoutController {

    private final UserFinishedWorkoutService userFinishedWorkoutService;

    public UserFinishedWorkoutController(UserFinishedWorkoutService userFinishedWorkoutService) {
        this.userFinishedWorkoutService = userFinishedWorkoutService;
    }

    /**
     * Get all finished workouts for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFinishedWorkoutDTO>> getFinishedWorkoutsByUser(@PathVariable String userId) {
        List<UserFinishedWorkoutDTO> finishedWorkouts = userFinishedWorkoutService.getFinishedWorkoutsByUser(userId);
        return ResponseEntity.ok(finishedWorkouts);
    }

    /**
     * Get finished workout by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserFinishedWorkoutDTO> getFinishedWorkoutById(@PathVariable String id) {
        UserFinishedWorkoutDTO finishedWorkout = userFinishedWorkoutService.getFinishedWorkoutById(id);
        if (finishedWorkout != null) {
            return ResponseEntity.ok(finishedWorkout);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Record a new finished workout
     */
    @PostMapping
    public ResponseEntity<UserFinishedWorkoutDTO> recordFinishedWorkout(@RequestBody CreateUserFinishedWorkoutRequest request) {
        try {
            UserFinishedWorkoutDTO createdFinishedWorkout = userFinishedWorkoutService.recordFinishedWorkout(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFinishedWorkout);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Update a finished workout record
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserFinishedWorkoutDTO> updateFinishedWorkout(
            @PathVariable String id, 
            @RequestBody UpdateUserFinishedWorkoutRequest request) {
        try {
            UserFinishedWorkoutDTO updatedFinishedWorkout = userFinishedWorkoutService.updateFinishedWorkout(id, request);
            if (updatedFinishedWorkout != null) {
                return ResponseEntity.ok(updatedFinishedWorkout);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Delete a finished workout record
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinishedWorkout(@PathVariable String id) {
        boolean deleted = userFinishedWorkoutService.deleteFinishedWorkout(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Get finished workouts by workout ID
     */
    @GetMapping("/workout/{workoutId}")
    public ResponseEntity<List<UserFinishedWorkoutDTO>> getFinishedWorkoutsByWorkoutId(@PathVariable String workoutId) {
        List<UserFinishedWorkoutDTO> finishedWorkouts = userFinishedWorkoutService.getFinishedWorkoutsByWorkoutId(workoutId);
        return ResponseEntity.ok(finishedWorkouts);
    }

    /**
     * Get finished workouts within a date range for a user
     */
    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<UserFinishedWorkoutDTO>> getFinishedWorkoutsByDateRange(
            @PathVariable String userId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            List<UserFinishedWorkoutDTO> finishedWorkouts = userFinishedWorkoutService.getFinishedWorkoutsByDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(finishedWorkouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get workout statistics for a user
     */
    @GetMapping("/user/{userId}/statistics")
    public ResponseEntity<UserWorkoutStatsDTO> getUserWorkoutStatistics(@PathVariable String userId) {
        UserWorkoutStatsDTO stats = userFinishedWorkoutService.getUserWorkoutStatistics(userId);
        return ResponseEntity.ok(stats);
    }
}
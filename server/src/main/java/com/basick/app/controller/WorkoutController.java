package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.workout.*;
import com.basick.app.service.WorkoutService;

/**
 * REST controller for Workout operations
 */
@RestController
@RequestMapping("/api/workouts")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    /**
     * Get all workouts
     */
    @GetMapping
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts() {
        try {
            List<WorkoutDTO> workouts = workoutService.getAllWorkouts();
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get workout by ID
     */
    @GetMapping("/{workoutId}")
    public ResponseEntity<WorkoutDTO> getWorkoutById(@PathVariable String workoutId) {
        try {
            WorkoutDTO workout = workoutService.getWorkoutById(workoutId);
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new workout
     */
    @PostMapping
    public ResponseEntity<WorkoutDTO> createWorkout(@RequestBody CreateWorkoutRequest request) {
        try {
            WorkoutDTO workout = workoutService.createWorkout(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(workout);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update workout
     */
    @PutMapping("/{workoutId}")
    public ResponseEntity<WorkoutDTO> updateWorkout(
            @PathVariable String workoutId,
            @RequestBody UpdateWorkoutRequest request) {
        try {
            WorkoutDTO workout = workoutService.updateWorkout(workoutId, request);
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete workout
     */
    @DeleteMapping("/{workoutId}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable String workoutId) {
        try {
            boolean deleted = workoutService.deleteWorkout(workoutId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search workouts by name or description
     */
    @GetMapping("/search")
    public ResponseEntity<List<WorkoutDTO>> searchWorkouts(@RequestParam String query) {
        try {
            List<WorkoutDTO> workouts = workoutService.searchWorkouts(query);
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get workouts by difficulty
     */
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<WorkoutDTO>> getWorkoutsByDifficulty(@PathVariable String difficulty) {
        try {
            List<WorkoutDTO> workouts = workoutService.getWorkoutsByDifficulty(difficulty);
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get workouts by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<WorkoutDTO>> getWorkoutsByCategory(@PathVariable String category) {
        try {
            List<WorkoutDTO> workouts = workoutService.getWorkoutsByCategory(category);
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get workouts by creator
     */
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<WorkoutDTO>> getWorkoutsByCreator(@PathVariable String creatorId) {
        try {
            List<WorkoutDTO> workouts = workoutService.getWorkoutsByCreator(creatorId);
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Add exercise to workout
     */
    @PostMapping("/{workoutId}/exercises")
    public ResponseEntity<WorkoutDTO> addExerciseToWorkout(
            @PathVariable String workoutId,
            @RequestBody AddExerciseToWorkoutRequest request) {
        try {
            WorkoutDTO workout = workoutService.addExerciseToWorkout(workoutId, request);
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Remove exercise from workout
     */
    @DeleteMapping("/{workoutId}/exercises/{exerciseIndex}")
    public ResponseEntity<WorkoutDTO> removeExerciseFromWorkout(
            @PathVariable String workoutId,
            @PathVariable int exerciseIndex) {
        try {
            WorkoutDTO workout = workoutService.removeExerciseFromWorkout(workoutId, exerciseIndex);
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Rate a workout
     */
    @PostMapping("/{workoutId}/rate")
    public ResponseEntity<WorkoutDTO> rateWorkout(
            @PathVariable String workoutId,
            @RequestBody RateWorkoutRequest request) {
        try {
            WorkoutDTO workout = workoutService.rateWorkout(workoutId, request.getRating());
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mark workout as completed
     */
    @PostMapping("/{workoutId}/complete")
    public ResponseEntity<WorkoutDTO> completeWorkout(@PathVariable String workoutId) {
        try {
            WorkoutDTO workout = workoutService.completeWorkout(workoutId);
            return workout != null ? ResponseEntity.ok(workout) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

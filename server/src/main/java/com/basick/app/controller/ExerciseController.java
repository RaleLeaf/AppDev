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

import com.basick.app.dto.exercise.CreateExerciseRequest;
import com.basick.app.dto.exercise.ExerciseDTO;
import com.basick.app.dto.exercise.RateExerciseRequest;
import com.basick.app.dto.exercise.UpdateExerciseRequest;
import com.basick.app.service.ExerciseService;

/**
 * REST controller for Exercise operations
 */
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    /**
     * Get all exercises
     */
    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAllExercises() {
        try {
            List<ExerciseDTO> exercises = exerciseService.getAllExercises();
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get exercise by ID
     */
    @GetMapping("/{exerciseId}")
    public ResponseEntity<ExerciseDTO> getExerciseById(@PathVariable String exerciseId) {
        try {
            ExerciseDTO exercise = exerciseService.getExerciseById(exerciseId);
            return exercise != null ? ResponseEntity.ok(exercise) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new exercise
     */
    @PostMapping
    public ResponseEntity<ExerciseDTO> createExercise(@RequestBody CreateExerciseRequest request) {
        try {
            ExerciseDTO exercise = exerciseService.createExercise(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(exercise);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update exercise
     */
    @PutMapping("/{exerciseId}")
    public ResponseEntity<ExerciseDTO> updateExercise(
            @PathVariable String exerciseId,
            @RequestBody UpdateExerciseRequest request) {
        try {
            ExerciseDTO exercise = exerciseService.updateExercise(exerciseId, request);
            return exercise != null ? ResponseEntity.ok(exercise) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete exercise
     */
    @DeleteMapping("/{exerciseId}")
    public ResponseEntity<Void> deleteExercise(@PathVariable String exerciseId) {
        try {
            boolean deleted = exerciseService.deleteExercise(exerciseId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search exercises by name or muscle group
     */
    @GetMapping("/search")
    public ResponseEntity<List<ExerciseDTO>> searchExercises(@RequestParam String query) {
        try {
            List<ExerciseDTO> exercises = exerciseService.searchExercises(query);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get exercises by muscle group
     */
    @GetMapping("/muscle-group/{muscleGroup}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByMuscleGroup(@PathVariable String muscleGroup) {
        try {
            List<ExerciseDTO> exercises = exerciseService.getExercisesByMuscleGroup(muscleGroup);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get exercises by difficulty
     */
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByDifficulty(@PathVariable String difficulty) {
        try {
            List<ExerciseDTO> exercises = exerciseService.getExercisesByDifficulty(difficulty);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get exercises by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByCategory(@PathVariable String category) {
        try {
            List<ExerciseDTO> exercises = exerciseService.getExercisesByCategory(category);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Rate an exercise
     */
    @PostMapping("/{exerciseId}/rate")
    public ResponseEntity<ExerciseDTO> rateExercise(
            @PathVariable String exerciseId,
            @RequestBody RateExerciseRequest request) {
        try {
            ExerciseDTO exercise = exerciseService.rateExercise(exerciseId, request.getRating());
            return exercise != null ? ResponseEntity.ok(exercise) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Add this new endpoint:
    @GetMapping("/workout-category/{category}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByWorkoutCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "6") int limit) {
        try {
            List<ExerciseDTO> exercises = exerciseService.getExercisesByWorkoutCategory(category, limit);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.trainer.TrainerDTO;
import com.basick.app.dto.trainer.CreateTrainerRequest;
import com.basick.app.dto.trainer.UpdateTrainerRequest;
import com.basick.app.service.TrainerService;

import jakarta.validation.Valid;

/**
 * REST controller for Trainer operations
 */
@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    /**
     * Get all trainers
     */
    @GetMapping
    public ResponseEntity<List<TrainerDTO>> getAllTrainers() {
        try {
            List<TrainerDTO> trainers = trainerService.getAllTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainer by ID
     */
    @GetMapping("/{trainerId}")
    public ResponseEntity<TrainerDTO> getTrainerById(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.getTrainerById(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainer by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<TrainerDTO> getTrainerByUserId(@PathVariable String userId) {
        try {
            TrainerDTO trainer = trainerService.getTrainerByUserId(userId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new trainer
     */
    @PostMapping
    public ResponseEntity<TrainerDTO> createTrainer(@Valid @RequestBody CreateTrainerRequest request) {
        try {
            TrainerDTO trainer = trainerService.createTrainer(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(trainer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update trainer
     */
    @PutMapping("/{trainerId}")
    public ResponseEntity<TrainerDTO> updateTrainer(
            @PathVariable String trainerId,
            @Valid @RequestBody UpdateTrainerRequest request) {
        try {
            TrainerDTO trainer = trainerService.updateTrainer(trainerId, request);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete trainer
     */
    @DeleteMapping("/{trainerId}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable String trainerId) {
        try {
            boolean deleted = trainerService.deleteTrainer(trainerId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainers by specialization
     */
    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<TrainerDTO>> getTrainersBySpecialization(@PathVariable String specialization) {
        try {
            List<TrainerDTO> trainers = trainerService.getTrainersBySpecialization(specialization);
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainers by location
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<List<TrainerDTO>> getTrainersByLocation(@PathVariable String location) {
        try {
            List<TrainerDTO> trainers = trainerService.getTrainersByLocation(location);
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get verified trainers
     */
    @GetMapping("/verified")
    public ResponseEntity<List<TrainerDTO>> getVerifiedTrainers() {
        try {
            List<TrainerDTO> trainers = trainerService.getVerifiedTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainers accepting new clients
     */
    @GetMapping("/accepting-clients")
    public ResponseEntity<List<TrainerDTO>> getTrainersAcceptingNewClients() {
        try {
            List<TrainerDTO> trainers = trainerService.getTrainersAcceptingNewClients();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainers by verification status
     */
    @GetMapping("/verification-status/{verificationStatus}")
    public ResponseEntity<List<TrainerDTO>> getTrainersByVerificationStatus(@PathVariable String verificationStatus) {
        try {
            List<TrainerDTO> trainers = trainerService.getTrainersByVerificationStatus(verificationStatus);
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get online trainers
     */
    @GetMapping("/online")
    public ResponseEntity<List<TrainerDTO>> getOnlineTrainers() {
        try {
            List<TrainerDTO> trainers = trainerService.getOnlineTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get in-person trainers
     */
    @GetMapping("/in-person")
    public ResponseEntity<List<TrainerDTO>> getInPersonTrainers() {
        try {
            List<TrainerDTO> trainers = trainerService.getInPersonTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get top-rated trainers
     */
    @GetMapping("/top-rated")
    public ResponseEntity<List<TrainerDTO>> getTopRatedTrainers(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<TrainerDTO> trainers = trainerService.getTopRatedTrainers(limit);
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search trainers by business name
     */
    @GetMapping("/search")
    public ResponseEntity<List<TrainerDTO>> searchTrainersByBusinessName(@RequestParam String businessName) {
        try {
            List<TrainerDTO> trainers = trainerService.searchTrainersByBusinessName(businessName);
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Verify a trainer
     */
    @PatchMapping("/{trainerId}/verify")
    public ResponseEntity<TrainerDTO> verifyTrainer(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.verifyTrainer(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Reject trainer verification
     */
    @PatchMapping("/{trainerId}/reject-verification")
    public ResponseEntity<TrainerDTO> rejectTrainerVerification(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.rejectTrainerVerification(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Add a review to trainer
     */
    @PatchMapping("/{trainerId}/review")
    public ResponseEntity<TrainerDTO> addReviewToTrainer(
            @PathVariable String trainerId,
            @RequestParam Double rating) {
        try {
            TrainerDTO trainer = trainerService.addReviewToTrainer(trainerId, rating);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Increment trainer sessions
     */
    @PatchMapping("/{trainerId}/increment-sessions")
    public ResponseEntity<TrainerDTO> incrementTrainerSessions(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.incrementTrainerSessions(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Increment trainer clients
     */
    @PatchMapping("/{trainerId}/increment-clients")
    public ResponseEntity<TrainerDTO> incrementTrainerClients(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.incrementTrainerClients(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update last active timestamp
     */
    @PatchMapping("/{trainerId}/update-activity")
    public ResponseEntity<TrainerDTO> updateLastActiveAt(@PathVariable String trainerId) {
        try {
            TrainerDTO trainer = trainerService.updateLastActiveAt(trainerId);
            return trainer != null ? ResponseEntity.ok(trainer) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get trainer statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Object> getTrainerStats() {
        try {
            long count = trainerService.getTrainerCount();
            return ResponseEntity.ok(java.util.Map.of("totalTrainers", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.basick.app.dto.trainer.TrainerDTO;
import com.basick.app.dto.trainer.CreateTrainerRequest;
import com.basick.app.dto.trainer.UpdateTrainerRequest;
import com.basick.app.mapper.TrainerMapper;
import com.basick.app.model.Trainer;
import com.basick.app.repository.TrainerRepository;

/**
 * Service layer for Trainer operations
 */
@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;
    private final TrainerMapper trainerMapper;

    public TrainerService(TrainerRepository trainerRepository, TrainerMapper trainerMapper) {
        this.trainerRepository = trainerRepository;
        this.trainerMapper = trainerMapper;
    }

    /**
     * Get all trainers
     */
    public List<TrainerDTO> getAllTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findAll();
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get trainer by ID
     */
    public TrainerDTO getTrainerById(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        return trainer != null ? trainerMapper.toDTO(trainer) : null;
    }

    /**
     * Get trainer by user ID
     */
    public TrainerDTO getTrainerByUserId(String userId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findByUserId(userId);
        return trainer != null ? trainerMapper.toDTO(trainer) : null;
    }

    /**
     * Create a new trainer
     */
    public TrainerDTO createTrainer(CreateTrainerRequest request) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerMapper.toEntity(request);
        String trainerId = trainerRepository.save(trainer);
        trainer.setId(trainerId);
        return trainerMapper.toDTO(trainer);
    }

    /**
     * Update an existing trainer
     */
    public TrainerDTO updateTrainer(String trainerId, UpdateTrainerRequest request) 
            throws ExecutionException, InterruptedException {
        Trainer existingTrainer = trainerRepository.findById(trainerId);
        if (existingTrainer == null) {
            return null;
        }

        trainerMapper.updateEntityFromRequest(existingTrainer, request);
        trainerRepository.updateEntity(trainerId, existingTrainer);
        
        return trainerMapper.toDTO(existingTrainer);
    }

    /**
     * Delete a trainer
     */
    public boolean deleteTrainer(String trainerId) throws ExecutionException, InterruptedException {
        if (!trainerRepository.exists(trainerId)) {
            return false;
        }
        trainerRepository.delete(trainerId);
        return true;
    }

    /**
     * Get trainers by specialization
     */
    public List<TrainerDTO> getTrainersBySpecialization(String specialization) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findBySpecialization(specialization);
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get trainers by location
     */
    public List<TrainerDTO> getTrainersByLocation(String location) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findByLocation(location);
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get verified trainers
     */
    public List<TrainerDTO> getVerifiedTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findVerified();
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get trainers accepting new clients
     */
    public List<TrainerDTO> getTrainersAcceptingNewClients() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findAcceptingNewClients();
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get trainers by verification status
     */
    public List<TrainerDTO> getTrainersByVerificationStatus(String verificationStatus) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findByVerificationStatus(verificationStatus);
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get online trainers
     */
    public List<TrainerDTO> getOnlineTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findOnlineTrainers();
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get in-person trainers
     */
    public List<TrainerDTO> getInPersonTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findInPersonTrainers();
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Get top-rated trainers
     */
    public List<TrainerDTO> getTopRatedTrainers(int limit) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.findTopRated(limit);
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Search trainers by business name
     */
    public List<TrainerDTO> searchTrainersByBusinessName(String businessName) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = trainerRepository.searchByBusinessName(businessName);
        return trainers.stream()
            .map(trainerMapper::toDTO)
            .toList();
    }

    /**
     * Verify a trainer
     */
    public TrainerDTO verifyTrainer(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.verify();
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Reject trainer verification
     */
    public TrainerDTO rejectTrainerVerification(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.rejectVerification();
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Add a review to trainer
     */
    public TrainerDTO addReviewToTrainer(String trainerId, Double rating) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.addReview(rating);
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Increment trainer sessions
     */
    public TrainerDTO incrementTrainerSessions(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.incrementSessionCount();
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Increment trainer clients
     */
    public TrainerDTO incrementTrainerClients(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.incrementClientCount();
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Update last active timestamp
     */
    public TrainerDTO updateLastActiveAt(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = trainerRepository.findById(trainerId);
        if (trainer != null) {
            trainer.updateTimestamp();
            com.google.cloud.Timestamp now = com.google.cloud.Timestamp.now();
            trainer.setLastActiveAt(now);
            trainerRepository.updateEntity(trainerId, trainer);
            return trainerMapper.toDTO(trainer);
        }
        return null;
    }

    /**
     * Get count of trainers
     */
    public long getTrainerCount() throws ExecutionException, InterruptedException {
        return trainerRepository.count();
    }

    /**
     * Check if trainer exists
     */
    public boolean trainerExists(String trainerId) throws ExecutionException, InterruptedException {
        return trainerRepository.exists(trainerId);
    }
}

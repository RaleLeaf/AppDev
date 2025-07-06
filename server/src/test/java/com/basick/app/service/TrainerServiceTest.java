package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.trainer.CreateTrainerRequest;
import com.basick.app.dto.trainer.TrainerDTO;
import com.basick.app.dto.trainer.UpdateTrainerRequest;
import com.basick.app.mapper.TrainerMapper;
import com.basick.app.model.Trainer;
import com.basick.app.repository.TrainerRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class TrainerServiceTest {

    @Mock
    private TrainerRepository trainerRepository;

    @Mock
    private TrainerMapper trainerMapper;

    @InjectMocks
    private TrainerService trainerService;

    private Trainer testTrainer;
    private TrainerDTO testTrainerDTO;
    private CreateTrainerRequest createRequest;
    private UpdateTrainerRequest updateRequest;

    @BeforeEach
    void setUp() {
        testTrainer = new Trainer();
        testTrainer.setId("trainer1");
        testTrainer.setUserId("user1");
        testTrainer.setBusinessName("Test Fitness");
        testTrainer.setBio("Experienced trainer");
        testTrainer.setIsVerified(true);
        testTrainer.setIsAcceptingNewClients(true);
        testTrainer.setAverageRating(4.5);
        testTrainer.setCreatedAt(Timestamp.now());
        testTrainer.setUpdatedAt(Timestamp.now());

        testTrainerDTO = new TrainerDTO();
        testTrainerDTO.setId("trainer1");
        testTrainerDTO.setUserId("user1");
        testTrainerDTO.setBusinessName("Test Fitness");
        testTrainerDTO.setBio("Experienced trainer");
        testTrainerDTO.setIsVerified(true);
        testTrainerDTO.setIsAcceptingNewClients(true);
        testTrainerDTO.setAverageRating(4.5);

        createRequest = new CreateTrainerRequest();
        createRequest.setUserId("user1");
        createRequest.setBusinessName("Test Fitness");
        createRequest.setBio("Experienced trainer");

        updateRequest = new UpdateTrainerRequest();
        updateRequest.setBusinessName("Updated Fitness");
        updateRequest.setBio("Updated bio");
    }

    @Test
    void getAllTrainers_ShouldReturnListOfTrainerDTOs() throws Exception {
        // Given
        List<Trainer> trainers = Arrays.asList(testTrainer);
        when(trainerRepository.findAll()).thenReturn(trainers);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        List<TrainerDTO> result = trainerService.getAllTrainers();

        // Then
        assertEquals(1, result.size());
        assertEquals(testTrainerDTO, result.get(0));
        verify(trainerRepository).findAll();
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void getTrainerById_ExistingId_ShouldReturnTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findById("trainer1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.getTrainerById("trainer1");

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findById("trainer1");
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void getTrainerByUserId_ExistingUserId_ShouldReturnTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findByUserId("user1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.getTrainerByUserId("user1");

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findByUserId("user1");
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void createTrainer_ShouldReturnCreatedTrainerDTO() throws Exception {
        // Given
        when(trainerMapper.toEntity(createRequest)).thenReturn(testTrainer);
        when(trainerRepository.save(testTrainer)).thenReturn("trainer1");
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.createTrainer(createRequest);

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerMapper).toEntity(createRequest);
        verify(trainerRepository).save(testTrainer);
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void updateTrainer_ExistingId_ShouldReturnUpdatedTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findById("trainer1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.updateTrainer("trainer1", updateRequest);

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findById("trainer1");
        verify(trainerMapper).updateEntityFromRequest(testTrainer, updateRequest);
        verify(trainerRepository).updateEntity("trainer1", testTrainer);
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void deleteTrainer_ExistingId_ShouldReturnTrue() throws Exception {
        // Given
        when(trainerRepository.exists("trainer1")).thenReturn(true);

        // When
        boolean result = trainerService.deleteTrainer("trainer1");

        // Then
        assertTrue(result);
        verify(trainerRepository).exists("trainer1");
        verify(trainerRepository).delete("trainer1");
    }

    @Test
    void getVerifiedTrainers_ShouldReturnFilteredTrainers() throws Exception {
        // Given
        List<Trainer> trainers = Arrays.asList(testTrainer);
        when(trainerRepository.findVerified()).thenReturn(trainers);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        List<TrainerDTO> result = trainerService.getVerifiedTrainers();

        // Then
        assertEquals(1, result.size());
        assertEquals(testTrainerDTO, result.get(0));
        verify(trainerRepository).findVerified();
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void verifyTrainer_ExistingTrainer_ShouldReturnUpdatedTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findById("trainer1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.verifyTrainer("trainer1");

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findById("trainer1");
        verify(trainerRepository).updateEntity("trainer1", testTrainer);
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void addReviewToTrainer_ExistingTrainer_ShouldReturnUpdatedTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findById("trainer1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.addReviewToTrainer("trainer1", 5.0);

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findById("trainer1");
        verify(trainerRepository).updateEntity("trainer1", testTrainer);
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void incrementTrainerSessions_ExistingTrainer_ShouldReturnUpdatedTrainerDTO() throws Exception {
        // Given
        when(trainerRepository.findById("trainer1")).thenReturn(testTrainer);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        TrainerDTO result = trainerService.incrementTrainerSessions("trainer1");

        // Then
        assertEquals(testTrainerDTO, result);
        verify(trainerRepository).findById("trainer1");
        verify(trainerRepository).updateEntity("trainer1", testTrainer);
        verify(trainerMapper).toDTO(testTrainer);
    }

    @Test
    void getTopRatedTrainers_ShouldReturnLimitedList() throws Exception {
        // Given
        List<Trainer> trainers = Arrays.asList(testTrainer);
        when(trainerRepository.findTopRated(5)).thenReturn(trainers);
        when(trainerMapper.toDTO(testTrainer)).thenReturn(testTrainerDTO);

        // When
        List<TrainerDTO> result = trainerService.getTopRatedTrainers(5);

        // Then
        assertEquals(1, result.size());
        assertEquals(testTrainerDTO, result.get(0));
        verify(trainerRepository).findTopRated(5);
        verify(trainerMapper).toDTO(testTrainer);
    }
}

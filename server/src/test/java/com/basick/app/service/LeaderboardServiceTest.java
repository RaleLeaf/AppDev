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

import com.basick.app.dto.leaderboard.CreateLeaderboardRequest;
import com.basick.app.dto.leaderboard.LeaderboardDTO;
import com.basick.app.dto.leaderboard.UpdateLeaderboardRequest;
import com.basick.app.mapper.LeaderboardMapper;
import com.basick.app.model.Leaderboard;
import com.basick.app.repository.LeaderboardRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock
    private LeaderboardRepository leaderboardRepository;

    @Mock
    private LeaderboardMapper leaderboardMapper;

    @InjectMocks
    private LeaderboardService leaderboardService;

    private Leaderboard testLeaderboard;
    private LeaderboardDTO testLeaderboardDTO;
    private CreateLeaderboardRequest createRequest;
    private UpdateLeaderboardRequest updateRequest;

    @BeforeEach
    void setUp() {
        testLeaderboard = new Leaderboard();
        testLeaderboard.setId("leaderboard1");
        testLeaderboard.setUserId("user1");
        testLeaderboard.setUserName("Test User");
        testLeaderboard.setCategory("STEPS");
        testLeaderboard.setTimeframe("WEEKLY");
        testLeaderboard.setRank(1);
        testLeaderboard.setScore(10000.0);
        testLeaderboard.setUnit("steps");
        testLeaderboard.setIsActive(true);
        testLeaderboard.setCreatedAt(Timestamp.now());
        testLeaderboard.setUpdatedAt(Timestamp.now());

        testLeaderboardDTO = new LeaderboardDTO();
        testLeaderboardDTO.setId("leaderboard1");
        testLeaderboardDTO.setUserId("user1");
        testLeaderboardDTO.setUserName("Test User");
        testLeaderboardDTO.setCategory("STEPS");
        testLeaderboardDTO.setTimeframe("WEEKLY");
        testLeaderboardDTO.setRank(1);
        testLeaderboardDTO.setScore(10000.0);
        testLeaderboardDTO.setUnit("steps");
        testLeaderboardDTO.setIsActive(true);

        createRequest = new CreateLeaderboardRequest();
        createRequest.setUserId("user1");
        createRequest.setUserName("Test User");
        createRequest.setCategory("STEPS");
        createRequest.setTimeframe("WEEKLY");
        createRequest.setScore(10000.0);
        createRequest.setUnit("steps");

        updateRequest = new UpdateLeaderboardRequest();
        updateRequest.setRank(2);
        updateRequest.setScore(9500.0);
    }

    @Test
    void getAllLeaderboards_ShouldReturnListOfLeaderboardDTOs() throws Exception {
        // Given
        List<Leaderboard> leaderboards = Arrays.asList(testLeaderboard);
        when(leaderboardRepository.findAll()).thenReturn(leaderboards);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        List<LeaderboardDTO> result = leaderboardService.getAllLeaderboards();

        // Then
        assertEquals(1, result.size());
        assertEquals(testLeaderboardDTO, result.get(0));
        verify(leaderboardRepository).findAll();
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void getLeaderboardById_ExistingId_ShouldReturnLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardRepository.findById("leaderboard1")).thenReturn(testLeaderboard);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.getLeaderboardById("leaderboard1");

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardRepository).findById("leaderboard1");
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void getLeaderboardById_NonExistingId_ShouldReturnNull() throws Exception {
        // Given
        when(leaderboardRepository.findById("nonexistent")).thenReturn(null);

        // When
        LeaderboardDTO result = leaderboardService.getLeaderboardById("nonexistent");

        // Then
        assertNull(result);
        verify(leaderboardRepository).findById("nonexistent");
        verify(leaderboardMapper, never()).toDTO(any());
    }

    @Test
    void createLeaderboard_ShouldReturnCreatedLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardMapper.toEntity(createRequest)).thenReturn(testLeaderboard);
        when(leaderboardRepository.save(testLeaderboard)).thenReturn("leaderboard1");
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.createLeaderboard(createRequest);

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardMapper).toEntity(createRequest);
        verify(leaderboardRepository).save(testLeaderboard);
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void updateLeaderboard_ExistingId_ShouldReturnUpdatedLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardRepository.findById("leaderboard1")).thenReturn(testLeaderboard);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.updateLeaderboard("leaderboard1", updateRequest);

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardRepository).findById("leaderboard1");
        verify(leaderboardMapper).updateEntityFromRequest(testLeaderboard, updateRequest);
        verify(leaderboardRepository).updateEntity("leaderboard1", testLeaderboard);
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void updateLeaderboard_NonExistingId_ShouldReturnNull() throws Exception {
        // Given
        when(leaderboardRepository.findById("nonexistent")).thenReturn(null);

        // When
        LeaderboardDTO result = leaderboardService.updateLeaderboard("nonexistent", updateRequest);

        // Then
        assertNull(result);
        verify(leaderboardRepository).findById("nonexistent");
        verify(leaderboardMapper, never()).updateEntityFromRequest(any(), any());
        verify(leaderboardRepository, never()).updateEntity(anyString(), any());
    }

    @Test
    void deleteLeaderboard_ExistingId_ShouldReturnTrue() throws Exception {
        // Given
        when(leaderboardRepository.exists("leaderboard1")).thenReturn(true);

        // When
        boolean result = leaderboardService.deleteLeaderboard("leaderboard1");

        // Then
        assertTrue(result);
        verify(leaderboardRepository).exists("leaderboard1");
        verify(leaderboardRepository).delete("leaderboard1");
    }

    @Test
    void deleteLeaderboard_NonExistingId_ShouldReturnFalse() throws Exception {
        // Given
        when(leaderboardRepository.exists("nonexistent")).thenReturn(false);

        // When
        boolean result = leaderboardService.deleteLeaderboard("nonexistent");

        // Then
        assertFalse(result);
        verify(leaderboardRepository).exists("nonexistent");
        verify(leaderboardRepository, never()).delete(anyString());
    }

    @Test
    void getLeaderboardsByCategory_ShouldReturnFilteredLeaderboards() throws Exception {
        // Given
        List<Leaderboard> leaderboards = Arrays.asList(testLeaderboard);
        when(leaderboardRepository.findByCategory("STEPS")).thenReturn(leaderboards);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        List<LeaderboardDTO> result = leaderboardService.getLeaderboardsByCategory("STEPS");

        // Then
        assertEquals(1, result.size());
        assertEquals(testLeaderboardDTO, result.get(0));
        verify(leaderboardRepository).findByCategory("STEPS");
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void getLeaderboardsByTimeframe_ShouldReturnFilteredLeaderboards() throws Exception {
        // Given
        List<Leaderboard> leaderboards = Arrays.asList(testLeaderboard);
        when(leaderboardRepository.findByTimeframe("WEEKLY")).thenReturn(leaderboards);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        List<LeaderboardDTO> result = leaderboardService.getLeaderboardsByTimeframe("WEEKLY");

        // Then
        assertEquals(1, result.size());
        assertEquals(testLeaderboardDTO, result.get(0));
        verify(leaderboardRepository).findByTimeframe("WEEKLY");
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void getUserRank_ExistingUser_ShouldReturnLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardRepository.findUserRank("user1", "STEPS", "WEEKLY")).thenReturn(testLeaderboard);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.getUserRank("user1", "STEPS", "WEEKLY");

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardRepository).findUserRank("user1", "STEPS", "WEEKLY");
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void updateUserRank_ExistingUser_ShouldReturnUpdatedLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardRepository.findUserRank("user1", "STEPS", "WEEKLY")).thenReturn(testLeaderboard);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.updateUserRank("user1", "STEPS", "WEEKLY", 3);

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardRepository).findUserRank("user1", "STEPS", "WEEKLY");
        verify(leaderboardRepository).updateEntity(eq(testLeaderboard.getId()), eq(testLeaderboard));
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void updateUserScore_ExistingUser_ShouldReturnUpdatedLeaderboardDTO() throws Exception {
        // Given
        when(leaderboardRepository.findUserRank("user1", "STEPS", "WEEKLY")).thenReturn(testLeaderboard);
        when(leaderboardMapper.toDTO(testLeaderboard)).thenReturn(testLeaderboardDTO);

        // When
        LeaderboardDTO result = leaderboardService.updateUserScore("user1", "STEPS", "WEEKLY", 12000.0);

        // Then
        assertEquals(testLeaderboardDTO, result);
        verify(leaderboardRepository).findUserRank("user1", "STEPS", "WEEKLY");
        verify(leaderboardRepository).updateEntity(eq(testLeaderboard.getId()), eq(testLeaderboard));
        verify(leaderboardMapper).toDTO(testLeaderboard);
    }

    @Test
    void getLeaderboardCount_ShouldReturnCount() throws Exception {
        // Given
        when(leaderboardRepository.count()).thenReturn(5L);

        // When
        long result = leaderboardService.getLeaderboardCount();

        // Then
        assertEquals(5L, result);
        verify(leaderboardRepository).count();
    }

    @Test
    void leaderboardExists_ExistingId_ShouldReturnTrue() throws Exception {
        // Given
        when(leaderboardRepository.exists("leaderboard1")).thenReturn(true);

        // When
        boolean result = leaderboardService.leaderboardExists("leaderboard1");

        // Then
        assertTrue(result);
        verify(leaderboardRepository).exists("leaderboard1");
    }
}

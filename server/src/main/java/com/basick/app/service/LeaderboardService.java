package com.basick.app.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.basick.app.dto.leaderboard.LeaderboardDTO;
import com.basick.app.dto.leaderboard.CreateLeaderboardRequest;
import com.basick.app.dto.leaderboard.UpdateLeaderboardRequest;
import com.basick.app.mapper.LeaderboardMapper;
import com.basick.app.model.Leaderboard;
import com.basick.app.repository.LeaderboardRepository;

/**
 * Service layer for Leaderboard operations
 */
@Service
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;
    private final LeaderboardMapper leaderboardMapper;

    public LeaderboardService(LeaderboardRepository leaderboardRepository, LeaderboardMapper leaderboardMapper) {
        this.leaderboardRepository = leaderboardRepository;
        this.leaderboardMapper = leaderboardMapper;
    }

    /**
     * Get all leaderboards
     */
    public List<LeaderboardDTO> getAllLeaderboards() throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findAll();
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get leaderboard by ID
     */
    public LeaderboardDTO getLeaderboardById(String leaderboardId) throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = leaderboardRepository.findById(leaderboardId);
        return leaderboard != null ? leaderboardMapper.toDTO(leaderboard) : null;
    }

    /**
     * Create a new leaderboard
     */
    public LeaderboardDTO createLeaderboard(CreateLeaderboardRequest request) throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = leaderboardMapper.toEntity(request);
        String leaderboardId = leaderboardRepository.save(leaderboard);
        leaderboard.setId(leaderboardId);
        return leaderboardMapper.toDTO(leaderboard);
    }

    /**
     * Update an existing leaderboard
     */
    public LeaderboardDTO updateLeaderboard(String leaderboardId, UpdateLeaderboardRequest request) 
            throws ExecutionException, InterruptedException {
        Leaderboard existingLeaderboard = leaderboardRepository.findById(leaderboardId);
        if (existingLeaderboard == null) {
            return null;
        }

        leaderboardMapper.updateEntityFromRequest(existingLeaderboard, request);
        leaderboardRepository.updateEntity(leaderboardId, existingLeaderboard);
        
        return leaderboardMapper.toDTO(existingLeaderboard);
    }

    /**
     * Delete a leaderboard
     */
    public boolean deleteLeaderboard(String leaderboardId) throws ExecutionException, InterruptedException {
        if (!leaderboardRepository.exists(leaderboardId)) {
            return false;
        }
        leaderboardRepository.delete(leaderboardId);
        return true;
    }

    /**
     * Get leaderboards by category
     */
    public List<LeaderboardDTO> getLeaderboardsByCategory(String category) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findByCategory(category);
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get leaderboards by timeframe
     */
    public List<LeaderboardDTO> getLeaderboardsByTimeframe(String timeframe) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findByTimeframe(timeframe);
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get leaderboards by category and timeframe
     */
    public List<LeaderboardDTO> getLeaderboardsByCategoryAndTimeframe(String category, String timeframe) 
            throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findByCategoryAndTimeframe(category, timeframe);
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get leaderboards by category and timeframe, ordered by rank
     */
    public List<LeaderboardDTO> getLeaderboardsByCategoryAndTimeframeOrderByRank(String category, String timeframe) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findByCategoryAndTimeframeOrderByRank(category, timeframe);
        return leaderboardMapper.toDTOList(leaderboards);
    }

    /**
     * Get active leaderboards
     */
    public List<LeaderboardDTO> getActiveLeaderboards() throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findActive();
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get leaderboards by user ID
     */
    public List<LeaderboardDTO> getLeaderboardsByUserId(String userId) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = leaderboardRepository.findByUserId(userId);
        return leaderboards.stream()
            .map(leaderboardMapper::toDTO)
            .toList();
    }

    /**
     * Get user's rank in a specific category and timeframe
     */
    public LeaderboardDTO getUserRank(String userId, String category, String timeframe) 
            throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = leaderboardRepository.findUserRank(userId, category, timeframe);
        return leaderboard != null ? leaderboardMapper.toDTO(leaderboard) : null;
    }

    /**
     * Update user's rank
     */
    public LeaderboardDTO updateUserRank(String userId, String category, String timeframe, Integer newRank) 
            throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = leaderboardRepository.findUserRank(userId, category, timeframe);
        if (leaderboard != null) {
            leaderboard.updateRank(newRank);
            leaderboardRepository.updateEntity(leaderboard.getId(), leaderboard);
            return leaderboardMapper.toDTO(leaderboard);
        }
        return null;
    }

    /**
     * Update user's score
     */
    public LeaderboardDTO updateUserScore(String userId, String category, String timeframe, Double newScore) 
            throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = leaderboardRepository.findUserRank(userId, category, timeframe);
        if (leaderboard != null) {
            leaderboard.updateScore(newScore);
            leaderboardRepository.updateEntity(leaderboard.getId(), leaderboard);
            return leaderboardMapper.toDTO(leaderboard);
        }
        return null;
    }

    /**
     * Get count of leaderboards
     */
    public long getLeaderboardCount() throws ExecutionException, InterruptedException {
        return leaderboardRepository.count();
    }

    /**
     * Check if leaderboard exists
     */
    public boolean leaderboardExists(String leaderboardId) throws ExecutionException, InterruptedException {
        return leaderboardRepository.exists(leaderboardId);
    }
}

package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.leaderboard.LeaderboardDTO;
import com.basick.app.dto.leaderboard.CreateLeaderboardRequest;
import com.basick.app.dto.leaderboard.UpdateLeaderboardRequest;
import com.basick.app.service.LeaderboardService;

import jakarta.validation.Valid;

/**
 * REST controller for Leaderboard operations
 */
@RestController
@RequestMapping("/api/leaderboards")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    /**
     * Get all leaderboards
     */
    @GetMapping
    public ResponseEntity<List<LeaderboardDTO>> getAllLeaderboards() {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getAllLeaderboards();
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboard by ID
     */
    @GetMapping("/{leaderboardId}")
    public ResponseEntity<LeaderboardDTO> getLeaderboardById(@PathVariable String leaderboardId) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.getLeaderboardById(leaderboardId);
            return leaderboard != null ? ResponseEntity.ok(leaderboard) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new leaderboard entry
     */
    @PostMapping
    public ResponseEntity<LeaderboardDTO> createLeaderboard(@Valid @RequestBody CreateLeaderboardRequest request) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.createLeaderboard(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(leaderboard);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update leaderboard entry
     */
    @PutMapping("/{leaderboardId}")
    public ResponseEntity<LeaderboardDTO> updateLeaderboard(
            @PathVariable String leaderboardId,
            @Valid @RequestBody UpdateLeaderboardRequest request) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.updateLeaderboard(leaderboardId, request);
            return leaderboard != null ? ResponseEntity.ok(leaderboard) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete leaderboard entry
     */
    @DeleteMapping("/{leaderboardId}")
    public ResponseEntity<Void> deleteLeaderboard(@PathVariable String leaderboardId) {
        try {
            boolean deleted = leaderboardService.deleteLeaderboard(leaderboardId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboards by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardsByCategory(@PathVariable String category) {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getLeaderboardsByCategory(category);
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboards by timeframe
     */
    @GetMapping("/timeframe/{timeframe}")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardsByTimeframe(@PathVariable String timeframe) {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getLeaderboardsByTimeframe(timeframe);
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboards by category and timeframe
     */
    @GetMapping("/category/{category}/timeframe/{timeframe}")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardsByCategoryAndTimeframe(
            @PathVariable String category,
            @PathVariable String timeframe) {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getLeaderboardsByCategoryAndTimeframe(category, timeframe);
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboards by category and timeframe, ordered by rank
     */
    @GetMapping("/category/{category}/timeframe/{timeframe}/ranked")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardsByCategoryAndTimeframeOrderByRank(
            @PathVariable String category,
            @PathVariable String timeframe) {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getLeaderboardsByCategoryAndTimeframeOrderByRank(category, timeframe);
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get active leaderboards
     */
    @GetMapping("/active")
    public ResponseEntity<List<LeaderboardDTO>> getActiveLeaderboards() {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getActiveLeaderboards();
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboards by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardsByUserId(@PathVariable String userId) {
        try {
            List<LeaderboardDTO> leaderboards = leaderboardService.getLeaderboardsByUserId(userId);
            return ResponseEntity.ok(leaderboards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user's rank in a specific category and timeframe
     */
    @GetMapping("/user/{userId}/category/{category}/timeframe/{timeframe}")
    public ResponseEntity<LeaderboardDTO> getUserRank(
            @PathVariable String userId,
            @PathVariable String category,
            @PathVariable String timeframe) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.getUserRank(userId, category, timeframe);
            return leaderboard != null ? ResponseEntity.ok(leaderboard) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user's rank
     */
    @PatchMapping("/user/{userId}/category/{category}/timeframe/{timeframe}/rank")
    public ResponseEntity<LeaderboardDTO> updateUserRank(
            @PathVariable String userId,
            @PathVariable String category,
            @PathVariable String timeframe,
            @RequestParam Integer newRank) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.updateUserRank(userId, category, timeframe, newRank);
            return leaderboard != null ? ResponseEntity.ok(leaderboard) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user's score
     */
    @PatchMapping("/user/{userId}/category/{category}/timeframe/{timeframe}/score")
    public ResponseEntity<LeaderboardDTO> updateUserScore(
            @PathVariable String userId,
            @PathVariable String category,
            @PathVariable String timeframe,
            @RequestParam Double newScore) {
        try {
            LeaderboardDTO leaderboard = leaderboardService.updateUserScore(userId, category, timeframe, newScore);
            return leaderboard != null ? ResponseEntity.ok(leaderboard) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get leaderboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Object> getLeaderboardStats() {
        try {
            long count = leaderboardService.getLeaderboardCount();
            return ResponseEntity.ok(java.util.Map.of("totalLeaderboards", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

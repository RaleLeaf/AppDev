package com.basick.app.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

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

import com.basick.app.dto.usermacrotracker.AddMealEntryRequest;
import com.basick.app.dto.usermacrotracker.AddWaterRequest;
import com.basick.app.dto.usermacrotracker.CreateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UpdateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UserMacroSummaryDTO;
import com.basick.app.dto.usermacrotracker.UserMacroTrackerDTO;
import com.basick.app.service.UserMacroTrackerService;

/**
 * REST Controller for UserMacroTracker operations
 */
@RestController
@RequestMapping("/api/user-macro-trackers")
public class UserMacroTrackerController {

    private final UserMacroTrackerService userMacroTrackerService;

    public UserMacroTrackerController(UserMacroTrackerService userMacroTrackerService) {
        this.userMacroTrackerService = userMacroTrackerService;
    }

    /**
     * Create a new user macro tracker
     * POST /api/user-macro-trackers
     */
    @PostMapping
    public ResponseEntity<UserMacroTrackerDTO> createUserMacroTracker(@RequestBody CreateUserMacroTrackerRequest request) {
        try {
            UserMacroTrackerDTO created = userMacroTrackerService.createUserMacroTracker(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get user macro tracker by ID
     * GET /api/user-macro-trackers/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserMacroTrackerDTO> getUserMacroTrackerById(@PathVariable String id) {
        Optional<UserMacroTrackerDTO> tracker = userMacroTrackerService.getUserMacroTrackerById(id);
        return tracker.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get user macro tracker by user ID and date
     * GET /api/user-macro-trackers/user/{userId}/date/{date}
     */
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<UserMacroTrackerDTO> getUserMacroTrackerByUserIdAndDate(
            @PathVariable String userId, 
            @PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
            Optional<UserMacroTrackerDTO> tracker = userMacroTrackerService.getUserMacroTrackerByUserIdAndDate(userId, localDate);
            return tracker.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all user macro trackers for a user
     * GET /api/user-macro-trackers/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserMacroTrackerDTO>> getUserMacroTrackersByUserId(@PathVariable String userId) {
        List<UserMacroTrackerDTO> trackers = userMacroTrackerService.getUserMacroTrackersByUserId(userId);
        return ResponseEntity.ok(trackers);
    }

    /**
     * Get user macro trackers for a user within a date range
     * GET /api/user-macro-trackers/user/{userId}/range?start={startDate}&end={endDate}
     */
    @GetMapping("/user/{userId}/range")
    public ResponseEntity<List<UserMacroTrackerDTO>> getUserMacroTrackersByUserIdAndDateRange(
            @PathVariable String userId,
            @RequestParam String start,
            @RequestParam String end) {
        try {
            LocalDate startDate = LocalDate.parse(start, DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate endDate = LocalDate.parse(end, DateTimeFormatter.ISO_LOCAL_DATE);
            List<UserMacroTrackerDTO> trackers = userMacroTrackerService.getUserMacroTrackersByUserIdAndDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(trackers);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update user macro tracker
     * PUT /api/user-macro-trackers/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserMacroTrackerDTO> updateUserMacroTracker(
            @PathVariable String id, 
            @RequestBody UpdateUserMacroTrackerRequest request) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.updateUserMacroTracker(id, request);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete user macro tracker
     * DELETE /api/user-macro-trackers/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserMacroTracker(@PathVariable String id) {
        boolean deleted = userMacroTrackerService.deleteUserMacroTracker(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    /**
     * Add meal entry to tracker
     * POST /api/user-macro-trackers/{id}/meals
     */
    @PostMapping("/{id}/meals")
    public ResponseEntity<UserMacroTrackerDTO> addMealEntry(
            @PathVariable String id, 
            @RequestBody AddMealEntryRequest request) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.addMealEntry(id, request);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Add water intake to tracker
     * POST /api/user-macro-trackers/{id}/water
     */
    @PostMapping("/{id}/water")
    public ResponseEntity<UserMacroTrackerDTO> addWaterIntake(
            @PathVariable String id, 
            @RequestBody AddWaterRequest request) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.addWaterIntake(id, request);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get macro summary for a user on a specific date
     * GET /api/user-macro-trackers/user/{userId}/summary/{date}
     */
    @GetMapping("/user/{userId}/summary/{date}")
    public ResponseEntity<UserMacroSummaryDTO> getMacroSummary(
            @PathVariable String userId, 
            @PathVariable String date) {
        try {
            LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
            Optional<UserMacroSummaryDTO> summary = userMacroTrackerService.getMacroSummary(userId, localDate);
            return summary.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Set daily goals for a tracker
     * PUT /api/user-macro-trackers/{id}/goals
     */
    @PutMapping("/{id}/goals")
    public ResponseEntity<UserMacroTrackerDTO> setDailyGoals(
            @PathVariable String id,
            @RequestParam(required = false) Double calorieGoal,
            @RequestParam(required = false) Double proteinGoal,
            @RequestParam(required = false) Double carbsGoal,
            @RequestParam(required = false) Double fatsGoal,
            @RequestParam(required = false) Double waterGoal) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.setDailyGoals(
                id, calorieGoal, proteinGoal, carbsGoal, fatsGoal, waterGoal);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get weekly macro summary for a user
     * GET /api/user-macro-trackers/user/{userId}/summary/weekly/{startDate}
     */
    @GetMapping("/user/{userId}/summary/weekly/{startDate}")
    public ResponseEntity<List<UserMacroSummaryDTO>> getWeeklyMacroSummary(
            @PathVariable String userId, 
            @PathVariable String startDate) {
        try {
            LocalDate localStartDate = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
            List<UserMacroSummaryDTO> summary = userMacroTrackerService.getWeeklyMacroSummary(userId, localStartDate);
            return ResponseEntity.ok(summary);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get monthly macro summary for a user
     * GET /api/user-macro-trackers/user/{userId}/summary/monthly/{startDate}
     */
    @GetMapping("/user/{userId}/summary/monthly/{startDate}")
    public ResponseEntity<List<UserMacroSummaryDTO>> getMonthlyMacroSummary(
            @PathVariable String userId, 
            @PathVariable String startDate) {
        try {
            LocalDate localStartDate = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
            List<UserMacroSummaryDTO> summary = userMacroTrackerService.getMonthlyMacroSummary(userId, localStartDate);
            return ResponseEntity.ok(summary);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Clear all meals for a tracker
     * DELETE /api/user-macro-trackers/{id}/meals
     */
    @DeleteMapping("/{id}/meals")
    public ResponseEntity<UserMacroTrackerDTO> clearMealsForDate(@PathVariable String id) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.clearMealsForDate(id);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Reset water intake for a tracker
     * DELETE /api/user-macro-trackers/{id}/water
     */
    @DeleteMapping("/{id}/water")
    public ResponseEntity<UserMacroTrackerDTO> resetWaterIntake(@PathVariable String id) {
        Optional<UserMacroTrackerDTO> updated = userMacroTrackerService.resetWaterIntake(id);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

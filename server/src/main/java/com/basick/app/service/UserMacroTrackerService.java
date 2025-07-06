package com.basick.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.basick.app.dto.usermacrotracker.AddMealEntryRequest;
import com.basick.app.dto.usermacrotracker.AddWaterRequest;
import com.basick.app.dto.usermacrotracker.CreateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UpdateUserMacroTrackerRequest;
import com.basick.app.dto.usermacrotracker.UserMacroSummaryDTO;
import com.basick.app.dto.usermacrotracker.UserMacroTrackerDTO;
import com.basick.app.mapper.UserMacroTrackerMapper;
import com.basick.app.model.UserMacroTracker;
import com.basick.app.repository.UserMacroTrackerRepository;

/**
 * Service class for UserMacroTracker business logic
 */
@Service
public class UserMacroTrackerService {

    private final UserMacroTrackerRepository repository;
    private final UserMacroTrackerMapper mapper;

    public UserMacroTrackerService(UserMacroTrackerRepository repository, UserMacroTrackerMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    /**
     * Create a new user macro tracker
     */
    public UserMacroTrackerDTO createUserMacroTracker(CreateUserMacroTrackerRequest request) {
        UserMacroTracker tracker = mapper.toEntity(request);
        UserMacroTracker savedTracker = repository.save(tracker);
        return mapper.toDTO(savedTracker);
    }

    /**
     * Get user macro tracker by ID
     */
    public Optional<UserMacroTrackerDTO> getUserMacroTrackerById(String id) {
        UserMacroTracker tracker = repository.findById(id);
        return tracker != null ? Optional.of(mapper.toDTO(tracker)) : Optional.empty();
    }

    /**
     * Get user macro tracker by user ID and date
     */
    public Optional<UserMacroTrackerDTO> getUserMacroTrackerByUserIdAndDate(String userId, LocalDate date) {
        String dateString = date.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        UserMacroTracker tracker = repository.findByUserIdAndDate(userId, dateString);
        return tracker != null ? Optional.of(mapper.toDTO(tracker)) : Optional.empty();
    }

    /**
     * Get all user macro trackers for a user
     */
    public List<UserMacroTrackerDTO> getUserMacroTrackersByUserId(String userId) {
        List<UserMacroTracker> trackers = repository.findByUserId(userId, 50); // Default limit
        return trackers.stream()
                .map(mapper::toDTO)
                .toList();
    }

    /**
     * Get user macro trackers for a user within a date range
     */
    public List<UserMacroTrackerDTO> getUserMacroTrackersByUserIdAndDateRange(String userId, 
            LocalDate startDate, LocalDate endDate) {
        String startDateString = startDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        String endDateString = endDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        List<UserMacroTracker> trackers = repository.findByUserIdAndDateRange(userId, startDateString, endDateString);
        return trackers.stream()
                .map(mapper::toDTO)
                .toList();
    }

    /**
     * Update user macro tracker
     */
    public Optional<UserMacroTrackerDTO> updateUserMacroTracker(String id, UpdateUserMacroTrackerRequest request) {
        UserMacroTracker existingTracker = repository.findById(id);
        if (existingTracker != null) {
            mapper.updateEntityFromRequest(existingTracker, request);
            UserMacroTracker updatedTracker = repository.update(existingTracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }

    /**
     * Delete user macro tracker
     */
    public boolean deleteUserMacroTracker(String id) {
        return repository.delete(id);
    }

    /**
     * Add meal entry to tracker
     */
    public Optional<UserMacroTrackerDTO> addMealEntry(String trackerId, AddMealEntryRequest request) {
        UserMacroTracker tracker = repository.findById(trackerId);
        if (tracker != null) {
            // Create a new MealEntry
            UserMacroTracker.MealEntry mealEntry = new UserMacroTracker.MealEntry();
            mealEntry.setFoodId(request.getFoodId());
            mealEntry.setQuantity(request.getQuantity());
            mealEntry.setMealType(request.getMealType());
            // Add other fields as needed
            
            tracker.addMealEntry(mealEntry);
            UserMacroTracker updatedTracker = repository.update(tracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }

    /**
     * Add water intake to tracker
     */
    public Optional<UserMacroTrackerDTO> addWaterIntake(String trackerId, AddWaterRequest request) {
        UserMacroTracker tracker = repository.findById(trackerId);
        if (tracker != null) {
            Double currentWater = tracker.getWaterConsumed() != null ? tracker.getWaterConsumed() : 0.0;
            tracker.setWaterConsumed(currentWater + request.getWaterAmount());
            UserMacroTracker updatedTracker = repository.update(tracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }

    /**
     * Get macro summary for a user on a specific date
     */
    public Optional<UserMacroSummaryDTO> getMacroSummary(String userId, LocalDate date) {
        String dateString = date.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        UserMacroTracker tracker = repository.findByUserIdAndDate(userId, dateString);
        if (tracker != null) {
            return Optional.of(mapper.toSummaryDTO(tracker));
        }
        return Optional.empty();
    }

    /**
     * Set daily goals for a user
     */
    public Optional<UserMacroTrackerDTO> setDailyGoals(String trackerId, 
            Double calorieGoal, Double proteinGoal, Double carbsGoal, Double fatsGoal, Double waterGoal) {
        UserMacroTracker tracker = repository.findById(trackerId);
        if (tracker != null) {
            if (calorieGoal != null) tracker.setDailyCalorieGoal(calorieGoal);
            if (proteinGoal != null) tracker.setDailyProteinGoal(proteinGoal);
            if (carbsGoal != null) tracker.setDailyCarbsGoal(carbsGoal);
            if (fatsGoal != null) tracker.setDailyFatsGoal(fatsGoal);
            if (waterGoal != null) tracker.setWaterGoal(waterGoal);
            
            UserMacroTracker updatedTracker = repository.update(tracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }

    /**
     * Get weekly macro summary for a user
     */
    public List<UserMacroSummaryDTO> getWeeklyMacroSummary(String userId, LocalDate startDate) {
        LocalDate endDate = startDate.plusDays(6);
        String startDateString = startDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        String endDateString = endDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        List<UserMacroTracker> trackers = repository.findByUserIdAndDateRange(userId, startDateString, endDateString);
        return trackers.stream()
                .map(mapper::toSummaryDTO)
                .toList();
    }

    /**
     * Get monthly macro summary for a user
     */
    public List<UserMacroSummaryDTO> getMonthlyMacroSummary(String userId, LocalDate startDate) {
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        String startDateString = startDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        String endDateString = endDate.format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE);
        List<UserMacroTracker> trackers = repository.findByUserIdAndDateRange(userId, startDateString, endDateString);
        return trackers.stream()
                .map(mapper::toSummaryDTO)
                .toList();
    }

    /**
     * Clear all meals for a specific date
     */
    public Optional<UserMacroTrackerDTO> clearMealsForDate(String trackerId) {
        UserMacroTracker tracker = repository.findById(trackerId);
        if (tracker != null) {
            tracker.setMeals(new ArrayList<>());
            // Reset consumed amounts to 0
            tracker.setCaloriesConsumed(0.0);
            tracker.setProteinConsumed(0.0);
            tracker.setCarbsConsumed(0.0);
            tracker.setFatsConsumed(0.0);
            tracker.setFiberConsumed(0.0);
            tracker.setSugarConsumed(0.0);
            tracker.setSodiumConsumed(0.0);
            
            UserMacroTracker updatedTracker = repository.update(tracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }

    /**
     * Reset water intake for a specific date
     */
    public Optional<UserMacroTrackerDTO> resetWaterIntake(String trackerId) {
        UserMacroTracker tracker = repository.findById(trackerId);
        if (tracker != null) {
            tracker.setWaterConsumed(0.0);
            UserMacroTracker updatedTracker = repository.update(tracker);
            return Optional.of(mapper.toDTO(updatedTracker));
        }
        return Optional.empty();
    }
}

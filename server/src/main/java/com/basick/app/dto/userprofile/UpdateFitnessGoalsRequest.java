package com.basick.app.dto.userprofile;

import java.util.List;

/**
 * Request DTO for updating fitness goals
 */
public class UpdateFitnessGoalsRequest {
    private List<String> fitnessGoals;  // e.g., ["LOSE_WEIGHT", "BUILD_MUSCLE", "IMPROVE_ENDURANCE"]

    public UpdateFitnessGoalsRequest() {}

    // Getters and Setters
    public List<String> getFitnessGoals() { return fitnessGoals; }
    public void setFitnessGoals(List<String> fitnessGoals) { this.fitnessGoals = fitnessGoals; }
}

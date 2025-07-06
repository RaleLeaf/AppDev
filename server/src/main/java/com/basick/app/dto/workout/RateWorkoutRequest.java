package com.basick.app.dto.workout;

/**
 * Request DTO for rating a Workout
 */
public class RateWorkoutRequest {
    private double rating;

    public RateWorkoutRequest() {}

    public RateWorkoutRequest(double rating) {
        this.rating = rating;
    }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
}

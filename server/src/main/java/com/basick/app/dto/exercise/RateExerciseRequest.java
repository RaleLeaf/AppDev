package com.basick.app.dto.exercise;

/**
 * Request DTO for rating an Exercise
 */
public class RateExerciseRequest {
    private double rating;

    public RateExerciseRequest() {}

    public RateExerciseRequest(double rating) {
        this.rating = rating;
    }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
}

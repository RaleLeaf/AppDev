package com.basick.app.model;

import com.google.cloud.Timestamp;

public class Leaderboard {
    private String id;
    private String userId;
    private String userName; // Denormalized for efficiency
    private String userProfilePicture; // Denormalized for efficiency
    private String category; // "STEPS", "CALORIES_BURNED", "WORKOUTS", "DISTANCE", "ACTIVE_MINUTES"
    private String timeframe; // "DAILY", "WEEKLY", "MONTHLY", "ALL_TIME"
    private Integer rank;
    private Integer previousRank;
    private Double score; // The actual metric value
    private String unit; // "steps", "calories", "km", "minutes"
    private Boolean isActive;
    private Timestamp calculatedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Leaderboard() {
        this.isActive = true;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
        this.calculatedAt = Timestamp.now();
    }

    public Leaderboard(String userId, String category, String timeframe, Integer rank, Double score) {
        this();
        this.userId = userId;
        this.category = category;
        this.timeframe = timeframe;
        this.rank = rank;
        this.score = score;
    }

    // Business methods
    public void updateRank(Integer newRank) {
        this.previousRank = this.rank;
        this.rank = newRank;
        this.updatedAt = Timestamp.now();
        this.calculatedAt = Timestamp.now();
    }

    public void updateScore(Double newScore) {
        this.score = newScore;
        this.updatedAt = Timestamp.now();
        this.calculatedAt = Timestamp.now();
    }

    public Integer getRankChange() {
        if (this.previousRank == null) {
            return null;
        }
        return this.previousRank - this.rank; // Positive = improved, negative = declined
    }

    public String getFormattedScore() {
        if (this.score == null) {
            return "0";
        }
        
        if (this.unit != null) {
            switch (this.unit) {
                case "steps":
                    return String.format("%,.0f %s", this.score, this.unit);
                case "calories":
                    return String.format("%.0f %s", this.score, this.unit);
                case "km":
                    return String.format("%.2f %s", this.score, this.unit);
                case "minutes":
                    return String.format("%.0f %s", this.score, this.unit);
                default:
                    return String.format("%.2f", this.score);
            }
        }
        return String.format("%.2f", this.score);
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserProfilePicture() { return userProfilePicture; }
    public void setUserProfilePicture(String userProfilePicture) { this.userProfilePicture = userProfilePicture; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public Integer getPreviousRank() { return previousRank; }
    public void setPreviousRank(Integer previousRank) { this.previousRank = previousRank; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Timestamp getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(Timestamp calculatedAt) { this.calculatedAt = calculatedAt; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}

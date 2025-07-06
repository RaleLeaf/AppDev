package com.basick.app.dto.leaderboard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateLeaderboardRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Timeframe is required")
    private String timeframe;

    @NotNull(message = "Score is required")
    private Double score;

    private String unit;
    private String userName;
    private String userProfilePicture;

    // Constructors
    public CreateLeaderboardRequest() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserProfilePicture() { return userProfilePicture; }
    public void setUserProfilePicture(String userProfilePicture) { this.userProfilePicture = userProfilePicture; }
}

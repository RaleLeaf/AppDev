package com.basick.app.dto.leaderboard;

public class LeaderboardDTO {
    private String id;
    private String userId;
    private String userName;
    private String userProfilePicture;
    private String category;
    private String timeframe;
    private Integer rank;
    private Integer previousRank;
    private Double score;
    private String unit;
    private String formattedScore;
    private Integer rankChange;
    private Boolean isActive;
    private String calculatedAt;
    private String createdAt;
    private String updatedAt;

    // Constructors
    public LeaderboardDTO() {}

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

    public String getFormattedScore() { return formattedScore; }
    public void setFormattedScore(String formattedScore) { this.formattedScore = formattedScore; }

    public Integer getRankChange() { return rankChange; }
    public void setRankChange(Integer rankChange) { this.rankChange = rankChange; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(String calculatedAt) { this.calculatedAt = calculatedAt; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}

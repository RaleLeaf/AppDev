package com.basick.app.dto.leaderboard;

public class UpdateLeaderboardRequest {
    private Double score;
    private Integer rank;
    private String userName;
    private String userProfilePicture;
    private Boolean isActive;

    // Constructors
    public UpdateLeaderboardRequest() {}

    // Getters and Setters
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserProfilePicture() { return userProfilePicture; }
    public void setUserProfilePicture(String userProfilePicture) { this.userProfilePicture = userProfilePicture; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}

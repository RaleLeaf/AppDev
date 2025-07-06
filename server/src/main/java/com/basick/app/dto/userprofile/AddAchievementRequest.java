package com.basick.app.dto.userprofile;

/**
 * Request DTO for adding achievements
 */
public class AddAchievementRequest {
    private String achievement;
    private Integer points;

    public AddAchievementRequest() {}

    // Getters and Setters
    public String getAchievement() { return achievement; }
    public void setAchievement(String achievement) { this.achievement = achievement; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
}

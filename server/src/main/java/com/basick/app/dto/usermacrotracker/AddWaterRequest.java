package com.basick.app.dto.usermacrotracker;

/**
 * Request DTO for adding water intake
 */
public class AddWaterRequest {
    private Double waterAmount; // Amount in ML
    private String recordedAt; // ISO 8601 format (optional, defaults to now)

    // Constructors
    public AddWaterRequest() {}

    public AddWaterRequest(Double waterAmount) {
        this.waterAmount = waterAmount;
    }

    // Getters and Setters
    public Double getWaterAmount() { return waterAmount; }
    public void setWaterAmount(Double waterAmount) { this.waterAmount = waterAmount; }

    public String getRecordedAt() { return recordedAt; }
    public void setRecordedAt(String recordedAt) { this.recordedAt = recordedAt; }
}

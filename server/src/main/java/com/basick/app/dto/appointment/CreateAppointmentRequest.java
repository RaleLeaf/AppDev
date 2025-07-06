package com.basick.app.dto.appointment;

import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateAppointmentRequest {
    @NotBlank(message = "Client ID is required")
    private String clientId;

    @NotBlank(message = "Trainer ID is required")
    private String trainerId;

    @NotBlank(message = "Scheduled start time is required")
    private String scheduledStartTime;

    @NotNull(message = "Duration is required")
    private Integer durationMinutes;

    private String title;
    private String description;
    private String serviceType;
    private String location;
    private String meetingType;
    private String meetingLink;
    private String meetingPassword;
    private Double price;
    private String currency;
    private Boolean isPackageSession;
    private String packageId;
    private String clientNotes;
    private Boolean followUpRequired;
    private String followUpNotes;
    private Boolean isRecurring;
    private String recurrencePattern;
    private String parentAppointmentId;
    private Integer recurrenceCount;
    private Map<String, Object> preparationInstructions;
    private String equipmentNeeded;
    private String specialRequirements;
    private String trainerName;
    private String clientName;

    // Constructors
    public CreateAppointmentRequest() {}

    // Getters and Setters
    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }

    public String getTrainerId() { return trainerId; }
    public void setTrainerId(String trainerId) { this.trainerId = trainerId; }

    public String getScheduledStartTime() { return scheduledStartTime; }
    public void setScheduledStartTime(String scheduledStartTime) { this.scheduledStartTime = scheduledStartTime; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMeetingType() { return meetingType; }
    public void setMeetingType(String meetingType) { this.meetingType = meetingType; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public String getMeetingPassword() { return meetingPassword; }
    public void setMeetingPassword(String meetingPassword) { this.meetingPassword = meetingPassword; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Boolean getIsPackageSession() { return isPackageSession; }
    public void setIsPackageSession(Boolean isPackageSession) { this.isPackageSession = isPackageSession; }

    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }

    public String getClientNotes() { return clientNotes; }
    public void setClientNotes(String clientNotes) { this.clientNotes = clientNotes; }

    public Boolean getFollowUpRequired() { return followUpRequired; }
    public void setFollowUpRequired(Boolean followUpRequired) { this.followUpRequired = followUpRequired; }

    public String getFollowUpNotes() { return followUpNotes; }
    public void setFollowUpNotes(String followUpNotes) { this.followUpNotes = followUpNotes; }

    public Boolean getIsRecurring() { return isRecurring; }
    public void setIsRecurring(Boolean isRecurring) { this.isRecurring = isRecurring; }

    public String getRecurrencePattern() { return recurrencePattern; }
    public void setRecurrencePattern(String recurrencePattern) { this.recurrencePattern = recurrencePattern; }

    public String getParentAppointmentId() { return parentAppointmentId; }
    public void setParentAppointmentId(String parentAppointmentId) { this.parentAppointmentId = parentAppointmentId; }

    public Integer getRecurrenceCount() { return recurrenceCount; }
    public void setRecurrenceCount(Integer recurrenceCount) { this.recurrenceCount = recurrenceCount; }

    public Map<String, Object> getPreparationInstructions() { return preparationInstructions; }
    public void setPreparationInstructions(Map<String, Object> preparationInstructions) { this.preparationInstructions = preparationInstructions; }

    public String getEquipmentNeeded() { return equipmentNeeded; }
    public void setEquipmentNeeded(String equipmentNeeded) { this.equipmentNeeded = equipmentNeeded; }

    public String getSpecialRequirements() { return specialRequirements; }
    public void setSpecialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; }

    public String getTrainerName() { return trainerName; }
    public void setTrainerName(String trainerName) { this.trainerName = trainerName; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }
}

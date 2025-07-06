package com.basick.app.model;

import java.util.Map;

import com.google.cloud.Timestamp;

public class Appointment {
    private String id;
    private String clientId; // User who booked the appointment
    private String trainerId; // Trainer providing the service
    private String trainerName; // Denormalized for efficiency
    private String clientName; // Denormalized for efficiency
    
    // Appointment details
    private String title;
    private String description;
    private String serviceType; // "PERSONAL_TRAINING", "CONSULTATION", "GROUP_CLASS", "NUTRITION_COACHING"
    private Timestamp scheduledStartTime;
    private Timestamp scheduledEndTime;
    private Integer durationMinutes;
    
    // Location and format
    private String location; // Physical address or "ONLINE"
    private String meetingType; // "IN_PERSON", "VIDEO_CALL", "PHONE_CALL"
    private String meetingLink; // For online sessions
    private String meetingPassword;
    
    // Status and workflow
    private String status; // "SCHEDULED", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"
    private String cancellationReason;
    private Timestamp actualStartTime;
    private Timestamp actualEndTime;
    
    // Payment and pricing
    private Double price;
    private String currency;
    private String paymentStatus; // "PENDING", "PAID", "REFUNDED", "FAILED"
    private String paymentIntentId; // Stripe payment intent ID
    private Boolean isPackageSession; // Part of a package deal
    private String packageId; // Reference to package if applicable
    
    // Session notes and feedback
    private String trainerNotes; // Private notes for trainer
    private String clientNotes; // Notes from client
    private String sessionSummary; // Summary of what was covered
    private Integer clientRating; // 1-5 star rating from client
    private String clientFeedback;
    private Integer trainerRating; // 1-5 star rating from trainer
    private String trainerFeedback;
    
    // Reminders and notifications
    private Boolean reminderSent;
    private Timestamp reminderSentAt;
    private Boolean followUpRequired;
    private String followUpNotes;
    
    // Recurring appointment info
    private Boolean isRecurring;
    private String recurrencePattern; // "WEEKLY", "BIWEEKLY", "MONTHLY"
    private String parentAppointmentId; // For recurring series
    private Integer recurrenceCount;
    
    // Preparation and requirements
    private Map<String, Object> preparationInstructions;
    private String equipmentNeeded;
    private String specialRequirements;
    
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String createdBy; // User ID who created the appointment

    public Appointment() {
        this.status = "SCHEDULED";
        this.paymentStatus = "PENDING";
        this.reminderSent = false;
        this.followUpRequired = false;
        this.isRecurring = false;
        this.recurrenceCount = 0;
        this.currency = "USD";
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Appointment(String clientId, String trainerId, Timestamp scheduledStartTime, Integer durationMinutes) {
        this();
        this.clientId = clientId;
        this.trainerId = trainerId;
        this.scheduledStartTime = scheduledStartTime;
        this.durationMinutes = durationMinutes;
        // Calculate end time
        this.scheduledEndTime = Timestamp.ofTimeSecondsAndNanos(
            scheduledStartTime.getSeconds() + (durationMinutes * 60), 
            scheduledStartTime.getNanos()
        );
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }
    public String getTrainerId() { return trainerId; }
    public void setTrainerId(String trainerId) { this.trainerId = trainerId; }
    public String getTrainerName() { return trainerName; }
    public void setTrainerName(String trainerName) { this.trainerName = trainerName; }
    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public Timestamp getScheduledStartTime() { return scheduledStartTime; }
    public void setScheduledStartTime(Timestamp scheduledStartTime) { this.scheduledStartTime = scheduledStartTime; }
    public Timestamp getScheduledEndTime() { return scheduledEndTime; }
    public void setScheduledEndTime(Timestamp scheduledEndTime) { this.scheduledEndTime = scheduledEndTime; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getMeetingType() { return meetingType; }
    public void setMeetingType(String meetingType) { this.meetingType = meetingType; }
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public String getMeetingPassword() { return meetingPassword; }
    public void setMeetingPassword(String meetingPassword) { this.meetingPassword = meetingPassword; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
    public Timestamp getActualStartTime() { return actualStartTime; }
    public void setActualStartTime(Timestamp actualStartTime) { this.actualStartTime = actualStartTime; }
    public Timestamp getActualEndTime() { return actualEndTime; }
    public void setActualEndTime(Timestamp actualEndTime) { this.actualEndTime = actualEndTime; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getPaymentIntentId() { return paymentIntentId; }
    public void setPaymentIntentId(String paymentIntentId) { this.paymentIntentId = paymentIntentId; }
    public Boolean getIsPackageSession() { return isPackageSession; }
    public void setIsPackageSession(Boolean isPackageSession) { this.isPackageSession = isPackageSession; }
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
    public String getTrainerNotes() { return trainerNotes; }
    public void setTrainerNotes(String trainerNotes) { this.trainerNotes = trainerNotes; }
    public String getClientNotes() { return clientNotes; }
    public void setClientNotes(String clientNotes) { this.clientNotes = clientNotes; }
    public String getSessionSummary() { return sessionSummary; }
    public void setSessionSummary(String sessionSummary) { this.sessionSummary = sessionSummary; }
    public Integer getClientRating() { return clientRating; }
    public void setClientRating(Integer clientRating) { this.clientRating = clientRating; }
    public String getClientFeedback() { return clientFeedback; }
    public void setClientFeedback(String clientFeedback) { this.clientFeedback = clientFeedback; }
    public Integer getTrainerRating() { return trainerRating; }
    public void setTrainerRating(Integer trainerRating) { this.trainerRating = trainerRating; }
    public String getTrainerFeedback() { return trainerFeedback; }
    public void setTrainerFeedback(String trainerFeedback) { this.trainerFeedback = trainerFeedback; }
    public Boolean getReminderSent() { return reminderSent; }
    public void setReminderSent(Boolean reminderSent) { this.reminderSent = reminderSent; }
    public Timestamp getReminderSentAt() { return reminderSentAt; }
    public void setReminderSentAt(Timestamp reminderSentAt) { this.reminderSentAt = reminderSentAt; }
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
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    // Business methods
    public void updateTimestamp() {
        this.updatedAt = Timestamp.now();
    }

    public void confirm() {
        this.status = "CONFIRMED";
        this.updateTimestamp();
    }

    public void start() {
        this.status = "IN_PROGRESS";
        this.actualStartTime = Timestamp.now();
        this.updateTimestamp();
    }

    public void complete() {
        this.status = "COMPLETED";
        this.actualEndTime = Timestamp.now();
        this.updateTimestamp();
    }

    public void cancel(String reason) {
        this.status = "CANCELLED";
        this.cancellationReason = reason;
        this.updateTimestamp();
    }

    public void markNoShow() {
        this.status = "NO_SHOW";
        this.updateTimestamp();
    }

    public boolean canBeCancelled() {
        return "SCHEDULED".equals(this.status) || "CONFIRMED".equals(this.status);
    }

    public boolean canBeStarted() {
        return "CONFIRMED".equals(this.status) || "SCHEDULED".equals(this.status);
    }

    public boolean canBeCompleted() {
        return "IN_PROGRESS".equals(this.status);
    }

    public boolean isUpcoming() {
        if (this.scheduledStartTime == null) {
            return false;
        }
        return this.scheduledStartTime.compareTo(Timestamp.now()) > 0 && 
               ("SCHEDULED".equals(this.status) || "CONFIRMED".equals(this.status));
    }

    public boolean isPast() {
        if (this.scheduledEndTime == null) {
            return false;
        }
        return this.scheduledEndTime.compareTo(Timestamp.now()) < 0;
    }

    public Long getDurationInMinutes() {
        if (this.actualStartTime != null && this.actualEndTime != null) {
            return (this.actualEndTime.getSeconds() - this.actualStartTime.getSeconds()) / 60;
        } else if (this.durationMinutes != null) {
            return this.durationMinutes.longValue();
        }
        return null;
    }

    public void sendReminder() {
        this.reminderSent = true;
        this.reminderSentAt = Timestamp.now();
        this.updateTimestamp();
    }

    public void markPaymentPaid() {
        this.paymentStatus = "PAID";
        this.updateTimestamp();
    }

    public void markPaymentFailed() {
        this.paymentStatus = "FAILED";
        this.updateTimestamp();
    }

    public void addClientRating(Integer rating, String feedback) {
        this.clientRating = rating;
        this.clientFeedback = feedback;
        this.updateTimestamp();
    }

    public void addTrainerRating(Integer rating, String feedback) {
        this.trainerRating = rating;
        this.trainerFeedback = feedback;
        this.updateTimestamp();
    }
}

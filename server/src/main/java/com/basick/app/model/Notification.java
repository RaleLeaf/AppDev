package com.basick.app.model;

import com.google.cloud.Timestamp;
import java.util.Map;
import java.util.HashMap;

/**
 * Notification model representing user notifications in the fitness app
 */
public class Notification {
    private String id;
    private String userId;
    private String title;
    private String message;
    private String type; // workout_reminder, social_interaction, appointment, system, etc.
    private String priority; // high, medium, low
    private boolean isRead;
    private String actionType; // view_post, view_workout, view_appointment, etc.
    private String actionData; // JSON string or specific data for the action
    private String senderUserId; // ID of user who triggered the notification (for social notifications)
    private String senderUserName;
    private String senderUserProfilePicture;
    private String relatedEntityId; // ID of post, workout, appointment, etc.
    private String relatedEntityType; // post, workout, appointment, etc.
    private Map<String, Object> metadata; // Additional data
    private boolean isPushSent;
    private boolean isEmailSent;
    private Timestamp scheduledAt; // For scheduled notifications
    private Timestamp readAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Constructors
    public Notification() {
        this.metadata = new HashMap<>();
        this.isRead = false;
        this.isPushSent = false;
        this.isEmailSent = false;
        this.priority = "medium";
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Notification(String userId, String title, String message, String type) {
        this();
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
    }

    public Notification(String id, String userId, String title, String message, String type, 
                       boolean isRead, Timestamp createdAt) {
        this(userId, title, message, type);
        this.id = id;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    // Business methods
    public void markAsRead() {
        this.isRead = true;
        this.readAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public void markAsUnread() {
        this.isRead = false;
        this.readAt = null;
        this.updatedAt = Timestamp.now();
    }

    public boolean isHighPriority() {
        return "high".equalsIgnoreCase(this.priority);
    }

    public boolean isMediumPriority() {
        return "medium".equalsIgnoreCase(this.priority);
    }

    public boolean isLowPriority() {
        return "low".equalsIgnoreCase(this.priority);
    }

    public boolean isScheduled() {
        return scheduledAt != null && scheduledAt.toDate().after(new java.util.Date());
    }

    public boolean hasAction() {
        return actionType != null && !actionType.trim().isEmpty();
    }

    public boolean isSocialNotification() {
        return senderUserId != null && !senderUserId.trim().isEmpty();
    }

    public long getTimeSinceCreated() {
        if (createdAt == null) return 0;
        return System.currentTimeMillis() - createdAt.toDate().getTime();
    }

    public void addMetadata(String key, Object value) {
        if (this.metadata == null) {
            this.metadata = new HashMap<>();
        }
        this.metadata.put(key, value);
        this.updatedAt = Timestamp.now();
    }

    public Object getMetadata(String key) {
        return this.metadata != null ? this.metadata.get(key) : null;
    }

    public void setSender(String senderUserId, String senderUserName, String senderUserProfilePicture) {
        this.senderUserId = senderUserId;
        this.senderUserName = senderUserName;
        this.senderUserProfilePicture = senderUserProfilePicture;
        this.updatedAt = Timestamp.now();
    }

    public void setRelatedEntity(String entityId, String entityType) {
        this.relatedEntityId = entityId;
        this.relatedEntityType = entityType;
        this.updatedAt = Timestamp.now();
    }

    public void setAction(String actionType, String actionData) {
        this.actionType = actionType;
        this.actionData = actionData;
        this.updatedAt = Timestamp.now();
    }

    public void markPushSent() {
        this.isPushSent = true;
        this.updatedAt = Timestamp.now();
    }

    public void markEmailSent() {
        this.isEmailSent = true;
        this.updatedAt = Timestamp.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { 
        this.title = title; 
        this.updatedAt = Timestamp.now();
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { 
        this.message = message; 
        this.updatedAt = Timestamp.now();
    }

    public String getType() { return type; }
    public void setType(String type) { 
        this.type = type; 
        this.updatedAt = Timestamp.now();
    }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { 
        this.priority = priority; 
        this.updatedAt = Timestamp.now();
    }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { 
        this.isRead = read; 
        if (read && this.readAt == null) {
            this.readAt = Timestamp.now();
        } else if (!read) {
            this.readAt = null;
        }
        this.updatedAt = Timestamp.now();
    }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { 
        this.actionType = actionType; 
        this.updatedAt = Timestamp.now();
    }

    public String getActionData() { return actionData; }
    public void setActionData(String actionData) { 
        this.actionData = actionData; 
        this.updatedAt = Timestamp.now();
    }

    public String getSenderUserId() { return senderUserId; }
    public void setSenderUserId(String senderUserId) { 
        this.senderUserId = senderUserId; 
        this.updatedAt = Timestamp.now();
    }

    public String getSenderUserName() { return senderUserName; }
    public void setSenderUserName(String senderUserName) { 
        this.senderUserName = senderUserName; 
        this.updatedAt = Timestamp.now();
    }

    public String getSenderUserProfilePicture() { return senderUserProfilePicture; }
    public void setSenderUserProfilePicture(String senderUserProfilePicture) { 
        this.senderUserProfilePicture = senderUserProfilePicture; 
        this.updatedAt = Timestamp.now();
    }

    public String getRelatedEntityId() { return relatedEntityId; }
    public void setRelatedEntityId(String relatedEntityId) { 
        this.relatedEntityId = relatedEntityId; 
        this.updatedAt = Timestamp.now();
    }

    public String getRelatedEntityType() { return relatedEntityType; }
    public void setRelatedEntityType(String relatedEntityType) { 
        this.relatedEntityType = relatedEntityType; 
        this.updatedAt = Timestamp.now();
    }

    public Map<String, Object> getMetadata() { return metadata; }
    public void setMetadata(Map<String, Object> metadata) { 
        this.metadata = metadata; 
        this.updatedAt = Timestamp.now();
    }

    public boolean isPushSent() { return isPushSent; }
    public void setPushSent(boolean pushSent) { 
        this.isPushSent = pushSent; 
        this.updatedAt = Timestamp.now();
    }

    public boolean isEmailSent() { return isEmailSent; }
    public void setEmailSent(boolean emailSent) { 
        this.isEmailSent = emailSent; 
        this.updatedAt = Timestamp.now();
    }

    public Timestamp getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(Timestamp scheduledAt) { 
        this.scheduledAt = scheduledAt; 
        this.updatedAt = Timestamp.now();
    }

    public Timestamp getReadAt() { return readAt; }
    public void setReadAt(Timestamp readAt) { 
        this.readAt = readAt; 
        this.updatedAt = Timestamp.now();
    }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}

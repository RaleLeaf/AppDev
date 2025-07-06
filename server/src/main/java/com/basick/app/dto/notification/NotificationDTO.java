package com.basick.app.dto.notification;

import com.google.cloud.Timestamp;
import java.util.Map;

/**
 * DTO for Notification responses
 */
public class NotificationDTO {
    private String id;
    private String userId;
    private String title;
    private String message;
    private String type;
    private String priority;
    private boolean isRead;
    private String actionType;
    private String actionData;
    private String senderUserId;
    private String senderUserName;
    private String senderUserProfilePicture;
    private String relatedEntityId;
    private String relatedEntityType;
    private Map<String, Object> metadata;
    private boolean isPushSent;
    private boolean isEmailSent;
    private Timestamp scheduledAt;
    private Timestamp readAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Constructors
    public NotificationDTO() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getActionData() { return actionData; }
    public void setActionData(String actionData) { this.actionData = actionData; }

    public String getSenderUserId() { return senderUserId; }
    public void setSenderUserId(String senderUserId) { this.senderUserId = senderUserId; }

    public String getSenderUserName() { return senderUserName; }
    public void setSenderUserName(String senderUserName) { this.senderUserName = senderUserName; }

    public String getSenderUserProfilePicture() { return senderUserProfilePicture; }
    public void setSenderUserProfilePicture(String senderUserProfilePicture) { this.senderUserProfilePicture = senderUserProfilePicture; }

    public String getRelatedEntityId() { return relatedEntityId; }
    public void setRelatedEntityId(String relatedEntityId) { this.relatedEntityId = relatedEntityId; }

    public String getRelatedEntityType() { return relatedEntityType; }
    public void setRelatedEntityType(String relatedEntityType) { this.relatedEntityType = relatedEntityType; }

    public Map<String, Object> getMetadata() { return metadata; }
    public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }

    public boolean isPushSent() { return isPushSent; }
    public void setPushSent(boolean pushSent) { isPushSent = pushSent; }

    public boolean isEmailSent() { return isEmailSent; }
    public void setEmailSent(boolean emailSent) { isEmailSent = emailSent; }

    public Timestamp getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(Timestamp scheduledAt) { this.scheduledAt = scheduledAt; }

    public Timestamp getReadAt() { return readAt; }
    public void setReadAt(Timestamp readAt) { this.readAt = readAt; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}

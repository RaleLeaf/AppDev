package com.basick.app.dto.notification;

import com.google.cloud.Timestamp;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;

/**
 * Request DTO for creating a new Notification
 */
public class CreateNotificationRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Message is required")
    private String message;

    @NotBlank(message = "Type is required")
    private String type;

    private String priority = "medium";
    private String actionType;
    private String actionData;
    private String senderUserId;
    private String senderUserName;
    private String senderUserProfilePicture;
    private String relatedEntityId;
    private String relatedEntityType;
    private Map<String, Object> metadata;
    private Timestamp scheduledAt;

    // Constructors
    public CreateNotificationRequest() {}

    // Getters and Setters
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

    public Timestamp getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(Timestamp scheduledAt) { this.scheduledAt = scheduledAt; }
}

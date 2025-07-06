package com.basick.app.mapper;

import org.springframework.stereotype.Component;

import com.basick.app.dto.notification.NotificationDTO;
import com.basick.app.dto.notification.CreateNotificationRequest;
import com.basick.app.dto.notification.UpdateNotificationRequest;
import com.basick.app.model.Notification;

/**
 * Mapper for converting between Notification entities and DTOs
 */
@Component
public class NotificationMapper {

    /**
     * Convert Notification entity to NotificationDTO
     */
    public NotificationDTO toDTO(Notification notification) {
        if (notification == null) {
            return null;
        }

        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setUserId(notification.getUserId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setPriority(notification.getPriority());
        dto.setRead(notification.isRead());
        dto.setActionType(notification.getActionType());
        dto.setActionData(notification.getActionData());
        dto.setSenderUserId(notification.getSenderUserId());
        dto.setSenderUserName(notification.getSenderUserName());
        dto.setSenderUserProfilePicture(notification.getSenderUserProfilePicture());
        dto.setRelatedEntityId(notification.getRelatedEntityId());
        dto.setRelatedEntityType(notification.getRelatedEntityType());
        dto.setMetadata(notification.getMetadata());
        dto.setPushSent(notification.isPushSent());
        dto.setEmailSent(notification.isEmailSent());
        dto.setScheduledAt(notification.getScheduledAt());
        dto.setReadAt(notification.getReadAt());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setUpdatedAt(notification.getUpdatedAt());

        return dto;
    }

    /**
     * Convert CreateNotificationRequest to Notification entity
     */
    public Notification toEntity(CreateNotificationRequest request) {
        if (request == null) {
            return null;
        }

        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setType(request.getType());
        notification.setPriority(request.getPriority());
        notification.setActionType(request.getActionType());
        notification.setActionData(request.getActionData());
        notification.setSenderUserId(request.getSenderUserId());
        notification.setSenderUserName(request.getSenderUserName());
        notification.setSenderUserProfilePicture(request.getSenderUserProfilePicture());
        notification.setRelatedEntityId(request.getRelatedEntityId());
        notification.setRelatedEntityType(request.getRelatedEntityType());
        notification.setMetadata(request.getMetadata());
        notification.setScheduledAt(request.getScheduledAt());

        return notification;
    }

    /**
     * Update Notification entity from UpdateNotificationRequest
     */
    public void updateEntity(Notification notification, UpdateNotificationRequest request) {
        if (notification == null || request == null) {
            return;
        }

        if (request.getTitle() != null) {
            notification.setTitle(request.getTitle());
        }
        if (request.getMessage() != null) {
            notification.setMessage(request.getMessage());
        }
        if (request.getType() != null) {
            notification.setType(request.getType());
        }
        if (request.getPriority() != null) {
            notification.setPriority(request.getPriority());
        }
        if (request.getActionType() != null) {
            notification.setActionType(request.getActionType());
        }
        if (request.getActionData() != null) {
            notification.setActionData(request.getActionData());
        }
        if (request.getSenderUserId() != null) {
            notification.setSenderUserId(request.getSenderUserId());
        }
        if (request.getSenderUserName() != null) {
            notification.setSenderUserName(request.getSenderUserName());
        }
        if (request.getSenderUserProfilePicture() != null) {
            notification.setSenderUserProfilePicture(request.getSenderUserProfilePicture());
        }
        if (request.getRelatedEntityId() != null) {
            notification.setRelatedEntityId(request.getRelatedEntityId());
        }
        if (request.getRelatedEntityType() != null) {
            notification.setRelatedEntityType(request.getRelatedEntityType());
        }
        if (request.getMetadata() != null) {
            notification.setMetadata(request.getMetadata());
        }
        if (request.getIsRead() != null) {
            if (request.getIsRead()) {
                notification.markAsRead();
            } else {
                notification.markAsUnread();
            }
        }
        if (request.getScheduledAt() != null) {
            notification.setScheduledAt(request.getScheduledAt());
        }
    }

    /**
     * Create a new Notification entity with default values
     */
    public Notification createEntity(String userId, String title, String message, String type) {
        return new Notification(userId, title, message, type);
    }

    /**
     * Create a social notification
     */
    public Notification createSocialNotification(String userId, String title, String message, String type,
                                               String senderUserId, String senderUserName, String senderUserProfilePicture) {
        Notification notification = new Notification(userId, title, message, type);
        notification.setSender(senderUserId, senderUserName, senderUserProfilePicture);
        return notification;
    }

    /**
     * Create an action notification with related entity
     */
    public Notification createActionNotification(String userId, String title, String message, String type,
                                               String actionType, String actionData,
                                               String relatedEntityId, String relatedEntityType) {
        Notification notification = new Notification(userId, title, message, type);
        notification.setAction(actionType, actionData);
        notification.setRelatedEntity(relatedEntityId, relatedEntityType);
        return notification;
    }
}

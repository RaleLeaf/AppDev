package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.basick.app.dto.notification.NotificationDTO;
import com.basick.app.dto.notification.CreateNotificationRequest;
import com.basick.app.dto.notification.UpdateNotificationRequest;
import com.basick.app.mapper.NotificationMapper;
import com.basick.app.model.Notification;
import com.basick.app.repository.NotificationRepository;

/**
 * Service for Notification business logic
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationService(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    /**
     * Get all notifications
     */
    public List<NotificationDTO> getAllNotifications() {
        try {
            List<Notification> notifications = notificationRepository.findAll();
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications", e);
        }
    }

    /**
     * Get notification by ID
     */
    public NotificationDTO getNotificationById(String notificationId) {
        try {
            Notification notification = notificationRepository.findById(notificationId);
            return notification != null ? notificationMapper.toDTO(notification) : null;
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notification by ID: " + notificationId, e);
        }
    }

    /**
     * Create a new notification
     */
    public NotificationDTO createNotification(CreateNotificationRequest request) {
        try {
            Notification notification = notificationMapper.toEntity(request);
            Notification savedNotification = notificationRepository.save(notification);
            return notificationMapper.toDTO(savedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error creating notification", e);
        }
    }

    /**
     * Update notification
     */
    public NotificationDTO updateNotification(String notificationId, UpdateNotificationRequest request) {
        try {
            Notification existingNotification = notificationRepository.findById(notificationId);
            if (existingNotification == null) {
                return null;
            }

            notificationMapper.updateEntity(existingNotification, request);
            Notification updatedNotification = notificationRepository.update(existingNotification);
            return notificationMapper.toDTO(updatedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error updating notification: " + notificationId, e);
        }
    }

    /**
     * Delete notification
     */
    public boolean deleteNotification(String notificationId) {
        try {
            return notificationRepository.deleteById(notificationId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error deleting notification: " + notificationId, e);
        }
    }

    /**
     * Get notifications by user ID
     */
    public List<NotificationDTO> getNotificationsByUserId(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findByUserId(userId);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications for user: " + userId, e);
        }
    }

    /**
     * Get unread notifications by user ID
     */
    public List<NotificationDTO> getUnreadNotificationsByUserId(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findUnreadByUserId(userId);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving unread notifications for user: " + userId, e);
        }
    }

    /**
     * Get read notifications by user ID
     */
    public List<NotificationDTO> getReadNotificationsByUserId(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findReadByUserId(userId);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving read notifications for user: " + userId, e);
        }
    }

    /**
     * Get notifications by type
     */
    public List<NotificationDTO> getNotificationsByType(String type) {
        try {
            List<Notification> notifications = notificationRepository.findByType(type);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications by type: " + type, e);
        }
    }

    /**
     * Get notifications by user ID and type
     */
    public List<NotificationDTO> getNotificationsByUserIdAndType(String userId, String type) {
        try {
            List<Notification> notifications = notificationRepository.findByUserIdAndType(userId, type);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications for user: " + userId + " and type: " + type, e);
        }
    }

    /**
     * Get notifications by priority
     */
    public List<NotificationDTO> getNotificationsByPriority(String priority) {
        try {
            List<Notification> notifications = notificationRepository.findByPriority(priority);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications by priority: " + priority, e);
        }
    }

    /**
     * Get high priority notifications by user ID
     */
    public List<NotificationDTO> getHighPriorityNotificationsByUserId(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findHighPriorityByUserId(userId);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving high priority notifications for user: " + userId, e);
        }
    }

    /**
     * Get notifications by sender user ID
     */
    public List<NotificationDTO> getNotificationsBySenderUserId(String senderUserId) {
        try {
            List<Notification> notifications = notificationRepository.findBySenderUserId(senderUserId);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications by sender: " + senderUserId, e);
        }
    }

    /**
     * Get notifications by related entity
     */
    public List<NotificationDTO> getNotificationsByRelatedEntity(String relatedEntityId, String relatedEntityType) {
        try {
            List<Notification> notifications = notificationRepository.findByRelatedEntity(relatedEntityId, relatedEntityType);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving notifications by related entity: " + relatedEntityId, e);
        }
    }

    /**
     * Get recent notifications by user ID
     */
    public List<NotificationDTO> getRecentNotificationsByUserId(String userId, int limit) {
        try {
            List<Notification> notifications = notificationRepository.findRecentByUserId(userId, limit);
            return notifications.stream()
                    .map(notificationMapper::toDTO)
                    .toList();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving recent notifications for user: " + userId, e);
        }
    }

    /**
     * Mark notification as read
     */
    public NotificationDTO markAsRead(String notificationId) {
        try {
            Notification notification = notificationRepository.findById(notificationId);
            if (notification == null) {
                return null;
            }

            notification.markAsRead();
            Notification updatedNotification = notificationRepository.update(notification);
            return notificationMapper.toDTO(updatedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error marking notification as read: " + notificationId, e);
        }
    }

    /**
     * Mark notification as unread
     */
    public NotificationDTO markAsUnread(String notificationId) {
        try {
            Notification notification = notificationRepository.findById(notificationId);
            if (notification == null) {
                return null;
            }

            notification.markAsUnread();
            Notification updatedNotification = notificationRepository.update(notification);
            return notificationMapper.toDTO(updatedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error marking notification as unread: " + notificationId, e);
        }
    }

    /**
     * Mark all notifications as read for a user
     */
    public void markAllAsReadByUserId(String userId) {
        try {
            notificationRepository.markAllAsReadByUserId(userId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error marking all notifications as read for user: " + userId, e);
        }
    }

    /**
     * Delete all notifications for a user
     */
    public void deleteAllNotificationsByUserId(String userId) {
        try {
            notificationRepository.deleteAllByUserId(userId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error deleting all notifications for user: " + userId, e);
        }
    }

    /**
     * Count unread notifications by user ID
     */
    public long countUnreadNotificationsByUserId(String userId) {
        try {
            return notificationRepository.countUnreadByUserId(userId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error counting unread notifications for user: " + userId, e);
        }
    }

    /**
     * Count total notifications by user ID
     */
    public long countNotificationsByUserId(String userId) {
        try {
            return notificationRepository.countByUserId(userId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error counting notifications for user: " + userId, e);
        }
    }

    /**
     * Get total notification count
     */
    public long getNotificationCount() {
        try {
            return notificationRepository.count();
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error counting total notifications", e);
        }
    }

    /**
     * Create a social notification
     */
    public NotificationDTO createSocialNotification(String userId, String title, String message, String type,
                                                  String senderUserId, String senderUserName, String senderUserProfilePicture) {
        try {
            Notification notification = notificationMapper.createSocialNotification(
                    userId, title, message, type, senderUserId, senderUserName, senderUserProfilePicture);
            Notification savedNotification = notificationRepository.save(notification);
            return notificationMapper.toDTO(savedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error creating social notification", e);
        }
    }

    /**
     * Create an action notification
     */
    public NotificationDTO createActionNotification(String userId, String title, String message, String type,
                                                  String actionType, String actionData,
                                                  String relatedEntityId, String relatedEntityType) {
        try {
            Notification notification = notificationMapper.createActionNotification(
                    userId, title, message, type, actionType, actionData, relatedEntityId, relatedEntityType);
            Notification savedNotification = notificationRepository.save(notification);
            return notificationMapper.toDTO(savedNotification);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error creating action notification", e);
        }
    }

    /**
     * Create a workout reminder notification
     */
    public NotificationDTO createWorkoutReminder(String userId, String workoutName) {
        String title = "Workout Reminder";
        String message = "Don't forget your scheduled workout: " + workoutName;
        return createActionNotification(userId, title, message, "workout_reminder", 
                                      "view_workout", workoutName, null, "workout");
    }

    /**
     * Create a follow notification
     */
    public NotificationDTO createFollowNotification(String userId, String followerUserId, 
                                                  String followerUserName, String followerProfilePicture) {
        String title = "New Follower";
        String message = followerUserName + " started following you";
        return createSocialNotification(userId, title, message, "social_interaction",
                                      followerUserId, followerUserName, followerProfilePicture);
    }

    /**
     * Create a like notification
     */
    public NotificationDTO createLikeNotification(String userId, String likerUserId, 
                                                String likerUserName, String likerProfilePicture, 
                                                String postId) {
        String title = "Post Liked";
        String message = likerUserName + " liked your post";
        return createActionNotification(userId, title, message, "social_interaction",
                                      "view_post", postId, postId, "post");
    }

    /**
     * Create a comment notification
     */
    public NotificationDTO createCommentNotification(String userId, String commenterUserId, 
                                                   String commenterUserName, String commenterProfilePicture, 
                                                   String postId) {
        String title = "New Comment";
        String message = commenterUserName + " commented on your post";
        return createActionNotification(userId, title, message, "social_interaction",
                                      "view_post", postId, postId, "post");
    }

    /**
     * Create an appointment reminder notification
     */
    public NotificationDTO createAppointmentReminder(String userId, String appointmentId, 
                                                   String trainerName, String appointmentTime) {
        String title = "Appointment Reminder";
        String message = "You have an upcoming appointment with " + trainerName + " at " + appointmentTime;
        return createActionNotification(userId, title, message, "appointment",
                                      "view_appointment", appointmentId, appointmentId, "appointment");
    }

    /**
     * Check if notification exists
     */
    public boolean notificationExists(String notificationId) {
        try {
            return notificationRepository.existsById(notificationId);
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error checking if notification exists: " + notificationId, e);
        }
    }
}

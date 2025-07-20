package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.notification.NotificationDTO;
import com.basick.app.dto.notification.CreateNotificationRequest;
import com.basick.app.dto.notification.UpdateNotificationRequest;
import com.basick.app.service.NotificationService;

import jakarta.validation.Valid;

/**
 * REST controller for Notification operations
 */
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    /**
     * Get all notifications
     */
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getAllNotifications() {
        try {
            List<NotificationDTO> notifications = notificationService.getAllNotifications();
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notification by ID
     */
    @GetMapping("/{notificationId}")
    public ResponseEntity<NotificationDTO> getNotificationById(@PathVariable String notificationId) {
        try {
            NotificationDTO notification = notificationService.getNotificationById(notificationId);
            return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new notification
     */
    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@Valid @RequestBody CreateNotificationRequest request) {
        try {
            NotificationDTO notification = notificationService.createNotification(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update notification
     */
    @PutMapping("/{notificationId}")
    public ResponseEntity<NotificationDTO> updateNotification(
            @PathVariable String notificationId,
            @Valid @RequestBody UpdateNotificationRequest request) {
        try {
            NotificationDTO notification = notificationService.updateNotification(notificationId, request);
            return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete notification
     */
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String notificationId) {
        try {
            boolean deleted = notificationService.deleteNotification(notificationId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@PathVariable String userId) {
        System.out.println("🔍 Called /user/{userId} with: " + userId);
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsByUserId(userId);
            System.out.println("✅ Found " + notifications.size() + " notifications for user " + userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            e.printStackTrace(); // log full stack trace to console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Get unread notifications by user ID
     */
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotificationsByUserId(@PathVariable String userId) {
        try {
            List<NotificationDTO> notifications = notificationService.getUnreadNotificationsByUserId(userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get read notifications by user ID
     */
    @GetMapping("/user/{userId}/read")
    public ResponseEntity<List<NotificationDTO>> getReadNotificationsByUserId(@PathVariable String userId) {
        try {
            List<NotificationDTO> notifications = notificationService.getReadNotificationsByUserId(userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by type
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByType(@PathVariable String type) {
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsByType(type);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by user ID and type
     */
    @GetMapping("/user/{userId}/type/{type}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserIdAndType(
            @PathVariable String userId,
            @PathVariable String type) {
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsByUserIdAndType(userId, type);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by priority
     */
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByPriority(@PathVariable String priority) {
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsByPriority(priority);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get high priority notifications by user ID
     */
    @GetMapping("/user/{userId}/high-priority")
    public ResponseEntity<List<NotificationDTO>> getHighPriorityNotificationsByUserId(@PathVariable String userId) {
        try {
            List<NotificationDTO> notifications = notificationService.getHighPriorityNotificationsByUserId(userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by sender user ID
     */
    @GetMapping("/sender/{senderUserId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsBySenderUserId(@PathVariable String senderUserId) {
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsBySenderUserId(senderUserId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notifications by related entity
     */
    @GetMapping("/entity/{relatedEntityId}/type/{relatedEntityType}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByRelatedEntity(
            @PathVariable String relatedEntityId,
            @PathVariable String relatedEntityType) {
        try {
            List<NotificationDTO> notifications = notificationService.getNotificationsByRelatedEntity(relatedEntityId, relatedEntityType);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get recent notifications by user ID
     */
    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<List<NotificationDTO>> getRecentNotificationsByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = "20") int limit) {
        try {
            List<NotificationDTO> notifications = notificationService.getRecentNotificationsByUserId(userId, limit);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mark notification as read
     */
    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDTO> markAsRead(@PathVariable String notificationId) {
        try {
            NotificationDTO notification = notificationService.markAsRead(notificationId);
            return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mark notification as unread
     */
    @PatchMapping("/{notificationId}/unread")
    public ResponseEntity<NotificationDTO> markAsUnread(@PathVariable String notificationId) {
        try {
            NotificationDTO notification = notificationService.markAsUnread(notificationId);
            return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mark all notifications as read for a user
     */
    @PatchMapping("/user/{userId}/mark-all-read")
    public ResponseEntity<String> markAllAsReadByUserId(@PathVariable String userId) {
        try {
            notificationService.markAllAsReadByUserId(userId);
            return ResponseEntity.ok("All notifications marked as read");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error marking notifications as read");
        }
    }

    /**
     * Delete all notifications for a user
     */
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> deleteAllNotificationsByUserId(@PathVariable String userId) {
        try {
            notificationService.deleteAllNotificationsByUserId(userId);
            return ResponseEntity.ok("All notifications deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notifications");
        }
    }

    /**
     * Count unread notifications by user ID
     */
    @GetMapping("/user/{userId}/unread/count")
    public ResponseEntity<Object> countUnreadNotificationsByUserId(@PathVariable String userId) {
        try {
            long count = notificationService.countUnreadNotificationsByUserId(userId);
            return ResponseEntity.ok(java.util.Map.of("unreadCount", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Count total notifications by user ID
     */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Object> countNotificationsByUserId(@PathVariable String userId) {
        try {
            long count = notificationService.countNotificationsByUserId(userId);
            return ResponseEntity.ok(java.util.Map.of("totalCount", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get notification statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Object> getNotificationStats() {
        try {
            long count = notificationService.getNotificationCount();
            return ResponseEntity.ok(java.util.Map.of("totalNotifications", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a social notification
     */
    @PostMapping("/social")
    public ResponseEntity<NotificationDTO> createSocialNotification(
            @RequestParam String userId,
            @RequestParam String title,
            @RequestParam String message,
            @RequestParam String type,
            @RequestParam String senderUserId,
            @RequestParam String senderUserName,
            @RequestParam(required = false) String senderUserProfilePicture) {
        try {
            NotificationDTO notification = notificationService.createSocialNotification(
                    userId, title, message, type, senderUserId, senderUserName, senderUserProfilePicture);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create an action notification
     */
    @PostMapping("/action")
    public ResponseEntity<NotificationDTO> createActionNotification(
            @RequestParam String userId,
            @RequestParam String title,
            @RequestParam String message,
            @RequestParam String type,
            @RequestParam String actionType,
            @RequestParam(required = false) String actionData,
            @RequestParam(required = false) String relatedEntityId,
            @RequestParam(required = false) String relatedEntityType) {
        try {
            NotificationDTO notification = notificationService.createActionNotification(
                    userId, title, message, type, actionType, actionData, relatedEntityId, relatedEntityType);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a workout reminder notification
     */
    @PostMapping("/workout-reminder")
    public ResponseEntity<NotificationDTO> createWorkoutReminder(
            @RequestParam String userId,
            @RequestParam String workoutName) {
        try {
            NotificationDTO notification = notificationService.createWorkoutReminder(userId, workoutName);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a follow notification
     */
    @PostMapping("/follow")
    public ResponseEntity<NotificationDTO> createFollowNotification(
            @RequestParam String userId,
            @RequestParam String followerUserId,
            @RequestParam String followerUserName,
            @RequestParam(required = false) String followerProfilePicture) {
        try {
            NotificationDTO notification = notificationService.createFollowNotification(
                    userId, followerUserId, followerUserName, followerProfilePicture);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a like notification
     */
    @PostMapping("/like")
    public ResponseEntity<NotificationDTO> createLikeNotification(
            @RequestParam String userId,
            @RequestParam String likerUserId,
            @RequestParam String likerUserName,
            @RequestParam(required = false) String likerProfilePicture,
            @RequestParam String postId) {
        try {
            NotificationDTO notification = notificationService.createLikeNotification(
                    userId, likerUserId, likerUserName, likerProfilePicture, postId);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a comment notification
     */
    @PostMapping("/comment")
    public ResponseEntity<NotificationDTO> createCommentNotification(
            @RequestParam String userId,
            @RequestParam String commenterUserId,
            @RequestParam String commenterUserName,
            @RequestParam(required = false) String commenterProfilePicture,
            @RequestParam String postId) {
        try {
            NotificationDTO notification = notificationService.createCommentNotification(
                    userId, commenterUserId, commenterUserName, commenterProfilePicture, postId);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create an appointment reminder notification
     */
    @PostMapping("/appointment-reminder")
    public ResponseEntity<NotificationDTO> createAppointmentReminder(
            @RequestParam String userId,
            @RequestParam String appointmentId,
            @RequestParam String trainerName,
            @RequestParam String appointmentTime) {
        try {
            NotificationDTO notification = notificationService.createAppointmentReminder(
                    userId, appointmentId, trainerName, appointmentTime);
            return ResponseEntity.status(HttpStatus.CREATED).body(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

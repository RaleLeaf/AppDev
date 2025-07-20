package com.basick.app.repository;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Notification;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for Notification operations with Firestore
 */
@Repository
public class NotificationRepository {

    private static final String COLLECTION_NAME = "notifications";
    private final FirestoreService firestoreService;

    public NotificationRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save notification to Firestore
     */
    public Notification save(Notification notification) throws ExecutionException, InterruptedException {
        if (notification.getId() == null || notification.getId().isEmpty()) {
            String id = firestoreService.save(COLLECTION_NAME, notification);
            notification.setId(id);
        } else {
            firestoreService.saveWithId(COLLECTION_NAME, notification.getId(), notification);
        }
        return notification;
    }

    /**
     * Find notification by ID
     */
    public Notification findById(String notificationId) throws ExecutionException, InterruptedException {
        return firestoreService.findById(COLLECTION_NAME, notificationId, Notification.class);
    }

    /**
     * Find all notifications
     */
    public List<Notification> findAll() throws ExecutionException, InterruptedException {
            return firestoreService.findAll(COLLECTION_NAME, Notification.class);
        }

        /**
         * Find notifications by user ID
         */
        public List<Notification> findByUserId(String userId) throws ExecutionException, InterruptedException {
        System.out.println("🔍 Querying Firestore for userId = " + userId);

        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
            .collection(COLLECTION_NAME)
            .whereEqualTo("userId", userId)
            // .orderBy("createdAt", Query.Direction.DESCENDING)
            .get();

        List<Notification> results = new java.util.ArrayList<>();
        QuerySnapshot snapshot = query.get(); // 🔴 This is where it may hang

        System.out.println("✅ Firestore query complete, found: " + snapshot.size() + " documents");

        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : snapshot.getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }

        return results;
    }


    /**
     * Find notifications by user ID and read status
     */
    public List<Notification> findByUserIdAndReadStatus(String userId, boolean isRead) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("isRead", isRead)
                .orderBy("createdAt", Query.Direction.DESCENDING)
                .get();

        List<Notification> results = new java.util.ArrayList<>();
        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : query.get().getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }
        return results;
    }

    /**
     * Find notifications by type
     */
    public List<Notification> findByType(String type) throws ExecutionException, InterruptedException {
        return firestoreService.findByField(COLLECTION_NAME, "type", type, Notification.class);
    }

    /**
     * Find notifications by user ID and type
     */
    public List<Notification> findByUserIdAndType(String userId, String type) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("type", type)
                .orderBy("createdAt", Query.Direction.DESCENDING)
                .get();

        List<Notification> results = new java.util.ArrayList<>();
        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : query.get().getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }
        return results;
    }

    /**
     * Find notifications by priority
     */
    public List<Notification> findByPriority(String priority) throws ExecutionException, InterruptedException {
        return firestoreService.findByField(COLLECTION_NAME, "priority", priority, Notification.class);
    }

    /**
     * Find notifications by user ID and priority
     */
    public List<Notification> findByUserIdAndPriority(String userId, String priority) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("priority", priority)
                .orderBy("createdAt", Query.Direction.DESCENDING)
                .get();

        List<Notification> results = new java.util.ArrayList<>();
        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : query.get().getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }
        return results;
    }

    /**
     * Find notifications by sender user ID
     */
    public List<Notification> findBySenderUserId(String senderUserId) throws ExecutionException, InterruptedException {
        return firestoreService.findByField(COLLECTION_NAME, "senderUserId", senderUserId, Notification.class);
    }

    /**
     * Find notifications by related entity
     */
    public List<Notification> findByRelatedEntity(String relatedEntityId, String relatedEntityType) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("relatedEntityId", relatedEntityId)
                .whereEqualTo("relatedEntityType", relatedEntityType)
                .orderBy("createdAt", Query.Direction.DESCENDING)
                .get();

        List<Notification> results = new java.util.ArrayList<>();
        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : query.get().getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }
        return results;
    }

    /**
     * Find unread notifications by user ID
     */
    public List<Notification> findUnreadByUserId(String userId) throws ExecutionException, InterruptedException {
        return findByUserIdAndReadStatus(userId, false);
    }

    /**
     * Find read notifications by user ID
     */
    public List<Notification> findReadByUserId(String userId) throws ExecutionException, InterruptedException {
        return findByUserIdAndReadStatus(userId, true);
    }

    /**
     * Find high priority notifications by user ID
     */
    public List<Notification> findHighPriorityByUserId(String userId) throws ExecutionException, InterruptedException {
        return findByUserIdAndPriority(userId, "high");
    }

    /**
     * Find recent notifications by user ID with limit
     */
    public List<Notification> findRecentByUserId(String userId, int limit) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .orderBy("createdAt", Query.Direction.DESCENDING)
                .limit(limit)
                .get();

        List<Notification> results = new java.util.ArrayList<>();
        for (com.google.cloud.firestore.QueryDocumentSnapshot doc : query.get().getDocuments()) {
            Notification notification = doc.toObject(Notification.class);
            notification.setId(doc.getId());
            results.add(notification);
        }
        return results;
    }

    /**
     * Count unread notifications by user ID
     */
    public long countUnreadByUserId(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("isRead", false)
                .get();

        return query.get().size();
    }

    /**
     * Count total notifications by user ID
     */
    public long countByUserId(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get();

        return query.get().size();
    }

    /**
     * Count total notifications
     */
    public long count() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .get();

        return query.get().size();
    }

    /**
     * Update notification
     */
    public Notification update(Notification notification) throws ExecutionException, InterruptedException {
        if (notification.getId() == null) {
            throw new IllegalArgumentException("Notification ID cannot be null for update operation");
        }
        
        Map<String, Object> updates = convertToMap(notification);
        firestoreService.update(COLLECTION_NAME, notification.getId(), updates);
        return notification;
    }

    /**
     * Delete notification by ID
     */
    public boolean deleteById(String notificationId) throws ExecutionException, InterruptedException {
        try {
            firestoreService.delete(COLLECTION_NAME, notificationId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Delete all notifications by user ID
     */
    public void deleteAllByUserId(String userId) throws ExecutionException, InterruptedException {
        List<Notification> notifications = findByUserId(userId);
        for (Notification notification : notifications) {
            deleteById(notification.getId());
        }
    }

    /**
     * Mark all notifications as read for a user
     */
    public void markAllAsReadByUserId(String userId) throws ExecutionException, InterruptedException {
        List<Notification> unreadNotifications = findUnreadByUserId(userId);
        for (Notification notification : unreadNotifications) {
            notification.markAsRead();
            update(notification);
        }
    }

    /**
     * Check if notification exists
     */
    public boolean existsById(String notificationId) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = FirestoreClient.getFirestore()
                .collection(COLLECTION_NAME)
                .document(notificationId)
                .get()
                .get();
        
        return document.exists();
    }

    /**
     * Convert Notification to Map for Firestore updates
     */
    private Map<String, Object> convertToMap(Notification notification) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", notification.getUserId());
        map.put("title", notification.getTitle());
        map.put("message", notification.getMessage());
        map.put("type", notification.getType());
        map.put("priority", notification.getPriority());
        map.put("isRead", notification.isRead());
        map.put("actionType", notification.getActionType());
        map.put("actionData", notification.getActionData());
        map.put("senderUserId", notification.getSenderUserId());
        map.put("senderUserName", notification.getSenderUserName());
        map.put("senderUserProfilePicture", notification.getSenderUserProfilePicture());
        map.put("relatedEntityId", notification.getRelatedEntityId());
        map.put("relatedEntityType", notification.getRelatedEntityType());
        map.put("metadata", notification.getMetadata());
        map.put("isPushSent", notification.isPushSent());
        map.put("isEmailSent", notification.isEmailSent());
        map.put("scheduledAt", notification.getScheduledAt());
        map.put("readAt", notification.getReadAt());
        map.put("createdAt", notification.getCreatedAt());
        map.put("updatedAt", notification.getUpdatedAt());
        return map;
    }
}

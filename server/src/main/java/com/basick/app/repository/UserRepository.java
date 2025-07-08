package com.basick.app.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.User;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for User operations with Firestore
 */
@Repository
public class UserRepository {
    
    private static final String COLLECTION_NAME = "users";
    private final FirestoreService firestoreService;

    public UserRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a user to Firestore
     */
    public String save(User user) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, user);
    }

    /**
     * Save a user with specific ID
     */
    public void saveWithId(String userId, User user) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, userId, user);
    }

    /**
     * Update a user
     */
    public void update(String userId, User user) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, userId, user);
    }

    /**
     * Find user by ID
     */
    public User findById(String userId) throws ExecutionException, InterruptedException {
        return firestoreService.findById(COLLECTION_NAME, userId, User.class);
    }

    /**
     * Find all users
     */
    public List<User> findAll() throws ExecutionException, InterruptedException {
        return firestoreService.findAll(COLLECTION_NAME, User.class);
    }

    /**
     * Delete user by ID
     */
    public void delete(String userId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, userId);
    }

    /**
     * Find user by Firebase UID
     */
    public User findByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("firebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            User user = document.toObject(User.class);
            return user;
        }
        
        return null;
    }

    /**
     * Find user by email
     */
    public User findByEmail(String email) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("email", email).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            User user = document.toObject(User.class);
            return user;
        }
        
        return null;
    }

    /**
     * Find users by IDs
     */
    public List<User> findByIds(List<String> userIds) throws ExecutionException, InterruptedException {
        List<User> users = new ArrayList<>();
        
        if (userIds == null || userIds.isEmpty()) {
            return users;
        }

        // Firestore "in" queries are limited to 10 items
        int batchSize = 10;
        for (int i = 0; i < userIds.size(); i += batchSize) {
            List<String> batch = userIds.subList(i, Math.min(i + batchSize, userIds.size()));
            
            CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
            Query query = collection.whereIn("__name__", batch);
            
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            QuerySnapshot snapshot = querySnapshot.get();
            
            for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
                User user = document.toObject(User.class);
                users.add(user);
            }
        }
        
        return users;
    }

    /**
     * Search users by name or email
     */
    public List<User> searchByNameOrEmail(String searchQuery) throws ExecutionException, InterruptedException {
        List<User> users = new ArrayList<>();
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        
        // Search by name (case-insensitive contains search)
        // Note: Firestore doesn't support case-insensitive searches natively
        // This is a simplified implementation. In production, you might want to:
        // 1. Store lowercase versions of searchable fields
        // 2. Use a search service like Algolia
        // 3. Use Cloud Functions for more complex queries
        
        Query nameQuery = collection.whereGreaterThanOrEqualTo("name", searchQuery)
                                   .whereLessThanOrEqualTo("name", searchQuery + '\uf8ff')
                                   .limit(20);
        
        ApiFuture<QuerySnapshot> nameSnapshot = nameQuery.get();
        QuerySnapshot nameResults = nameSnapshot.get();
        
        for (QueryDocumentSnapshot document : nameResults.getDocuments()) {
            User user = document.toObject(User.class);
            users.add(user);
        }
        
        // Search by email
        Query emailQuery = collection.whereGreaterThanOrEqualTo("email", searchQuery)
                                    .whereLessThanOrEqualTo("email", searchQuery + '\uf8ff')
                                    .limit(20);
        
        ApiFuture<QuerySnapshot> emailSnapshot = emailQuery.get();
        QuerySnapshot emailResults = emailSnapshot.get();
        
        for (QueryDocumentSnapshot document : emailResults.getDocuments()) {
            User user = document.toObject(User.class);
            
            // Avoid duplicates - use firebaseUid for comparison since id is removed
            boolean alreadyAdded = users.stream().anyMatch(u -> u.getFirebaseUid().equals(user.getFirebaseUid()));
            if (!alreadyAdded) {
                users.add(user);
            }
        }
        
        return users;
    }

    /**
     * Find active users
     */
    public List<User> findActiveUsers() throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isActive", true);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            User user = document.toObject(User.class);
            users.add(user);
        }
        
        return users;
    }

    /**
     * Find users by role
     */
    public List<User> findByRole(String role) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("role", role);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            User user = document.toObject(User.class);
            users.add(user);
        }
        
        return users;
    }

    /**
     * Find users by subscription type
     */
    public List<User> findBySubscriptionType(String subscriptionType) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("subscriptionType", subscriptionType);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            User user = document.toObject(User.class);
            users.add(user);
        }
        
        return users;
    }

    /**
     * Update user by Firebase UID
     */
    public void updateByFirebaseUid(String firebaseUid, User user) throws ExecutionException, InterruptedException {
        // First find the user by Firebase UID to get the document ID
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("firebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            String documentId = document.getId();
            firestoreService.saveWithId(COLLECTION_NAME, documentId, user);
        }
    }

    /**
     * Delete user by Firebase UID
     */
    public void deleteByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        // First find the user by Firebase UID to get the document ID
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("firebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            String documentId = document.getId();
            firestoreService.delete(COLLECTION_NAME, documentId);
        }
    }

    /**
     * Find users by Firebase UIDs
     */
    public List<User> findByFirebaseUids(List<String> firebaseUids) throws ExecutionException, InterruptedException {
        List<User> users = new ArrayList<>();
        
        if (firebaseUids == null || firebaseUids.isEmpty()) {
            return users;
        }

        // Firestore "in" queries are limited to 10 items
        int batchSize = 10;
        for (int i = 0; i < firebaseUids.size(); i += batchSize) {
            List<String> batch = firebaseUids.subList(i, Math.min(i + batchSize, firebaseUids.size()));
            
            CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
            Query query = collection.whereIn("firebaseUid", batch);
            
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            QuerySnapshot snapshot = querySnapshot.get();
            
            for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
                User user = document.toObject(User.class);
                users.add(user);
            }
        }
        
        return users;
    }

    /**
     * Save user and return the document ID
     */
    public String saveUser(User user) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, user);
    }

    /**
     * Save user with specific document ID
     */
    public void saveUserWithId(String documentId, User user) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, documentId, user);
    }

    /**
     * Update user by document ID
     */
    public void updateUser(String documentId, User user) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, documentId, user);
    }

    /**
     * Delete user by document ID
     */
    public void deleteUser(String documentId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, documentId);
    }

    /**
     * Find user by document ID
     */
    public User findUserById(String documentId) throws ExecutionException, InterruptedException {
        return firestoreService.findById(COLLECTION_NAME, documentId, User.class);
    }

    /**
     * Find User document ID by Firebase UID
     */
    public String findUserDocumentIdByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("firebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            return document.getId();
        }
        
        return null;
    }
}

package com.basick.app.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Leaderboard;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for Leaderboard operations with Firestore
 */
@Repository
public class LeaderboardRepository {
    
    private static final String COLLECTION_NAME = "leaderboards";
    private final FirestoreService firestoreService;

    public LeaderboardRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a leaderboard to Firestore
     */
    public String save(Leaderboard leaderboard) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, leaderboard);
    }

    /**
     * Save a leaderboard with specific ID
     */
    public void saveWithId(String leaderboardId, Leaderboard leaderboard) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, leaderboardId, leaderboard);
    }

    /**
     * Update a leaderboard
     */
    public void update(String leaderboardId, Map<String, Object> updates) throws ExecutionException, InterruptedException {
        firestoreService.update(COLLECTION_NAME, leaderboardId, updates);
    }

    /**
     * Find a leaderboard by ID
     */
    public Leaderboard findById(String leaderboardId) throws ExecutionException, InterruptedException {
        Leaderboard leaderboard = firestoreService.findById(COLLECTION_NAME, leaderboardId, Leaderboard.class);
        if (leaderboard != null) {
            leaderboard.setId(leaderboardId);
        }
        return leaderboard;
    }

    /**
     * Delete a leaderboard
     */
    public void delete(String leaderboardId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, leaderboardId);
    }

    /**
     * Find all leaderboards
     */
    public List<Leaderboard> findAll() throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find leaderboards by category
     */
    public List<Leaderboard> findByCategory(String category) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("category", category);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find leaderboards by timeframe
     */
    public List<Leaderboard> findByTimeframe(String timeframe) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("timeframe", timeframe);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find leaderboards by category and timeframe
     */
    public List<Leaderboard> findByCategoryAndTimeframe(String category, String timeframe) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("category", category).whereEqualTo("timeframe", timeframe);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find active leaderboards
     */
    public List<Leaderboard> findActive() throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isActive", true);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find leaderboards by user ID
     */
    public List<Leaderboard> findByUserId(String userId) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find leaderboards by category and timeframe, ordered by rank
     */
    public List<Leaderboard> findByCategoryAndTimeframeOrderByRank(String category, String timeframe) throws ExecutionException, InterruptedException {
        List<Leaderboard> leaderboards = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection
            .whereEqualTo("category", category)
            .whereEqualTo("timeframe", timeframe)
            .orderBy("rank");
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            leaderboards.add(leaderboard);
        }
        
        return leaderboards;
    }

    /**
     * Find user's rank in a specific category and timeframe
     */
    public Leaderboard findUserRank(String userId, String category, String timeframe) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection
            .whereEqualTo("userId", userId)
            .whereEqualTo("category", category)
            .whereEqualTo("timeframe", timeframe)
            .limit(1);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        if (!documents.isEmpty()) {
            QueryDocumentSnapshot document = documents.getDocuments().get(0);
            Leaderboard leaderboard = document.toObject(Leaderboard.class);
            leaderboard.setId(document.getId());
            return leaderboard;
        }
        
        return null;
    }

    /**
     * Count total leaderboards
     */
    public long count() throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        return documents.size();
    }

    /**
     * Check if leaderboard exists
     */
    public boolean exists(String leaderboardId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<DocumentSnapshot> future = collection.document(leaderboardId).get();
        DocumentSnapshot document = future.get();
        return document.exists();
    }

    /**
     * Update leaderboard with entity
     */
    public void updateEntity(String leaderboardId, Leaderboard leaderboard) throws ExecutionException, InterruptedException {
        Map<String, Object> updates = new HashMap<>();
        if (leaderboard.getUserName() != null) updates.put("userName", leaderboard.getUserName());
        if (leaderboard.getUserProfilePicture() != null) updates.put("userProfilePicture", leaderboard.getUserProfilePicture());
        if (leaderboard.getCategory() != null) updates.put("category", leaderboard.getCategory());
        if (leaderboard.getTimeframe() != null) updates.put("timeframe", leaderboard.getTimeframe());
        if (leaderboard.getRank() != null) updates.put("rank", leaderboard.getRank());
        if (leaderboard.getPreviousRank() != null) updates.put("previousRank", leaderboard.getPreviousRank());
        if (leaderboard.getScore() != null) updates.put("score", leaderboard.getScore());
        if (leaderboard.getUnit() != null) updates.put("unit", leaderboard.getUnit());
        if (leaderboard.getIsActive() != null) updates.put("isActive", leaderboard.getIsActive());
        updates.put("updatedAt", leaderboard.getUpdatedAt());
        
        update(leaderboardId, updates);
    }
}

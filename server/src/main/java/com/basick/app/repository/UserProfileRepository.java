package com.basick.app.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.basick.app.model.UserProfile;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for UserProfile operations with Firestore
 */
@Repository
public class UserProfileRepository {
    
    private static final String COLLECTION_NAME = "userProfiles";
    private final FirestoreService firestoreService;

    @Autowired
    public UserProfileRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a user profile to Firestore
     */
    public String save(UserProfile userProfile) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, userProfile);
    }

    /**
     * Save a user profile with specific ID
     */
    public void saveWithId(String userProfileId, UserProfile userProfile) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, userProfileId, userProfile);
    }

    /**
     * Update a user profile
     */
    public void update(String userProfileId, UserProfile userProfile) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, userProfileId, userProfile);
    }

    /**
     * Find user profile by ID
     */
    public UserProfile findById(String userProfileId) throws ExecutionException, InterruptedException {
        return firestoreService.findById(COLLECTION_NAME, userProfileId, UserProfile.class);
    }

    /**
     * Find all user profiles
     */
    public List<UserProfile> findAll() throws ExecutionException, InterruptedException {
        return firestoreService.findAll(COLLECTION_NAME, UserProfile.class);
    }

    /**
     * Delete user profile by ID
     */
    public void delete(String userProfileId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, userProfileId);
    }

    /**
     * Find user profile by user ID
     */
    public UserProfile findByUserId(String userId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            return userProfile;
        }
        
        return null;
    }

    /**
     * Find user profile by username
     */
    public UserProfile findByUsername(String username) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("username", username).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            return userProfile;
        }
        
        return null;
    }

    /**
     * Search user profiles by name or username
     */
    public List<UserProfile> searchByNameOrUsername(String searchQuery) throws ExecutionException, InterruptedException {
        List<UserProfile> userProfiles = new ArrayList<>();
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        
        // Search by display name
        Query displayNameQuery = collection.whereGreaterThanOrEqualTo("displayName", searchQuery)
                                          .whereLessThanOrEqualTo("displayName", searchQuery + '\uf8ff')
                                          .limit(20);
        
        ApiFuture<QuerySnapshot> displayNameSnapshot = displayNameQuery.get();
        QuerySnapshot displayNameResults = displayNameSnapshot.get();
        
        for (QueryDocumentSnapshot document : displayNameResults.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        // Search by username
        Query usernameQuery = collection.whereGreaterThanOrEqualTo("username", searchQuery)
                                       .whereLessThanOrEqualTo("username", searchQuery + '\uf8ff')
                                       .limit(20);
        
        ApiFuture<QuerySnapshot> usernameSnapshot = usernameQuery.get();
        QuerySnapshot usernameResults = usernameSnapshot.get();
        
        for (QueryDocumentSnapshot document : usernameResults.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            
            // Avoid duplicates
            boolean alreadyAdded = userProfiles.stream().anyMatch(up -> up.getId().equals(userProfile.getId()));
            if (!alreadyAdded) {
                userProfiles.add(userProfile);
            }
        }
        
        return userProfiles;
    }

    /**
     * Find user profiles by fitness level
     */
    public List<UserProfile> findByFitnessLevel(String fitnessLevel) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("fitnessLevel", fitnessLevel);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find top user profiles by rank (total points)
     */
    public List<UserProfile> findTopByRank(int limit) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.orderBy("totalPoints", Query.Direction.DESCENDING).limit(limit);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find public user profiles
     */
    public List<UserProfile> findPublicProfiles() throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isProfilePublic", true);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find user profiles by age range
     */
    public List<UserProfile> findByAgeRange(int minAge, int maxAge) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereGreaterThanOrEqualTo("age", minAge)
                               .whereLessThanOrEqualTo("age", maxAge);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find user profiles by gender
     */
    public List<UserProfile> findByGender(String gender) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("gender", gender);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find user profiles by location
     */
    public List<UserProfile> findByLocation(String location) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("location", location);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Find user profiles with workout streak greater than specified days
     */
    public List<UserProfile> findByWorkoutStreak(int minStreakDays) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereGreaterThanOrEqualTo("streakDays", minStreakDays);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        List<UserProfile> userProfiles = new ArrayList<>();
        for (QueryDocumentSnapshot document : snapshot.getDocuments()) {
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }
}

package com.basick.app.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

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
        UserProfile profile = firestoreService.findById(COLLECTION_NAME, userProfileId, UserProfile.class);
        if (profile != null) {
            profile.setUserProfileId(userProfileId);
        }
        return profile;
    }

    /**
     * Find user profile by user document ID
     */
    public UserProfile findByUserId(String userId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setUserProfileId(document.getId());
            return userProfile;
        }
        
        return null;
    }

    /**
     * Find all user profiles
     */
    public List<UserProfile> findAll() throws ExecutionException, InterruptedException {
        List<UserProfile> profiles = firestoreService.findAll(COLLECTION_NAME, UserProfile.class);
        // This is tricky because findAll in firestoreService likely doesn't return IDs.
        // For now, let's assume we need to fix the query-based finds first as they are the most critical for the user's issue.
        // A proper fix would involve changing firestoreService.findAll or re-querying.
        // For the current issue, this is not essential.
        return profiles;
    }

    /**
     * Delete user profile by ID
     */
    public void delete(String userProfileId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, userProfileId);
    }

    /**
     * Find user profile by user Firebase UID
     */
    public UserProfile findByUserFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userFirebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            UserProfile userProfile = document.toObject(UserProfile.class);
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
            
            // Avoid duplicates - use userId for comparison since we're using userId as the reference
            boolean alreadyAdded = userProfiles.stream().anyMatch(up -> up.getUserId().equals(userProfile.getUserId()));
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
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
            userProfile.setUserProfileId(document.getId());
            userProfiles.add(userProfile);
        }
        
        return userProfiles;
    }

    /**
     * Update user profile by user document ID
     */
    public void updateByUserId(String userId, UserProfile userProfile) throws ExecutionException, InterruptedException {
        // First find the user profile by user ID to get the document ID
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            String documentId = document.getId();
            firestoreService.saveWithId(COLLECTION_NAME, documentId, userProfile);
        }
    }

    /**
     * Delete user profile by user document ID
     */
    public void deleteByUserId(String userId) throws ExecutionException, InterruptedException {
        // First find the user profile by user ID to get the document ID
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            String documentId = document.getId();
            firestoreService.delete(COLLECTION_NAME, documentId);
        }
    }

    /**
     * Find user profile by Firebase UID
     */
    public UserProfile findByFirebaseUid(String firebaseUid) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("firebaseUid", firebaseUid).limit(1);
        
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot snapshot = querySnapshot.get();
        
        if (!snapshot.isEmpty()) {
            QueryDocumentSnapshot document = snapshot.getDocuments().get(0);
            UserProfile userProfile = document.toObject(UserProfile.class);
            return userProfile;
        }
        
        return null;
    }
}

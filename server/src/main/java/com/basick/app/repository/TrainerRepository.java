package com.basick.app.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Trainer;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for Trainer operations with Firestore
 */
@Repository
public class TrainerRepository {
    
    private static final String COLLECTION_NAME = "trainers";
    private final FirestoreService firestoreService;

    public TrainerRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save a trainer to Firestore
     */
    public String save(Trainer trainer) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, trainer);
    }

    /**
     * Save a trainer with specific ID
     */
    public void saveWithId(String trainerId, Trainer trainer) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, trainerId, trainer);
    }

    /**
     * Update a trainer
     */
    public void update(String trainerId, Map<String, Object> updates) throws ExecutionException, InterruptedException {
        firestoreService.update(COLLECTION_NAME, trainerId, updates);
    }

    /**
     * Find a trainer by ID
     */
    public Trainer findById(String trainerId) throws ExecutionException, InterruptedException {
        Trainer trainer = firestoreService.findById(COLLECTION_NAME, trainerId, Trainer.class);
        if (trainer != null) {
            trainer.setId(trainerId);
        }
        return trainer;
    }

    /**
     * Delete a trainer
     */
    public void delete(String trainerId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, trainerId);
    }

    /**
     * Find all trainers
     */
    public List<Trainer> findAll() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find trainer by user ID
     */
    public Trainer findByUserId(String userId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("userId", userId).limit(1);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        if (!documents.isEmpty()) {
            QueryDocumentSnapshot document = documents.getDocuments().get(0);
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            return trainer;
        }
        
        return null;
    }

    /**
     * Find trainers by specialization
     */
    public List<Trainer> findBySpecialization(String specialization) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereArrayContains("specializations", specialization);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find trainers by location
     */
    public List<Trainer> findByLocation(String location) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("location", location);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find verified trainers
     */
    public List<Trainer> findVerified() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isVerified", true);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find trainers accepting new clients
     */
    public List<Trainer> findAcceptingNewClients() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isAcceptingNewClients", true);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find trainers by verification status
     */
    public List<Trainer> findByVerificationStatus(String verificationStatus) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("verificationStatus", verificationStatus);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find online trainers
     */
    public List<Trainer> findOnlineTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isAvailableOnline", true);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find in-person trainers
     */
    public List<Trainer> findInPersonTrainers() throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("isAvailableInPerson", true);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Find top-rated trainers
     */
    public List<Trainer> findTopRated(int limit) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.orderBy("averageRating", Query.Direction.DESCENDING).limit(limit);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Search trainers by business name
     */
    public List<Trainer> searchByBusinessName(String businessName) throws ExecutionException, InterruptedException {
        List<Trainer> trainers = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection
            .whereGreaterThanOrEqualTo("businessName", businessName)
            .whereLessThanOrEqualTo("businessName", businessName + "\uf8ff");
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Trainer trainer = document.toObject(Trainer.class);
            trainer.setId(document.getId());
            trainers.add(trainer);
        }
        
        return trainers;
    }

    /**
     * Count total trainers
     */
    public long count() throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        return documents.size();
    }

    /**
     * Check if trainer exists
     */
    public boolean exists(String trainerId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<DocumentSnapshot> future = collection.document(trainerId).get();
        DocumentSnapshot document = future.get();
        return document.exists();
    }

    /**
     * Update trainer with entity
     */
    public void updateEntity(String trainerId, Trainer trainer) throws ExecutionException, InterruptedException {
        Map<String, Object> updates = new HashMap<>();
        if (trainer.getBusinessName() != null) updates.put("businessName", trainer.getBusinessName());
        if (trainer.getBio() != null) updates.put("bio", trainer.getBio());
        if (trainer.getProfilePictureUrl() != null) updates.put("profilePictureUrl", trainer.getProfilePictureUrl());
        if (trainer.getCertifications() != null) updates.put("certifications", trainer.getCertifications());
        if (trainer.getSpecializations() != null) updates.put("specializations", trainer.getSpecializations());
        if (trainer.getExperienceYears() != null) updates.put("experienceYears", trainer.getExperienceYears());
        if (trainer.getPhoneNumber() != null) updates.put("phoneNumber", trainer.getPhoneNumber());
        if (trainer.getEmail() != null) updates.put("email", trainer.getEmail());
        if (trainer.getWebsite() != null) updates.put("website", trainer.getWebsite());
        if (trainer.getLocation() != null) updates.put("location", trainer.getLocation());
        if (trainer.getTimezone() != null) updates.put("timezone", trainer.getTimezone());
        if (trainer.getIsAvailableOnline() != null) updates.put("isAvailableOnline", trainer.getIsAvailableOnline());
        if (trainer.getIsAvailableInPerson() != null) updates.put("isAvailableInPerson", trainer.getIsAvailableInPerson());
        if (trainer.getHourlyRate() != null) updates.put("hourlyRate", trainer.getHourlyRate());
        if (trainer.getPackageRate() != null) updates.put("packageRate", trainer.getPackageRate());
        if (trainer.getCurrency() != null) updates.put("currency", trainer.getCurrency());
        if (trainer.getServicePricing() != null) updates.put("servicePricing", trainer.getServicePricing());
        if (trainer.getAvailability() != null) updates.put("availability", trainer.getAvailability());
        if (trainer.getIsAcceptingNewClients() != null) updates.put("isAcceptingNewClients", trainer.getIsAcceptingNewClients());
        if (trainer.getMaxClientsPerSlot() != null) updates.put("maxClientsPerSlot", trainer.getMaxClientsPerSlot());
        if (trainer.getAverageRating() != null) updates.put("averageRating", trainer.getAverageRating());
        if (trainer.getTotalReviews() != null) updates.put("totalReviews", trainer.getTotalReviews());
        if (trainer.getTotalClients() != null) updates.put("totalClients", trainer.getTotalClients());
        if (trainer.getTotalSessions() != null) updates.put("totalSessions", trainer.getTotalSessions());
        if (trainer.getTestimonials() != null) updates.put("testimonials", trainer.getTestimonials());
        if (trainer.getBeforeAfterPhotos() != null) updates.put("beforeAfterPhotos", trainer.getBeforeAfterPhotos());
        if (trainer.getInstagramHandle() != null) updates.put("instagramHandle", trainer.getInstagramHandle());
        if (trainer.getYoutubeChannel() != null) updates.put("youtubeChannel", trainer.getYoutubeChannel());
        if (trainer.getIsVerified() != null) updates.put("isVerified", trainer.getIsVerified());
        if (trainer.getIsBackgroundChecked() != null) updates.put("isBackgroundChecked", trainer.getIsBackgroundChecked());
        if (trainer.getVerificationStatus() != null) updates.put("verificationStatus", trainer.getVerificationStatus());
        if (trainer.getVerificationDocuments() != null) updates.put("verificationDocuments", trainer.getVerificationDocuments());
        if (trainer.getCreatedWorkouts() != null) updates.put("createdWorkouts", trainer.getCreatedWorkouts());
        if (trainer.getCreatedPrograms() != null) updates.put("createdPrograms", trainer.getCreatedPrograms());
        if (trainer.getContentViews() != null) updates.put("contentViews", trainer.getContentViews());
        if (trainer.getContentLikes() != null) updates.put("contentLikes", trainer.getContentLikes());
        if (trainer.getIsSubscriptionBased() != null) updates.put("isSubscriptionBased", trainer.getIsSubscriptionBased());
        if (trainer.getMonthlySubscriptionRate() != null) updates.put("monthlySubscriptionRate", trainer.getMonthlySubscriptionRate());
        if (trainer.getStripeAccountId() != null) updates.put("stripeAccountId", trainer.getStripeAccountId());
        if (trainer.getIsPayoutEnabled() != null) updates.put("isPayoutEnabled", trainer.getIsPayoutEnabled());
        updates.put("updatedAt", trainer.getUpdatedAt());
        
        update(trainerId, updates);
    }
}

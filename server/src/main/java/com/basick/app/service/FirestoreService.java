package com.basick.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteBatch;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirestoreService {

    private final Firestore db;

    public FirestoreService() {
        this.db = FirestoreClient.getFirestore();
    }

    // Generic methods for CRUD operations
    public <T> String save(String collection, T data) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection(collection).add(data);
        DocumentReference documentReference = future.get();
        return documentReference.getId();
    }

    public <T> void saveWithId(String collection, String documentId, T data) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = db.collection(collection).document(documentId).set(data);
        future.get();
    }

    public <T> T findById(String collection, String documentId, Class<T> clazz) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(collection).document(documentId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            return document.toObject(clazz);
        }
        return null;
    }

    public <T> List<T> findAll(String collection, Class<T> clazz) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = db.collection(collection).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        
        List<T> results = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(clazz));
        }
        return results;
    }

    public <T> List<T> findByField(String collection, String field, Object value, Class<T> clazz) 
            throws ExecutionException, InterruptedException {
        Query query = db.collection(collection).whereEqualTo(field, value);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        
        List<T> results = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(clazz));
        }
        return results;
    }

    public void update(String collection, String documentId, Map<String, Object> updates) 
            throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = db.collection(collection).document(documentId).update(updates);
        future.get();
    }

    public void delete(String collection, String documentId) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = db.collection(collection).document(documentId).delete();
        future.get();
    }

    // Specific methods for user profiles
    public void saveUserProfile(String userId, Map<String, Object> profileData) 
            throws ExecutionException, InterruptedException {
        saveWithId("userProfiles", userId, profileData);
    }

    public Map<String, Object> getUserProfile(String userId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection("userProfiles").document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            return document.getData();
        }
        return null;
    }

    // Batch operations
    public void batchWrite(List<BatchOperation> operations) throws ExecutionException, InterruptedException {
        WriteBatch batch = db.batch();
        
        for (BatchOperation operation : operations) {
            DocumentReference docRef = db.collection(operation.getCollection()).document(operation.getDocumentId());
            switch (operation.getType()) {
                case SET:
                    batch.set(docRef, operation.getData());
                    break;
                case UPDATE:
                    batch.update(docRef, operation.getData());
                    break;
                case DELETE:
                    batch.delete(docRef);
                    break;
            }
        }
        
        ApiFuture<List<WriteResult>> future = batch.commit();
        future.get();
    }

    // Inner class for batch operations
    public static class BatchOperation {
        public enum Type { SET, UPDATE, DELETE }
        
        private String collection;
        private String documentId;
        private Map<String, Object> data;
        private Type type;

        public BatchOperation(String collection, String documentId, Map<String, Object> data, Type type) {
            this.collection = collection;
            this.documentId = documentId;
            this.data = data;
            this.type = type;
        }

        // Getters
        public String getCollection() { return collection; }
        public String getDocumentId() { return documentId; }
        public Map<String, Object> getData() { return data; }
        public Type getType() { return type; }
    }
}

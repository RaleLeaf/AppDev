package com.basick.app.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.basick.app.model.Appointment;
import com.basick.app.service.FirestoreService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

/**
 * Repository for Appointment operations with Firestore
 */
@Repository
public class AppointmentRepository {
    
    private static final String COLLECTION_NAME = "appointments";
    private final FirestoreService firestoreService;

    public AppointmentRepository(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    /**
     * Save an appointment to Firestore
     */
    public String save(Appointment appointment) throws ExecutionException, InterruptedException {
        return firestoreService.save(COLLECTION_NAME, appointment);
    }

    /**
     * Save an appointment with specific ID
     */
    public void saveWithId(String appointmentId, Appointment appointment) throws ExecutionException, InterruptedException {
        firestoreService.saveWithId(COLLECTION_NAME, appointmentId, appointment);
    }

    /**
     * Update an appointment
     */
    public void update(String appointmentId, Map<String, Object> updates) throws ExecutionException, InterruptedException {
        firestoreService.update(COLLECTION_NAME, appointmentId, updates);
    }

    /**
     * Find an appointment by ID
     */
    public Appointment findById(String appointmentId) throws ExecutionException, InterruptedException {
        Appointment appointment = firestoreService.findById(COLLECTION_NAME, appointmentId, Appointment.class);
        if (appointment != null) {
            appointment.setId(appointmentId);
        }
        return appointment;
    }

    /**
     * Delete an appointment
     */
    public void delete(String appointmentId) throws ExecutionException, InterruptedException {
        firestoreService.delete(COLLECTION_NAME, appointmentId);
    }

    /**
     * Find all appointments
     */
    public List<Appointment> findAll() throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by client ID
     */
    public List<Appointment> findByClientId(String clientId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("clientId", clientId);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by trainer ID
     */
    public List<Appointment> findByTrainerId(String trainerId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("trainerId", trainerId);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by status
     */
    public List<Appointment> findByStatus(String status) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("status", status);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by client ID and status
     */
    public List<Appointment> findByClientIdAndStatus(String clientId, String status) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("clientId", clientId).whereEqualTo("status", status);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by trainer ID and status
     */
    public List<Appointment> findByTrainerIdAndStatus(String trainerId, String status) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("trainerId", trainerId).whereEqualTo("status", status);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by service type
     */
    public List<Appointment> findByServiceType(String serviceType) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("serviceType", serviceType);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find appointments by payment status
     */
    public List<Appointment> findByPaymentStatus(String paymentStatus) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection.whereEqualTo("paymentStatus", paymentStatus);
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find upcoming appointments by client ID
     */
    public List<Appointment> findUpcomingByClientId(String clientId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection
            .whereEqualTo("clientId", clientId)
            .whereIn("status", List.of("SCHEDULED", "CONFIRMED"))
            .orderBy("scheduledStartTime");
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Find upcoming appointments by trainer ID
     */
    public List<Appointment> findUpcomingByTrainerId(String trainerId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = new ArrayList<>();
        
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        Query query = collection
            .whereEqualTo("trainerId", trainerId)
            .whereIn("status", List.of("SCHEDULED", "CONFIRMED"))
            .orderBy("scheduledStartTime");
        
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        
        for (QueryDocumentSnapshot document : documents.getDocuments()) {
            Appointment appointment = document.toObject(Appointment.class);
            appointment.setId(document.getId());
            appointments.add(appointment);
        }
        
        return appointments;
    }

    /**
     * Count total appointments
     */
    public long count() throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();
        return documents.size();
    }

    /**
     * Check if appointment exists
     */
    public boolean exists(String appointmentId) throws ExecutionException, InterruptedException {
        CollectionReference collection = FirestoreClient.getFirestore().collection(COLLECTION_NAME);
        ApiFuture<DocumentSnapshot> future = collection.document(appointmentId).get();
        DocumentSnapshot document = future.get();
        return document.exists();
    }

    /**
     * Update appointment with entity
     */
    public void updateEntity(String appointmentId, Appointment appointment) throws ExecutionException, InterruptedException {
        Map<String, Object> updates = new HashMap<>();
        if (appointment.getTitle() != null) updates.put("title", appointment.getTitle());
        if (appointment.getDescription() != null) updates.put("description", appointment.getDescription());
        if (appointment.getServiceType() != null) updates.put("serviceType", appointment.getServiceType());
        if (appointment.getScheduledStartTime() != null) updates.put("scheduledStartTime", appointment.getScheduledStartTime());
        if (appointment.getScheduledEndTime() != null) updates.put("scheduledEndTime", appointment.getScheduledEndTime());
        if (appointment.getDurationMinutes() != null) updates.put("durationMinutes", appointment.getDurationMinutes());
        if (appointment.getLocation() != null) updates.put("location", appointment.getLocation());
        if (appointment.getMeetingType() != null) updates.put("meetingType", appointment.getMeetingType());
        if (appointment.getStatus() != null) updates.put("status", appointment.getStatus());
        if (appointment.getPrice() != null) updates.put("price", appointment.getPrice());
        if (appointment.getPaymentStatus() != null) updates.put("paymentStatus", appointment.getPaymentStatus());
        if (appointment.getClientNotes() != null) updates.put("clientNotes", appointment.getClientNotes());
        if (appointment.getTrainerNotes() != null) updates.put("trainerNotes", appointment.getTrainerNotes());
        updates.put("updatedAt", appointment.getUpdatedAt());
        
        update(appointmentId, updates);
    }
}

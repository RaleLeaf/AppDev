package com.basick.app.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.basick.app.dto.appointment.AppointmentDTO;
import com.basick.app.dto.appointment.CreateAppointmentRequest;
import com.basick.app.dto.appointment.UpdateAppointmentRequest;
import com.basick.app.mapper.AppointmentMapper;
import com.basick.app.model.Appointment;
import com.basick.app.repository.AppointmentRepository;

/**
 * Service layer for Appointment operations
 */
@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    public AppointmentService(AppointmentRepository appointmentRepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
    }

    /**
     * Get all appointments
     */
    public List<AppointmentDTO> getAllAppointments() throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointment by ID
     */
    public AppointmentDTO getAppointmentById(String appointmentId) throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        return appointment != null ? appointmentMapper.toDTO(appointment) : null;
    }

    /**
     * Create a new appointment
     */
    public AppointmentDTO createAppointment(CreateAppointmentRequest request) throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentMapper.toEntity(request);
        String appointmentId = appointmentRepository.save(appointment);
        appointment.setId(appointmentId);
        return appointmentMapper.toDTO(appointment);
    }

    /**
     * Update an existing appointment
     */
    public AppointmentDTO updateAppointment(String appointmentId, UpdateAppointmentRequest request) 
            throws ExecutionException, InterruptedException {
        Appointment existingAppointment = appointmentRepository.findById(appointmentId);
        if (existingAppointment == null) {
            return null;
        }

        appointmentMapper.updateEntityFromRequest(existingAppointment, request);
        appointmentRepository.updateEntity(appointmentId, existingAppointment);
        
        return appointmentMapper.toDTO(existingAppointment);
    }

    /**
     * Delete an appointment
     */
    public boolean deleteAppointment(String appointmentId) throws ExecutionException, InterruptedException {
        if (!appointmentRepository.exists(appointmentId)) {
            return false;
        }
        appointmentRepository.delete(appointmentId);
        return true;
    }

    /**
     * Get appointments by client ID
     */
    public List<AppointmentDTO> getAppointmentsByClientId(String clientId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByClientId(clientId);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by trainer ID
     */
    public List<AppointmentDTO> getAppointmentsByTrainerId(String trainerId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByTrainerId(trainerId);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by status
     */
    public List<AppointmentDTO> getAppointmentsByStatus(String status) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByStatus(status);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by client ID and status
     */
    public List<AppointmentDTO> getAppointmentsByClientIdAndStatus(String clientId, String status) 
            throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByClientIdAndStatus(clientId, status);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by trainer ID and status
     */
    public List<AppointmentDTO> getAppointmentsByTrainerIdAndStatus(String trainerId, String status) 
            throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByTrainerIdAndStatus(trainerId, status);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by service type
     */
    public List<AppointmentDTO> getAppointmentsByServiceType(String serviceType) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByServiceType(serviceType);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get appointments by payment status
     */
    public List<AppointmentDTO> getAppointmentsByPaymentStatus(String paymentStatus) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findByPaymentStatus(paymentStatus);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get upcoming appointments by client ID
     */
    public List<AppointmentDTO> getUpcomingAppointmentsByClientId(String clientId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findUpcomingByClientId(clientId);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Get upcoming appointments by trainer ID
     */
    public List<AppointmentDTO> getUpcomingAppointmentsByTrainerId(String trainerId) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentRepository.findUpcomingByTrainerId(trainerId);
        return appointments.stream()
            .map(appointmentMapper::toDTO)
            .toList();
    }

    /**
     * Confirm an appointment
     */
    public AppointmentDTO confirmAppointment(String appointmentId) throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment != null) {
            appointment.confirm();
            appointmentRepository.updateEntity(appointmentId, appointment);
            return appointmentMapper.toDTO(appointment);
        }
        return null;
    }

    /**
     * Cancel an appointment
     */
    public AppointmentDTO cancelAppointment(String appointmentId, String cancellationReason) 
            throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment != null) {
            appointment.cancel(cancellationReason);
            appointmentRepository.updateEntity(appointmentId, appointment);
            return appointmentMapper.toDTO(appointment);
        }
        return null;
    }

    /**
     * Complete an appointment
     */
    public AppointmentDTO completeAppointment(String appointmentId) throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment != null) {
            appointment.complete();
            appointmentRepository.updateEntity(appointmentId, appointment);
            return appointmentMapper.toDTO(appointment);
        }
        return null;
    }

    /**
     * Start an appointment
     */
    public AppointmentDTO startAppointment(String appointmentId) throws ExecutionException, InterruptedException {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment != null) {
            appointment.start();
            appointmentRepository.updateEntity(appointmentId, appointment);
            return appointmentMapper.toDTO(appointment);
        }
        return null;
    }

    /**
     * Get count of appointments
     */
    public long getAppointmentCount() throws ExecutionException, InterruptedException {
        return appointmentRepository.count();
    }

    /**
     * Check if appointment exists
     */
    public boolean appointmentExists(String appointmentId) throws ExecutionException, InterruptedException {
        return appointmentRepository.exists(appointmentId);
    }
}

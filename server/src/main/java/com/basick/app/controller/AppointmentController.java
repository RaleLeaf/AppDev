package com.basick.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basick.app.dto.appointment.AppointmentDTO;
import com.basick.app.dto.appointment.CreateAppointmentRequest;
import com.basick.app.dto.appointment.UpdateAppointmentRequest;
import com.basick.app.service.AppointmentService;

import jakarta.validation.Valid;

/**
 * REST controller for Appointment operations
 */
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    /**
     * Get all appointments
     */
    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointment by ID
     */
    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable String appointmentId) {
        try {
            AppointmentDTO appointment = appointmentService.getAppointmentById(appointmentId);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new appointment
     */
    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@Valid @RequestBody CreateAppointmentRequest request) {
        try {
            AppointmentDTO appointment = appointmentService.createAppointment(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update appointment
     */
    @PutMapping("/{appointmentId}")
    public ResponseEntity<AppointmentDTO> updateAppointment(
            @PathVariable String appointmentId,
            @Valid @RequestBody UpdateAppointmentRequest request) {
        try {
            AppointmentDTO appointment = appointmentService.updateAppointment(appointmentId, request);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete appointment
     */
    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String appointmentId) {
        try {
            boolean deleted = appointmentService.deleteAppointment(appointmentId);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by client ID
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByClientId(@PathVariable String clientId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByClientId(clientId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by trainer ID
     */
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByTrainerId(@PathVariable String trainerId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByTrainerId(trainerId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByStatus(@PathVariable String status) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByStatus(status);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by client ID and status
     */
    @GetMapping("/client/{clientId}/status/{status}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByClientIdAndStatus(
            @PathVariable String clientId,
            @PathVariable String status) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByClientIdAndStatus(clientId, status);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by trainer ID and status
     */
    @GetMapping("/trainer/{trainerId}/status/{status}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByTrainerIdAndStatus(
            @PathVariable String trainerId,
            @PathVariable String status) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByTrainerIdAndStatus(trainerId, status);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by service type
     */
    @GetMapping("/service-type/{serviceType}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByServiceType(@PathVariable String serviceType) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByServiceType(serviceType);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointments by payment status
     */
    @GetMapping("/payment-status/{paymentStatus}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByPaymentStatus(@PathVariable String paymentStatus) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByPaymentStatus(paymentStatus);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get upcoming appointments by client ID
     */
    @GetMapping("/client/{clientId}/upcoming")
    public ResponseEntity<List<AppointmentDTO>> getUpcomingAppointmentsByClientId(@PathVariable String clientId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getUpcomingAppointmentsByClientId(clientId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get upcoming appointments by trainer ID
     */
    @GetMapping("/trainer/{trainerId}/upcoming")
    public ResponseEntity<List<AppointmentDTO>> getUpcomingAppointmentsByTrainerId(@PathVariable String trainerId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getUpcomingAppointmentsByTrainerId(trainerId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Confirm an appointment
     */
    @PatchMapping("/{appointmentId}/confirm")
    public ResponseEntity<AppointmentDTO> confirmAppointment(@PathVariable String appointmentId) {
        try {
            AppointmentDTO appointment = appointmentService.confirmAppointment(appointmentId);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Cancel an appointment
     */
    @PatchMapping("/{appointmentId}/cancel")
    public ResponseEntity<AppointmentDTO> cancelAppointment(
            @PathVariable String appointmentId,
            @RequestParam(required = false) String cancellationReason) {
        try {
            AppointmentDTO appointment = appointmentService.cancelAppointment(appointmentId, cancellationReason);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Complete an appointment
     */
    @PatchMapping("/{appointmentId}/complete")
    public ResponseEntity<AppointmentDTO> completeAppointment(@PathVariable String appointmentId) {
        try {
            AppointmentDTO appointment = appointmentService.completeAppointment(appointmentId);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Start an appointment
     */
    @PatchMapping("/{appointmentId}/start")
    public ResponseEntity<AppointmentDTO> startAppointment(@PathVariable String appointmentId) {
        try {
            AppointmentDTO appointment = appointmentService.startAppointment(appointmentId);
            return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get appointment statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Object> getAppointmentStats() {
        try {
            long count = appointmentService.getAppointmentCount();
            return ResponseEntity.ok(java.util.Map.of("totalAppointments", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package com.basick.app.mapper;

import com.basick.app.dto.appointment.AppointmentDTO;
import com.basick.app.dto.appointment.CreateAppointmentRequest;
import com.basick.app.dto.appointment.UpdateAppointmentRequest;
import com.basick.app.model.Appointment;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class AppointmentMapper {
    
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public AppointmentDTO toDTO(Appointment appointment) {
        if (appointment == null) {
            return null;
        }
        
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setClientId(appointment.getClientId());
        dto.setTrainerId(appointment.getTrainerId());
        dto.setTrainerName(appointment.getTrainerName());
        dto.setClientName(appointment.getClientName());
        dto.setTitle(appointment.getTitle());
        dto.setDescription(appointment.getDescription());
        dto.setServiceType(appointment.getServiceType());
        dto.setScheduledStartTime(timestampToString(appointment.getScheduledStartTime()));
        dto.setScheduledEndTime(timestampToString(appointment.getScheduledEndTime()));
        dto.setDurationMinutes(appointment.getDurationMinutes());
        dto.setLocation(appointment.getLocation());
        dto.setMeetingType(appointment.getMeetingType());
        dto.setMeetingLink(appointment.getMeetingLink());
        dto.setMeetingPassword(appointment.getMeetingPassword());
        dto.setStatus(appointment.getStatus());
        dto.setCancellationReason(appointment.getCancellationReason());
        dto.setActualStartTime(timestampToString(appointment.getActualStartTime()));
        dto.setActualEndTime(timestampToString(appointment.getActualEndTime()));
        dto.setPrice(appointment.getPrice());
        dto.setCurrency(appointment.getCurrency());
        dto.setPaymentStatus(appointment.getPaymentStatus());
        dto.setPaymentIntentId(appointment.getPaymentIntentId());
        dto.setIsPackageSession(appointment.getIsPackageSession());
        dto.setPackageId(appointment.getPackageId());
        dto.setTrainerNotes(appointment.getTrainerNotes());
        dto.setClientNotes(appointment.getClientNotes());
        dto.setSessionSummary(appointment.getSessionSummary());
        dto.setClientRating(appointment.getClientRating());
        dto.setClientFeedback(appointment.getClientFeedback());
        dto.setTrainerRating(appointment.getTrainerRating());
        dto.setTrainerFeedback(appointment.getTrainerFeedback());
        dto.setReminderSent(appointment.getReminderSent());
        dto.setReminderSentAt(timestampToString(appointment.getReminderSentAt()));
        dto.setFollowUpRequired(appointment.getFollowUpRequired());
        dto.setFollowUpNotes(appointment.getFollowUpNotes());
        dto.setIsRecurring(appointment.getIsRecurring());
        dto.setRecurrencePattern(appointment.getRecurrencePattern());
        dto.setParentAppointmentId(appointment.getParentAppointmentId());
        dto.setRecurrenceCount(appointment.getRecurrenceCount());
        dto.setPreparationInstructions(appointment.getPreparationInstructions());
        dto.setEquipmentNeeded(appointment.getEquipmentNeeded());
        dto.setSpecialRequirements(appointment.getSpecialRequirements());
        dto.setCreatedAt(timestampToString(appointment.getCreatedAt()));
        dto.setUpdatedAt(timestampToString(appointment.getUpdatedAt()));
        dto.setCreatedBy(appointment.getCreatedBy());
        
        return dto;
    }
    
    public Appointment toEntity(CreateAppointmentRequest request) {
        if (request == null) {
            return null;
        }
        
        Appointment appointment = new Appointment();
        appointment.setClientId(request.getClientId());
        appointment.setTrainerId(request.getTrainerId());
        appointment.setTitle(request.getTitle());
        appointment.setDescription(request.getDescription());
        appointment.setServiceType(request.getServiceType());
        appointment.setScheduledStartTime(stringToTimestamp(request.getScheduledStartTime()));
        appointment.setDurationMinutes(request.getDurationMinutes());
        
        // Calculate end time if duration is provided
        if (request.getDurationMinutes() != null && appointment.getScheduledStartTime() != null) {
            Timestamp startTime = appointment.getScheduledStartTime();
            appointment.setScheduledEndTime(Timestamp.ofTimeSecondsAndNanos(
                startTime.getSeconds() + (request.getDurationMinutes() * 60),
                startTime.getNanos()
            ));
        }
        
        appointment.setLocation(request.getLocation());
        appointment.setMeetingType(request.getMeetingType());
        appointment.setMeetingLink(request.getMeetingLink());
        appointment.setMeetingPassword(request.getMeetingPassword());
        appointment.setPrice(request.getPrice());
        appointment.setCurrency(request.getCurrency());
        appointment.setIsPackageSession(request.getIsPackageSession());
        appointment.setPackageId(request.getPackageId());
        appointment.setClientNotes(request.getClientNotes());
        appointment.setFollowUpRequired(request.getFollowUpRequired());
        appointment.setFollowUpNotes(request.getFollowUpNotes());
        appointment.setIsRecurring(request.getIsRecurring());
        appointment.setRecurrencePattern(request.getRecurrencePattern());
        appointment.setParentAppointmentId(request.getParentAppointmentId());
        appointment.setRecurrenceCount(request.getRecurrenceCount());
        appointment.setPreparationInstructions(request.getPreparationInstructions());
        appointment.setEquipmentNeeded(request.getEquipmentNeeded());
        appointment.setSpecialRequirements(request.getSpecialRequirements());
        appointment.setTrainerName(request.getTrainerName());
        appointment.setClientName(request.getClientName());
        
        return appointment;
    }
    
    public void updateEntityFromRequest(Appointment appointment, UpdateAppointmentRequest request) {
        if (appointment == null || request == null) {
            return;
        }
        
        if (request.getTitle() != null) {
            appointment.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            appointment.setDescription(request.getDescription());
        }
        if (request.getScheduledStartTime() != null) {
            appointment.setScheduledStartTime(stringToTimestamp(request.getScheduledStartTime()));
            
            // Recalculate end time if duration exists
            if (appointment.getDurationMinutes() != null) {
                Timestamp startTime = appointment.getScheduledStartTime();
                appointment.setScheduledEndTime(Timestamp.ofTimeSecondsAndNanos(
                    startTime.getSeconds() + (appointment.getDurationMinutes() * 60),
                    startTime.getNanos()
                ));
            }
        }
        if (request.getDurationMinutes() != null) {
            appointment.setDurationMinutes(request.getDurationMinutes());
            
            // Recalculate end time if start time exists
            if (appointment.getScheduledStartTime() != null) {
                Timestamp startTime = appointment.getScheduledStartTime();
                appointment.setScheduledEndTime(Timestamp.ofTimeSecondsAndNanos(
                    startTime.getSeconds() + (request.getDurationMinutes() * 60),
                    startTime.getNanos()
                ));
            }
        }
        if (request.getStatus() != null) {
            appointment.setStatus(request.getStatus());
        }
        if (request.getLocation() != null) {
            appointment.setLocation(request.getLocation());
        }
        if (request.getMeetingType() != null) {
            appointment.setMeetingType(request.getMeetingType());
        }
        if (request.getMeetingLink() != null) {
            appointment.setMeetingLink(request.getMeetingLink());
        }
        if (request.getPrice() != null) {
            appointment.setPrice(request.getPrice());
        }
        if (request.getClientNotes() != null) {
            appointment.setClientNotes(request.getClientNotes());
        }
        if (request.getTrainerNotes() != null) {
            appointment.setTrainerNotes(request.getTrainerNotes());
        }
        
        appointment.updateTimestamp();
    }
    
    private String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        Instant instant = Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.format(FORMATTER);
    }
    
    private Timestamp stringToTimestamp(String dateString) {
        if (dateString == null || dateString.trim().isEmpty()) {
            return null;
        }
        LocalDateTime localDateTime = LocalDateTime.parse(dateString, FORMATTER);
        Instant instant = localDateTime.atZone(ZoneId.systemDefault()).toInstant();
        return Timestamp.ofTimeSecondsAndNanos(instant.getEpochSecond(), instant.getNano());
    }
}

package com.basick.app.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.basick.app.dto.appointment.CreateAppointmentRequest;
import com.basick.app.dto.appointment.AppointmentDTO;
import com.basick.app.dto.appointment.UpdateAppointmentRequest;
import com.basick.app.mapper.AppointmentMapper;
import com.basick.app.model.Appointment;
import com.basick.app.repository.AppointmentRepository;
import com.google.cloud.Timestamp;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private AppointmentMapper appointmentMapper;

    @InjectMocks
    private AppointmentService appointmentService;

    private Appointment testAppointment;
    private AppointmentDTO testAppointmentDTO;
    private CreateAppointmentRequest createRequest;
    private UpdateAppointmentRequest updateRequest;

    @BeforeEach
    void setUp() {
        testAppointment = new Appointment();
        testAppointment.setId("appointment1");
        testAppointment.setClientId("client1");
        testAppointment.setTrainerId("trainer1");
        testAppointment.setTitle("Fitness Session");
        testAppointment.setStatus("SCHEDULED");
        testAppointment.setCreatedAt(Timestamp.now());
        testAppointment.setUpdatedAt(Timestamp.now());

        testAppointmentDTO = new AppointmentDTO();
        testAppointmentDTO.setId("appointment1");
        testAppointmentDTO.setClientId("client1");
        testAppointmentDTO.setTrainerId("trainer1");
        testAppointmentDTO.setTitle("Fitness Session");
        testAppointmentDTO.setStatus("SCHEDULED");

        createRequest = new CreateAppointmentRequest();
        createRequest.setClientId("client1");
        createRequest.setTrainerId("trainer1");
        createRequest.setScheduledStartTime("2025-01-01 10:00:00");
        createRequest.setDurationMinutes(60);

        updateRequest = new UpdateAppointmentRequest();
        updateRequest.setTitle("Updated Fitness Session");
        updateRequest.setStatus("CONFIRMED");
    }

    @Test
    void getAllAppointments_ShouldReturnListOfAppointmentDTOs() throws Exception {
        // Given
        List<Appointment> appointments = Arrays.asList(testAppointment);
        when(appointmentRepository.findAll()).thenReturn(appointments);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        List<AppointmentDTO> result = appointmentService.getAllAppointments();

        // Then
        assertEquals(1, result.size());
        assertEquals(testAppointmentDTO, result.get(0));
        verify(appointmentRepository).findAll();
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void getAppointmentById_ExistingId_ShouldReturnAppointmentDTO() throws Exception {
        // Given
        when(appointmentRepository.findById("appointment1")).thenReturn(testAppointment);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        AppointmentDTO result = appointmentService.getAppointmentById("appointment1");

        // Then
        assertEquals(testAppointmentDTO, result);
        verify(appointmentRepository).findById("appointment1");
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void getAppointmentById_NonExistingId_ShouldReturnNull() throws Exception {
        // Given
        when(appointmentRepository.findById("nonexistent")).thenReturn(null);

        // When
        AppointmentDTO result = appointmentService.getAppointmentById("nonexistent");

        // Then
        assertNull(result);
        verify(appointmentRepository).findById("nonexistent");
        verify(appointmentMapper, never()).toDTO(any());
    }

    @Test
    void createAppointment_ShouldReturnCreatedAppointmentDTO() throws Exception {
        // Given
        when(appointmentMapper.toEntity(createRequest)).thenReturn(testAppointment);
        when(appointmentRepository.save(testAppointment)).thenReturn("appointment1");
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        AppointmentDTO result = appointmentService.createAppointment(createRequest);

        // Then
        assertEquals(testAppointmentDTO, result);
        verify(appointmentMapper).toEntity(createRequest);
        verify(appointmentRepository).save(testAppointment);
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void updateAppointment_ExistingId_ShouldReturnUpdatedAppointmentDTO() throws Exception {
        // Given
        when(appointmentRepository.findById("appointment1")).thenReturn(testAppointment);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        AppointmentDTO result = appointmentService.updateAppointment("appointment1", updateRequest);

        // Then
        assertEquals(testAppointmentDTO, result);
        verify(appointmentRepository).findById("appointment1");
        verify(appointmentMapper).updateEntityFromRequest(testAppointment, updateRequest);
        verify(appointmentRepository).updateEntity("appointment1", testAppointment);
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void deleteAppointment_ExistingId_ShouldReturnTrue() throws Exception {
        // Given
        when(appointmentRepository.exists("appointment1")).thenReturn(true);

        // When
        boolean result = appointmentService.deleteAppointment("appointment1");

        // Then
        assertTrue(result);
        verify(appointmentRepository).exists("appointment1");
        verify(appointmentRepository).delete("appointment1");
    }

    @Test
    void getAppointmentsByClientId_ShouldReturnFilteredAppointments() throws Exception {
        // Given
        List<Appointment> appointments = Arrays.asList(testAppointment);
        when(appointmentRepository.findByClientId("client1")).thenReturn(appointments);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        List<AppointmentDTO> result = appointmentService.getAppointmentsByClientId("client1");

        // Then
        assertEquals(1, result.size());
        assertEquals(testAppointmentDTO, result.get(0));
        verify(appointmentRepository).findByClientId("client1");
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void confirmAppointment_ExistingAppointment_ShouldReturnUpdatedAppointmentDTO() throws Exception {
        // Given
        when(appointmentRepository.findById("appointment1")).thenReturn(testAppointment);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        AppointmentDTO result = appointmentService.confirmAppointment("appointment1");

        // Then
        assertEquals(testAppointmentDTO, result);
        verify(appointmentRepository).findById("appointment1");
        verify(appointmentRepository).updateEntity("appointment1", testAppointment);
        verify(appointmentMapper).toDTO(testAppointment);
    }

    @Test
    void cancelAppointment_ExistingAppointment_ShouldReturnUpdatedAppointmentDTO() throws Exception {
        // Given
        when(appointmentRepository.findById("appointment1")).thenReturn(testAppointment);
        when(appointmentMapper.toDTO(testAppointment)).thenReturn(testAppointmentDTO);

        // When
        AppointmentDTO result = appointmentService.cancelAppointment("appointment1", "Client requested");

        // Then
        assertEquals(testAppointmentDTO, result);
        verify(appointmentRepository).findById("appointment1");
        verify(appointmentRepository).updateEntity("appointment1", testAppointment);
        verify(appointmentMapper).toDTO(testAppointment);
    }
}

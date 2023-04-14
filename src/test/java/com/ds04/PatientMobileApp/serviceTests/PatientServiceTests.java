package com.ds04.PatientMobileApp.serviceTests;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.repository.PatientRepository;
import com.ds04.PatientMobileApp.service.PatientService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTests {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    @Test
    public void PatientService_CreatePatient_ReturnsTimestamp() throws ExecutionException, InterruptedException {
        // Arrange
        Patient testPatient = new Patient();
        testPatient.setUid("test_uid");
        String expectedTimestamp = "2023-09-01 09:01:15";
        when(patientRepository.create(Mockito.any(Patient.class))).thenReturn(expectedTimestamp);

        // Act
        ResponseEntity response = patientService.createPatient(testPatient);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedTimestamp);
    }

    @Test
    public void PatientService_CreatePatientNoUID_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        Patient testPatient = new Patient();
        String expectedResponseMessage = "uid property is required but was not provided";

        // Act
        ResponseEntity response = patientService.createPatient(testPatient);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void PatientService_CreatePatientRepoThrowsError_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        Patient testPatient = new Patient();
        testPatient.setUid("test_uid");
        String expectedResponseMessage = "An exception occurred when creating Patient";
        when(patientRepository.create(Mockito.any(Patient.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = patientService.createPatient(testPatient);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void PatientService_GetPatientByPatientId_ReturnsPatient() throws ExecutionException, InterruptedException {
        // Arrange
        String testPatientId = "test_patientId";
        Date testDate = new Date();

        Patient testPatient = new Patient();
        testPatient.setPatientId();
        testPatient.setUid("test_uid");
        testPatient.setFirstname("Josh");
        testPatient.setSurname("Beatty");
        testPatient.setGender("Male");
        testPatient.setDob(testDate);
        testPatient.setHomeAddress("123 Main Road");

        when(patientRepository.findByPatientId(Mockito.any(String.class))).thenReturn(testPatient);

        // Act
        ResponseEntity response = patientService.getPatientByPatientId(testPatientId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(testPatient);
    }



}

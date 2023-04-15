package com.ds04.PatientMobileApp.serviceTests;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.repository.PatientRepository;
import com.ds04.PatientMobileApp.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
    public void PatientService_CreatePatient_ReturnsOK() throws ExecutionException, InterruptedException {
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
    public void PatientService_CreatePatientUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
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
    public void PatientService_GetPatientByPatientId_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
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

        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        String expectedResponse = ow.writeValueAsString(testPatient);

        when(patientRepository.findByPatientId(Mockito.any(String.class))).thenReturn(testPatient);

        // Act
        ResponseEntity response = patientService.getPatientByPatientId(testPatientId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void PatientService_GetPatientByUserId_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testUserId = "test_uid";
        Patient testPatient = new Patient();
        testPatient.setUid(testUserId);
        String expectedResponse = testPatient.convertToJson();
        when(patientRepository.findByUserId(Mockito.any(String.class))).thenReturn(testPatient);

        // Act
        ResponseEntity response = patientService.getPatientByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void PatientService_GetPatientByUserIdNoResult_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedErrorMessage = "Could not find Patient with userId: " + testUserId;
        when(patientRepository.findByUserId(Mockito.any(String.class))).thenThrow(new IllegalArgumentException(expectedErrorMessage));

        // Act
        ResponseEntity response = patientService.getPatientByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(expectedErrorMessage);
    }

    @Test
    public void PatientService_GetPatientByUserIdUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedResponseMessage = "An exception occurred when searching for Patient";
        when(patientRepository.findByUserId(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = patientService.getPatientByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void PatientService_UpdatePatient_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testPatientId = "test_patientId";
        Patient testPatient = new Patient();
        testPatient.setUid("someUserId");
        String expectedResponse = "2023-09-01 09:01:15";
        when(patientRepository.update(Mockito.any(String.class), Mockito.any(Patient.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity response = patientService.updatePatient(testPatientId, testPatient);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void PatientService_UpdatePatientMissingParams_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        Patient testPatient = new Patient();
        String expectedResponse_MissingPatientId = "patientId property must be provided";
        String expectedResponse_BlankPatientId = "patientId property must be provided";
        String expectedResponse_MissingUserId = "uid property must be provided";

        // Act
        ResponseEntity responseMissingPatientId = patientService.updatePatient(null, testPatient);
        ResponseEntity responseBlankPatientId = patientService.updatePatient("", testPatient);
        ResponseEntity responseMissingUserId = patientService.updatePatient("test_patientId", testPatient);

        // Assert
        assertThat(responseMissingPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingPatientId.getBody()).isEqualTo(expectedResponse_MissingPatientId);
        assertThat(responseBlankPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseBlankPatientId.getBody()).isEqualTo(expectedResponse_BlankPatientId);
        assertThat(responseMissingUserId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingUserId.getBody()).isEqualTo(expectedResponse_MissingUserId);
    }

    @Test
    public void PatientService_UpdatePatientUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testPatientId = "test_patientId";
        Patient testPatient = new Patient();
        testPatient.setUid("someUserId");
        String expectedResponse = "An exception occurred when updating Patient";
        when(patientRepository.update(Mockito.any(String.class), Mockito.any(Patient.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = patientService.updatePatient(testPatientId, testPatient);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void PatientService_DeletePatient_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testPatientId = "test_patientId";
        String expectedResponse = "2023-09-01 09:01:15";
        when(patientRepository.delete(Mockito.any(String.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity response = patientService.deletePatient(testPatientId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void PatientService_DeletePatientMissingParams_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        String expectedResponse_MissingPatientId = "patientId property must be provided";
        String expectedResponse_BlankPatientId = "patientId property must be provided";

        // Act
        ResponseEntity responseMissingPatientId = patientService.deletePatient(null);
        ResponseEntity responseBlankPatientId = patientService.deletePatient("");

        // Assert
        assertThat(responseMissingPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingPatientId.getBody()).isEqualTo(expectedResponse_MissingPatientId);
        assertThat(responseBlankPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseBlankPatientId.getBody()).isEqualTo(expectedResponse_BlankPatientId);
    }

    @Test
    public void PatientService_DeletePatientUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testPatientId = "test_patientId";
        String expectedResponse = "An exception occurred when deleting Patient";
        when(patientRepository.delete(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = patientService.deletePatient(testPatientId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }
}

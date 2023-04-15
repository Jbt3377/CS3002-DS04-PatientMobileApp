package com.ds04.PatientMobileApp.serviceTests;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.repository.WoundRepository;
import com.ds04.PatientMobileApp.service.WoundService;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WoundServiceTests {

    @Mock
    private WoundRepository woundRepository;

    @InjectMocks
    private WoundService woundService;

    @Test
    public void WoundService_CreateWound_ReturnsOK() throws ExecutionException, InterruptedException {
        // Arrange
        Wound testWound = new Wound();
        testWound.setUid("test_uid");
        String expectedTimestamp = "2023-09-01 09:01:15";
        when(woundRepository.create(Mockito.any(Wound.class))).thenReturn(expectedTimestamp);

        // Act
        ResponseEntity response = woundService.createWound(testWound);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedTimestamp);
    }

    @Test
    public void WoundService_CreateWoundNoUid_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        Wound testWound = new Wound();
        String expectedResponseMessage = "uid property is required but was not provided";

        // Act
        ResponseEntity response = woundService.createWound(testWound);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void WoundService_CreateWoundUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        Wound testWound = new Wound();
        testWound.setUid("test_uid");
        String expectedResponseMessage = "An exception occurred when creating Wound";
        when(woundRepository.create(Mockito.any(Wound.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundService.createWound(testWound);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void WoundService_FindWoundByWoundId_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testWoundId = "test_woundId";
        Date testDate = new Date();
        List<String> testInjuryMechanism = new ArrayList<>();
        testInjuryMechanism.add("Penetrating Trauma");

        Wound testWound = new Wound();
        testWound.setWoundId();
        testWound.setUid("test_uid");
        testWound.setWoundType("Pressure Ulcer");
        testWound.setWoundLocationOnBody("Back");
        testWound.setInjuryDate(testDate);
        testWound.setPlaceOfInjury("testPlaceOfInjury");
        testWound.setInjuryIntent("testInjuryIntent");
        testWound.setInjuryActivityStatus("testInjuryActivityStatus");
        testWound.setInjuryActivityType("testInjuryActivityType");
        testWound.setInjuryMechanism(testInjuryMechanism);
        testWound.setInjuryDrugOrAlcoholInvolvement(true);
        testWound.setAssaultLocationDescription("testAssaultLocationDesc");

        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        String expectedResponse = ow.writeValueAsString(testWound);

        when(woundRepository.findWoundByWoundId(Mockito.any(String.class))).thenReturn(testWound);

        // Act
        ResponseEntity response = woundService.findWoundByWoundId(testWoundId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_FindWoundByWoundIdNoResult_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedError = "Could not find Wound with woundId: " + testUserId;
        when(woundRepository.findWoundByWoundId(Mockito.any(String.class))).thenThrow(new IllegalArgumentException(expectedError));

        // Act
        ResponseEntity response = woundService.findWoundByWoundId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(expectedError);
    }

    @Test
    public void WoundService_FindWoundByWoundIdUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedResponse = "An exception occurred when searching for Wound";
        when(woundRepository.findWoundByWoundId(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundService.findWoundByWoundId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_FindWoundsByUserId_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testWoundId = "test_woundId";
        List<Wound> testWounds = new ArrayList<>();

        Wound testWound1 = new Wound();
        testWound1.setWoundId();
        testWound1.setUid("test_uid");
        testWound1.setWoundType("Pressure Ulcer");
        testWound1.setWoundLocationOnBody("Back");
        testWounds.add(testWound1);

        Wound testWound2 = new Wound();
        testWound2.setWoundId();
        testWound2.setUid("test_uid");
        testWound2.setWoundType("Pressure Ulcer");
        testWound2.setWoundLocationOnBody("Back");
        testWounds.add(testWound2);

        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        String expectedResponse = ow.writeValueAsString(testWounds);

        when(woundRepository.findWoundsByUid(Mockito.any(String.class))).thenReturn(testWounds);

        // Act
        ResponseEntity response = woundService.findWoundsByUid(testWoundId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_FindWoundsByUserIdNoResult_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedErrorMessage = "Could not find Wounds with uid: " + testUserId;
        when(woundRepository.findWoundsByUid(Mockito.any(String.class))).thenThrow(new IllegalArgumentException(expectedErrorMessage));

        // Act
        ResponseEntity response = woundService.findWoundsByUid(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(expectedErrorMessage);
    }

    @Test
    public void WoundService_FindWoundsByUserIdUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "test_uid";
        String expectedResponseMessage = "An exception occurred when searching for Wounds";
        when(woundRepository.findWoundsByUid(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundService.findWoundsByUid(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponseMessage);
    }

    @Test
    public void WoundService_UpdateWound_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testWoundId = "testWoundId";
        Wound testWound = new Wound();
        testWound.setUid("someUserId");
        String expectedResponse = "2023-09-01 09:01:15";
        when(woundRepository.update(Mockito.any(String.class), Mockito.any(Wound.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity response = woundService.updateWound(testWoundId, testWound);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_UpdateWoundMissingParams_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        Wound testWound = new Wound();
        String expectedResponse_MissingWoundId = "woundId property must be provided";
        String expectedResponse_BlankWoundId = "woundId property must be provided";
        String expectedResponse_MissingUserId = "uid property must be provided";

        // Act
        ResponseEntity responseMissingPatientId = woundService.updateWound(null, testWound);
        ResponseEntity responseBlankPatientId = woundService.updateWound("", testWound);
        ResponseEntity responseMissingUserId = woundService.updateWound("testWoundId", testWound);

        // Assert
        assertThat(responseMissingPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingPatientId.getBody()).isEqualTo(expectedResponse_MissingWoundId);
        assertThat(responseBlankPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseBlankPatientId.getBody()).isEqualTo(expectedResponse_BlankWoundId);
        assertThat(responseMissingUserId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingUserId.getBody()).isEqualTo(expectedResponse_MissingUserId);
    }

    @Test
    public void WoundService_UpdateWoundUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testWoundId = "testWoundId";
        Wound testWound = new Wound();
        testWound.setUid("someUserId");
        String expectedResponse = "An exception occurred when updating Wound";
        when(woundRepository.update(Mockito.any(String.class), Mockito.any(Wound.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundService.updateWound(testWoundId, testWound);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_DeleteWound_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testWoundId = "testWoundId";
        String expectedResponse = "2023-09-01 09:01:15";
        when(woundRepository.delete(Mockito.any(String.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity response = woundService.deleteWound(testWoundId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundService_DeleteWoundMissingParams_ReturnsBadRequest() throws ExecutionException, InterruptedException {
        // Arrange
        String expectedResponse_MissingPatientId = "woundId property must be provided";
        String expectedResponse_BlankPatientId = "woundId property must be provided";

        // Act
        ResponseEntity responseMissingPatientId = woundService.deleteWound(null);
        ResponseEntity responseBlankPatientId = woundService.deleteWound("");

        // Assert
        assertThat(responseMissingPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseMissingPatientId.getBody()).isEqualTo(expectedResponse_MissingPatientId);
        assertThat(responseBlankPatientId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(responseBlankPatientId.getBody()).isEqualTo(expectedResponse_BlankPatientId);
    }

    @Test
    public void WoundService_DeleteWoundUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testWoundId = "testWoundId";
        String expectedResponse = "An exception occurred when deleting Wound";
        when(woundRepository.delete(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundService.deleteWound(testWoundId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }
}

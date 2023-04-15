package com.ds04.PatientMobileApp.serviceTests;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import com.ds04.PatientMobileApp.service.WoundCaptureService;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WoundCaptureServiceTests {

    @Mock
    private WoundCaptureRepository woundCaptureRepository;

    @InjectMocks
    private WoundCaptureService woundCaptureService;

    // Note: Testing CreateWoundCapture endpoint and expecting 200 OK Response must be performed manually
    //       due to the complex nature of the image processing and analysis code

    @Test
    public void WoundCaptureService_CreateWoundCaptureMissingParams_ReturnsBadRequest() throws ExecutionException, InterruptedException, IOException {
        // Arrange
        String testUid = "testUserId";
        String testWoundId = "testWoundId";
        Date testCaptureDate = new Date();

        String expectedErrorMessage_MissingUserId = "uid property must be provided";
        String expectedErrorMessage_MissingWoundId = "woundId property must be provided";
        String expectedErrorMessage_MissingCaptureDate = "captureDate property must be provided";
        String expectedErrorMessage_MissingPhoto = "photo must be provided";

        // Act
        ResponseEntity response_noUserId = woundCaptureService.createWoundCapture(null, null, null, null);
        ResponseEntity response_noWoundId = woundCaptureService.createWoundCapture(testUid, null, null, null);
        ResponseEntity response_noCaptureDate = woundCaptureService.createWoundCapture(testUid, testWoundId, null, null);
        ResponseEntity response_noPhoto = woundCaptureService.createWoundCapture(testUid, testWoundId, testCaptureDate, null);


        // Assert
        assertThat(response_noUserId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response_noUserId.getBody()).isEqualTo(expectedErrorMessage_MissingUserId);
        assertThat(response_noWoundId.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response_noWoundId.getBody()).isEqualTo(expectedErrorMessage_MissingWoundId);
        assertThat(response_noCaptureDate.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response_noCaptureDate.getBody()).isEqualTo(expectedErrorMessage_MissingCaptureDate);
        assertThat(response_noPhoto.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response_noPhoto.getBody()).isEqualTo(expectedErrorMessage_MissingPhoto);
    }

    @Test
    public void WoundCaptureService_GetWoundCapture_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testWoundCaptureId = "testWoundCaptureId";
        WoundCapture testWoundCapture = new WoundCapture();
        testWoundCapture.setWoundId("testWoundId");
        testWoundCapture.setUid("testUserId");
        testWoundCapture.setCaptureDate(new Date());
        testWoundCapture.setFilename("testFilename");

        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        String expectedResponse = ow.writeValueAsString(testWoundCapture);

        when(woundCaptureRepository.findByWoundCaptureId(Mockito.any(String.class))).thenReturn(testWoundCapture);

        // Act
        ResponseEntity response = woundCaptureService.getWoundCapture(testWoundCaptureId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundCaptureService_GetWoundCaptureNoResult_ReturnsBadResponse() throws ExecutionException, InterruptedException {
        // Arrange
        String testWoundCaptureId = "testWoundCaptureId";
        String expectedError = "Could not find Wound Capture with woundCaptureId: " + testWoundCaptureId;
        when(woundCaptureService.getWoundCapture(Mockito.any(String.class))).thenThrow(new IllegalArgumentException(expectedError));

        // Act
        ResponseEntity response = woundCaptureService.getWoundCapture(testWoundCaptureId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(expectedError);
    }

    @Test
    public void WoundCaptureService_GetWoundCaptureUnexpectedException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testWoundCaptureId = "testWoundCaptureId";
        String expectedResponse = "An exception occurred when searching for Wound Capture";
        when(woundCaptureService.getWoundCapture(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundCaptureService.getWoundCapture(testWoundCaptureId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundCaptureService_FindWoundCaptureByUserId_ReturnsOK() throws ExecutionException, InterruptedException, JsonProcessingException {
        // Arrange
        String testUserId = "testUserId";
        List<WoundCapture> testWoundCaptures = new ArrayList<>();

        WoundCapture testWoundCapture1 = new WoundCapture();
        testWoundCapture1.setWoundId("testWoundId");
        testWoundCapture1.setUid(testUserId);
        testWoundCapture1.setCaptureDate(new Date());
        testWoundCapture1.setFilename("testFilename");
        testWoundCaptures.add(testWoundCapture1);

        WoundCapture testWoundCapture2 = new WoundCapture();
        testWoundCapture2.setWoundId("testWoundId");
        testWoundCapture2.setUid(testUserId);
        testWoundCapture2.setCaptureDate(new Date());
        testWoundCapture2.setFilename("testFilename");
        testWoundCaptures.add(testWoundCapture2);

        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        String expectedResponse = ow.writeValueAsString(testWoundCaptures);

        when(woundCaptureRepository.findByUid(Mockito.any(String.class))).thenReturn(testWoundCaptures);

        // Act
        ResponseEntity response = woundCaptureService.findWoundCapturesByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void WoundCaptureService_FindWoundCaptureByUserIdNoResults_ReturnsBadResponse() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "testUserId";
        String expectedError = "Could not find Wound Capture with uid: " + testUserId;
        when(woundCaptureService.findWoundCapturesByUserId(Mockito.any(String.class))).thenThrow(new IllegalArgumentException(expectedError));

        // Act
        ResponseEntity response = woundCaptureService.findWoundCapturesByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(expectedError);
    }

    @Test
    public void WoundCaptureService_FindWoundCaptureByUserIdUnhandledException_ReturnsInternalServerError() throws ExecutionException, InterruptedException {
        // Arrange
        String testUserId = "testUserId";
        String expectedResponse = "An exception occurred when searching for Wound Captures";
        when(woundCaptureService.findWoundCapturesByUserId(Mockito.any(String.class))).thenThrow(ExecutionException.class);

        // Act
        ResponseEntity response = woundCaptureService.findWoundCapturesByUserId(testUserId);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }
}

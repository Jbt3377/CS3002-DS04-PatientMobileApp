package com.ds04.PatientMobileApp.util;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class CommonUtil {

    public static ResponseEntity<String> buildResponseEntity(String responseBody, HttpStatus httpStatus) {
        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseBody);
    }

    /**
     * Used to convert a list of Wound objects into a JSON list
     */
    public static String convertListOfWoundsToJson(List<Wound> wounds) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        om.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return om.writeValueAsString(wounds);
    }

    /**
     * Used to convert a list of Wound Capture objects into a JSON list
     */
    public static String convertListOfWoundCapturesToJson(List<WoundCapture> woundCaptures) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        om.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return om.writeValueAsString(woundCaptures);
    }
}

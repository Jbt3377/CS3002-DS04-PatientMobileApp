package com.ds04.PatientMobileApp.utilTests;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.util.CommonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class CommonUtilTests {

    @Test
    public void CommonUtil_BuildResponseEntity_ReturnsExpected(){
        // Arrange
        HttpStatus expectedHttpStatus = HttpStatus.OK;
        String expectedResponseBody = "{ \"test\" : \"helloWorld\" }";
        MediaType expectedContentType = MediaType.APPLICATION_JSON;

        // Act
        ResponseEntity result = CommonUtil.buildResponseEntity(
                "{ \"test\" : \"helloWorld\" }",
                HttpStatus.OK
        );

        // Assert
        assertThat(result.getStatusCode()).isEqualTo(expectedHttpStatus);
        assertThat(result.getBody()).isEqualTo(expectedResponseBody);
        assertThat(result.getHeaders().getContentType()).isEqualTo(expectedContentType);
    }
}

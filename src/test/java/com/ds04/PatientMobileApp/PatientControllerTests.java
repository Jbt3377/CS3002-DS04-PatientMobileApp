package com.ds04.PatientMobileApp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class PatientControllerTests {

    @Autowired
    private MockMvc mockMvc;

//    @Test
//    public void createPatientTest() throws Exception {
//        String requestBody = "{\"uid\":\"test\"}";
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("http://localhost:8080/api/patient/create")
//                        .content(requestBody)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("Patient created successfully"));
//    }


}

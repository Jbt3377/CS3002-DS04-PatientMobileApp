package com.ds04.PatientMobileApp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "DS04 Backend API", version = "1.0", description = "Serves React Native Patient Mobile App"))
public class PatientMobileAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PatientMobileAppApplication.class, args);
	}
}



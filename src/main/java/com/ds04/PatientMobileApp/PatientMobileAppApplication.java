package com.ds04.PatientMobileApp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import nu.pattern.OpenCV;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "DS04 Backend API", version = "1.0", description = "Serves React Native Patient Mobile App"))
public class PatientMobileAppApplication {

//	static{ System.loadLibrary(Core.NATIVE_LIBRARY_NAME); }

	public static void main(String[] args) {

		OpenCV.loadShared();

		SpringApplication.run(PatientMobileAppApplication.class, args);
	}
}



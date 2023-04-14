package com.ds04.PatientMobileApp.repository;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseInitializer {

    @PostConstruct
    public void initialize() {
        try {
            System.out.println("Working Directory = " + System.getProperty("user.dir"));
            FileInputStream serviceAccount = new FileInputStream(System.getProperty("user.dir") + "/src/main/resources/serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket("ds04-7d54b.appspot.com")
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}

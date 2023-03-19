package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class WoundCaptureRepository {

    public String create(WoundCapture woundCapture) throws ExecutionException, InterruptedException {
        return null;
    }
}

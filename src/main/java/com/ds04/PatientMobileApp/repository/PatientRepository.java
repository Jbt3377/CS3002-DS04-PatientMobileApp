package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.entity.Wound;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class PatientRepository {

    private static final String COLLECTION_NAME = "patients";

    public String create(Patient patient) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(patient.getPatientId()).set(patient);
        return future.get().getUpdateTime().toString();
    }

    public Patient findById(String patientId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(patientId).get();
        DocumentSnapshot document = future.get();

        if(document.exists()){
            return document.toObject(Patient.class);
        }else{
            return null;
        }
    }

    public Patient findByUserId(String patientId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("uid", patientId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if(!documents.isEmpty()){
            return documents.get(0).toObject(Patient.class);
        }else{
            return null;
        }
    }

    public String update(String patientId, Patient patient) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(patientId).update(patient.convertToMap());
        return future.get().getUpdateTime().toString();
    }

    public String delete(String patientId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(patientId).delete();
        return future.get().getUpdateTime().toString();
    }
}

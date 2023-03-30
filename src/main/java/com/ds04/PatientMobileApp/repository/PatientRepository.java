package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.Patient;
import com.google.api.core.ApiFuture;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class PatientRepository {

    private static final String COLLECTION_NAME = "patients";

    public String create(Patient patient) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(patient.getPatientId()).set(patient.convertToMap());
        return future.get().getUpdateTime().toString();
    }

    public Patient findByPatientId(String patientId) throws ExecutionException, InterruptedException, IllegalArgumentException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(patientId).get();
        DocumentSnapshot document = future.get();

        if(document.exists()){
            return document.toObject(Patient.class);
        }else{
            throw new IllegalArgumentException("Could not find Patient with patientId: " + patientId);
        }
    }

    public Patient findByUserId(String uid) throws ExecutionException, InterruptedException, IllegalArgumentException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("uid", uid).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if(!documents.isEmpty()){
            return documents.get(0).toObject(Patient.class);
        }else{
            throw new IllegalArgumentException("Could not find Patient with uid: " + uid);
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

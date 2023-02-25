package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.entity.Wound;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class PatientRepository {

    public String create(Patient patient) throws ExecutionException, InterruptedException {
//        Firestore db = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(wound.getWoundId()).set(wound);
//        return future.get().getUpdateTime().toString();
        return null;
    }

    public Patient findById(String patientId) throws ExecutionException, InterruptedException {
//        Firestore db = FirestoreClient.getFirestore();
//        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(woundId).get();
//        DocumentSnapshot document = future.get();
//
//        if(document.exists()){
//            return document.toObject(Wound.class);
//        }else{
//            return null;
//        }
        return null;
    }

    public String update(String patientId, Patient patient) throws ExecutionException, InterruptedException {
//        ObjectMapper oMapper = new ObjectMapper();
//        Map<String, Object> map = oMapper.convertValue(wound, Map.class);
//
//        Firestore db = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(woundId).update(map);
//        return future.get().getUpdateTime().toString();
        return null;
    }

    public String delete(String patientId) throws ExecutionException, InterruptedException {
//        Firestore db = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(woundId).delete();
//        return future.get().getUpdateTime().toString();
        return null;
    }
}

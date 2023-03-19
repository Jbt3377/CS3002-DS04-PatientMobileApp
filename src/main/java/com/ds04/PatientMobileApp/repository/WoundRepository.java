package com.ds04.PatientMobileApp.repository;

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
public class WoundRepository {

    private static final String COLLECTION_NAME = "wounds";

    public String create(Wound wound) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(wound.getWoundId()).set(wound.convertToMap());
        return future.get().getUpdateTime().toString();
    }

    public Wound findById(String woundId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(woundId).get();
        DocumentSnapshot document = future.get();

        if(document.exists()){
            return document.toObject(Wound.class);
        }else{
            return null;
        }
    }

    public List<Wound> findByUid(String uid) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("uid", uid).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Wound> results = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            results.add(document.toObject(Wound.class));
        }
        return results;
    }

    public String update(String woundId, Wound wound) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(woundId).update(wound.convertToMap());
        return future.get().getUpdateTime().toString();
    }

    public String delete(String woundId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(woundId).delete();
        return future.get().getUpdateTime().toString();
    }
}

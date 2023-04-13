package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class WoundCaptureRepository {

    private static final String COLLECTION_NAME = "woundCaptures";
    private static final String CONTENT_TYPE = "image/jpeg";


    public String create(WoundCapture woundCapture, byte[] photo) throws ExecutionException, InterruptedException,
            IOException {
        Firestore db = FirestoreClient.getFirestore();
        Credentials credentials = db.getOptions().getCredentials();
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Bucket bucket = StorageClient.getInstance().bucket();
        
        // Generate and set Filename (filename is a composite of uid and WoundCaptureId)
        String filename = woundCapture.getUid() + "_" + woundCapture.getWoundCaptureId();
        woundCapture.setFilename(filename);

        // Create Blob
        BlobId blobId = BlobId.of(bucket.getName(), filename);

        // Create a BlobInfo with the content type of the file
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(CONTENT_TYPE).build();

        // Upload the file to Firebase Storage
        storage.create(blobInfo, photo);
        System.out.println("File uploaded successfully!");

        // Upload Wound Capture Document
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME)
                .document(woundCapture.getWoundCaptureId())
                .set(woundCapture.convertToMap());
        System.out.println("Wound Capture saved successfully!");

        return future.get().getUpdateTime().toString();
    }

    public WoundCapture findByWoundCaptureId(String woundCaptureId) throws ExecutionException, InterruptedException, IllegalArgumentException {
        Firestore db = FirestoreClient.getFirestore();
        Credentials credentials = db.getOptions().getCredentials();
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Bucket bucket = StorageClient.getInstance().bucket();

        // Get Document
        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(woundCaptureId).get();
        DocumentSnapshot document = future.get();

        if(!document.exists()){
            throw new IllegalArgumentException("Could not find Wound Capture with woundCaptureId: " + woundCaptureId);
        }

        // Convert to WoundCapture Object
        WoundCapture woundCapture = document.toObject(WoundCapture.class);
        assert woundCapture != null;

        // Retrieve photo & add to WoundCapture
        byte[] base64Image = storage.readAllBytes(bucket.getName(), woundCapture.getFilename());
        woundCapture.setBase64Image(base64Image);

        return woundCapture;
    }

    public List<WoundCapture> findByUid(String uid) throws ExecutionException, InterruptedException, IllegalArgumentException {
        Firestore db = FirestoreClient.getFirestore();

        // Get documents
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("woundId", uid).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if(documents.isEmpty()){
            throw new IllegalArgumentException("Could not find Wound Capture with uid: " + uid);
        }

        // Convert documents to WoundCapture objects
        ArrayList<WoundCapture> results = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            results.add(document.toObject(WoundCapture.class));
        }

        return results;
    }
}

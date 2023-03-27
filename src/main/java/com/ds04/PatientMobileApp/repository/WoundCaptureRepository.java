package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.*;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class WoundCaptureRepository {

    private static final String COLLECTION_NAME = "woundCaptures";

    public String create(WoundCapture woundCapture, MultipartFile photo) throws ExecutionException, InterruptedException, IOException {
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
        String contentType = photo.getContentType();
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();

        // Upload the file to Firebase Storage
        byte[] content = photo.getBytes();
        storage.create(blobInfo, content);
        System.out.println("File uploaded successfully!");

        // Upload Wound Capture Document
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(woundCapture.getWoundCaptureId()).set(woundCapture.convertToMap());
        return future.get().getUpdateTime().toString();
    }

    public WoundCapture findByWoundId(String woundCaptureId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Credentials credentials = db.getOptions().getCredentials();
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Bucket bucket = StorageClient.getInstance().bucket();

        // Get Document
        ApiFuture<DocumentSnapshot> future = db.collection(COLLECTION_NAME).document(woundCaptureId).get();
        DocumentSnapshot document = future.get();

        if(!document.exists()){
            return null;
        }

        // Convert to WoundCapture Object
        WoundCapture woundCapture = document.toObject(WoundCapture.class);
        assert woundCapture != null;

        // Retrieve photo & add to WoundCapture
        Blob imageBlob = storage.get(bucket.getName(), woundCapture.getFilename());
        woundCapture.setImageBlob(imageBlob);

        return woundCapture;
    }

    public List<WoundCapture> findByUid(String uid) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Credentials credentials = db.getOptions().getCredentials();
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Bucket bucket = StorageClient.getInstance().bucket();

        System.out.println("Here");

        // Get documents
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).orderBy("injuryDate").whereEqualTo("uid", uid).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Convert documents to WoundCapture objects
        ArrayList<WoundCapture> results = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            results.add(document.toObject(WoundCapture.class));
        }

        System.out.println("Debug");
        System.out.println(documents.size());
        System.out.println(results);

        // Retrieve photo & add to WoundCapture
        for(WoundCapture woundCapture: results){
            Blob imageBlob = storage.get(bucket.getName(), woundCapture.getFilename());
            woundCapture.setImageBlob(imageBlob);
        }

        return results;
    }
}

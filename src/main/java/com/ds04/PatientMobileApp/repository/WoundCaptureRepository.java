package com.ds04.PatientMobileApp.repository;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutionException;

@Repository
public class WoundCaptureRepository {

    public String create(WoundCapture woundCapture) throws ExecutionException, InterruptedException, IOException {
        Firestore db = FirestoreClient.getFirestore();
        Credentials credentials = db.getOptions().getCredentials();
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();

        Bucket bucket = StorageClient.getInstance().bucket();
        BlobId blobId = BlobId.of(bucket.getName(), woundCapture.getPhoto().getName());

        // Create a BlobInfo with the content type of the file
        String contentType = woundCapture.getPhoto().getContentType();
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();

        // Upload the file to Firebase Storage
        byte[] content = woundCapture.getPhoto().getBytes();
        storage.create(blobInfo, content);
        System.out.println("File uploaded successfully!");

        return "success";
    }
}

package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public ResponseEntity createWoundCapture(String uid, String woundId, Date captureDate, MultipartFile photo) {
        try {
            // Check provided parameters
            if (uid == null || uid.isEmpty()) {
                throw new IllegalArgumentException("uid property must be provided");
            } else if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            } else if (captureDate == null) {
                throw new IllegalArgumentException("captureDate property must be provided");
            } else if (photo == null) {
                throw new IllegalArgumentException("photo must be provided");
            }

            // Build WoundCapture object
            WoundCapture woundCapture = new WoundCapture(uid, woundId, captureDate);

            if(woundCapture.getWoundCaptureId() == null){
                woundCapture.setWoundCaptureId();
            }

            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.create(woundCapture, photo));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when creating Wound Capture");
        }
    }
    public ResponseEntity getWoundCapture(String woundCaptureId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.findByWoundCaptureId(woundCaptureId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wound Capture");
        }
    }

    public ResponseEntity findWoundCapturesByUser(String uid){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.findByUid(uid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wound Capture");
        }
    }
}

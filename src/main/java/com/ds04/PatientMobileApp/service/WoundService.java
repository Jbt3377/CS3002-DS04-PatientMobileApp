package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.repository.WoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WoundService {

    @Autowired
    private final WoundRepository woundRepository;

    public WoundService(WoundRepository woundRepository) {
        this.woundRepository = woundRepository;
    }

    public ResponseEntity createWound(Wound newWound) {
        try {
            // Check uid was provided
            if(newWound.getUid() == null || newWound.getUid().isEmpty()) {
                throw new IllegalArgumentException("uid property is required but was not provided ");
            }

            if(newWound.getWoundId() == null){
                newWound.setWoundId();
            }

            return ResponseEntity.status(HttpStatus.OK).body(woundRepository.create(newWound));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when creating Wound");
        }
    }

    public ResponseEntity findWoundByWoundId(String woundId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundRepository.findWoundByWoundId(woundId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wound");
        }
    }

    public ResponseEntity findWoundsByUid(String uid){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundRepository.findWoundsByUid(uid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wounds");
        }
    }

    public ResponseEntity updateWound(String woundId, Wound update){
        try {
            if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            } else if (update.getUid() == null) {
                throw new IllegalArgumentException("uid property must be provided"); // Check uid was provided - this cannot be overwritten
            }

            return ResponseEntity.status(HttpStatus.OK).body(woundRepository.update(woundId, update));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when update Wound");
        }
    }

    public ResponseEntity deleteWound(String woundId){
        try {
            if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            }

            return ResponseEntity.status(HttpStatus.OK).body(woundRepository.delete(woundId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when deleting Wound");
        }
    }
}

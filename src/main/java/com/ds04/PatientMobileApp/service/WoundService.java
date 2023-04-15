package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.repository.WoundRepository;
import com.ds04.PatientMobileApp.util.CommonUtil;
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
                throw new IllegalArgumentException("uid property is required but was not provided");
            }

            if(newWound.getWoundId() == null){
                newWound.setWoundId();
            }

            return CommonUtil.buildResponseEntity(woundRepository.create(newWound), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when creating Wound",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity findWoundByWoundId(String woundId){
        try {
            return CommonUtil.buildResponseEntity(woundRepository.findWoundByWoundId(woundId).convertToJson(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Wound",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity findWoundsByUid(String uid){
        try {
            List<Wound> results = woundRepository.findWoundsByUid(uid);
            return CommonUtil.buildResponseEntity(CommonUtil.convertListOfWoundsToJson(results), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Wounds",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity updateWound(String woundId, Wound update){
        try {
            if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            } else if (update.getUid() == null) {
                throw new IllegalArgumentException("uid property must be provided"); // Check uid was provided - this cannot be overwritten
            }

            return CommonUtil.buildResponseEntity(
                    woundRepository.update(woundId, update),
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when updating Wound",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity deleteWound(String woundId){
        try {
            if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            }

            return CommonUtil.buildResponseEntity(
                    woundRepository.delete(woundId),
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when deleting Wound",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}

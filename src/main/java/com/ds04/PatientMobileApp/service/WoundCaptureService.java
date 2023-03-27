package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public String createWoundCapture(WoundCapture woundCapture, MultipartFile photo) {
        try {
            if(woundCapture.getWoundCaptureId() == null){
                woundCapture.setWoundCaptureId();
            }

            return woundCaptureRepository.create(woundCapture, photo);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
    public WoundCapture getWoundCapture(String woundCaptureId){
        try {
            return woundCaptureRepository.findByWoundId(woundCaptureId);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public List<WoundCapture> findWoundCapturesByUser(String uid){
        try {
            return woundCaptureRepository.findByUid(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
}

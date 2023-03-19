package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public String createWoundCapture(WoundCapture woundCapture) {
        try {
            // Check if WoundId provided
            if(woundCapture.getWoundCaptureId() == null){
                woundCapture.setWoundCaptureId();
            }

            return woundCaptureRepository.create(woundCapture);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

}

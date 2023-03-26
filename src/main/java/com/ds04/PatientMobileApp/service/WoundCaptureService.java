package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public String createWoundCapture(WoundCapture woundCapture) {
        try {

            woundCaptureRepository.create(woundCapture);
            System.out.println("reached okay!");
            return "executed okay!";
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
}

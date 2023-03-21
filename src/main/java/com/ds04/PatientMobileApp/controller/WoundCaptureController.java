package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.service.WoundCaptureService;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/woundCapture/")
public class WoundCaptureController {

    @Autowired
    private WoundCaptureService woundCaptureService;

    @PostMapping("/create")
    public String createWoundCapture(@RequestBody WoundCapture woundCapture) {
        return woundCaptureService.createWoundCapture(woundCapture);
    }

}

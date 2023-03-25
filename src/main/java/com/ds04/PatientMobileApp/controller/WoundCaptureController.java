package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.service.WoundCaptureService;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/woundCapture/")
public class WoundCaptureController {

    @Autowired
    private WoundCaptureService woundCaptureService;

    @PostMapping("/create")
    public String createWoundCapture(
            @RequestParam("uid") String uid,
            @RequestParam("woundId") String woundId,
            @RequestPart("photo") MultipartFile photo) {

        System.out.println("Endpoint hit!");
        System.out.println("uid: " + uid);
        System.out.println("woundId: " + woundId);
        System.out.println("photo name: " + photo.getName());
        return "success";
//        return woundCaptureService.createWoundCapture(woundCapture);
    }

}

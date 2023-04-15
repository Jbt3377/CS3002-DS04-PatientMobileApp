package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.service.WoundCaptureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RestController
@RequestMapping("/api/woundCapture/")
public class WoundCaptureController {

    @Autowired
    private WoundCaptureService woundCaptureService;

    @PostMapping("/create")
    public ResponseEntity createWoundCapture(
            @RequestParam("uid") String uid,
            @RequestParam("woundId") String woundId,
            @RequestParam("captureDate") Date captureDate,
            @RequestPart("photo") MultipartFile photo) {
        return woundCaptureService.createWoundCapture(uid, woundId, captureDate, photo);
    }

    @GetMapping("/getWoundCapture/{woundCaptureId}")
    public ResponseEntity getWoundCapture(@PathVariable String woundCaptureId) {
        return woundCaptureService.getWoundCapture(woundCaptureId);
    }

    @GetMapping("/findWoundCapturesByUser/{uid}")
    public ResponseEntity findWoundCapturesByUser(@PathVariable String uid) {
        return woundCaptureService.findWoundCapturesByUserId(uid);
    }

}

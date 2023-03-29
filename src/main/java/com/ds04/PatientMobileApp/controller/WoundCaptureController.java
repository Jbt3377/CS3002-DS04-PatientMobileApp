package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.service.WoundCaptureService;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

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


        WoundCapture woundCapture = new WoundCapture(uid, woundId, captureDate);
        String response = woundCaptureService.createWoundCapture(woundCapture, photo);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getWoundCapture/{woundCaptureId}")
    public ResponseEntity getWoundCapture(@PathVariable String woundCaptureId) {
        WoundCapture woundCapture = woundCaptureService.getWoundCapture(woundCaptureId);
        return new ResponseEntity<>(woundCapture, HttpStatus.OK);
    }

    @GetMapping("/findWoundCapturesByUser/{uid}")
    public List<WoundCapture> findWoundCapturesByUser(@PathVariable String uid) {
        return woundCaptureService.findWoundCapturesByUser(uid);
    }

}

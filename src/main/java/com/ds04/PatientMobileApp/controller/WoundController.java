package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wound/")
public class WoundController {

    @Autowired
    private WoundService woundService;

    @PostMapping("/create")
    public ResponseEntity createWound(@RequestBody Wound wound) {
        return woundService.createWound(wound);
    }

    @GetMapping("/getWound/{woundId}")
    public ResponseEntity getWound(@PathVariable String woundId) {
        return woundService.findWoundByWoundId(woundId);
    }

    @GetMapping("/findWounds/{uid}")
    public ResponseEntity findWounds(@PathVariable String uid) {
        return woundService.findWoundsByUid(uid);
    }

    @PutMapping("/update/{woundId}")
    public ResponseEntity updateWound(@PathVariable String woundId, @RequestBody Wound update) {
        return woundService.updateWound(woundId, update);
    }

    @DeleteMapping("/delete/{woundId}")
    public ResponseEntity deleteWound(@PathVariable String woundId) {
        return woundService.deleteWound(woundId);
    }

}

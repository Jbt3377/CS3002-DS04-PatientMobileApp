package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wound/")
public class WoundController {

    @Autowired
    private WoundService woundService;

    @PostMapping("/create")
    public String createWound(@RequestBody Wound wound) {
        return woundService.createWound(wound);
    }

    @GetMapping("/getWound/{woundId}")
    public Wound getWound(@PathVariable String woundId) {
        return woundService.getWound(woundId);
    }

    @GetMapping("/findWounds/{uid}")
    public List<Wound> findWounds(@PathVariable String uid) {
        return woundService.findWoundsByUid(uid);
    }

    @PutMapping("/update/{woundId}")
    public String updateWound(@PathVariable String woundId, @RequestBody Wound update) {
        return woundService.updateWound(woundId, update);
    }

    @DeleteMapping("/delete/{woundId}")
    public String deleteWound(@PathVariable String woundId) {
        return woundService.deleteWound(woundId);
    }

}

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
    public String createWound(@RequestBody Wound newWound) {
        return woundService.createWound(newWound);
    }

    @GetMapping("/getWound/{woundId}")
    public Wound getWound(@PathVariable String woundId) {
        return woundService.getWound(woundId);
    }

    @GetMapping("/findWounds/{patientId}")
    public List<Wound> findWounds(@PathVariable String patientId) {
        return woundService.findWounds(patientId);
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

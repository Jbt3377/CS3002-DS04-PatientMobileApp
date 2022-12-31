package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.service.WoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wound/")
public class WoundController {

    @Autowired
    WoundService woundService;

    @GetMapping("/")
    public ResponseEntity<?> createWound() {

        List<Wound> resource = woundService.getWounds();
        return ResponseEntity.ok(resource);
    }

}

package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient/")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/create")
    public ResponseEntity createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @GetMapping("/getPatientByPatientId/{patientId}")
    public ResponseEntity getPatient(@PathVariable String patientId) {
        return patientService.getPatientByPatientId(patientId);
    }

    @GetMapping("/getPatientByUserId/{userId}")
    public ResponseEntity getPatientByUserId(@PathVariable String userId) {
        return patientService.getPatientByUserId(userId);
    }

    @PutMapping("/update/{patientId}")
    public ResponseEntity updatePatient(@PathVariable String patientId, @RequestBody Patient update) {
        return patientService.updatePatient(patientId, update);
    }

    @DeleteMapping("/delete/{patientId}")
    public ResponseEntity deletePatient(@PathVariable String patientId) {
        return patientService.deletePatient(patientId);
    }


}

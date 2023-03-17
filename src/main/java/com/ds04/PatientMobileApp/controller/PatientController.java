package com.ds04.PatientMobileApp.controller;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient/")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/create")
    public String createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @GetMapping("/getPatientByPatientId/{patientId}")
    public Patient getPatient(@PathVariable String patientId) {
        return patientService.getPatient(patientId);
    }

    @GetMapping("/getPatientByUserId/{userId}")
    public Patient getPatientByUserId(@PathVariable String userId) {
        return patientService.getPatientByUserId(userId);
    }

    @PutMapping("/update/{patientId}")
    public String updatePatient(@PathVariable String patientId, @RequestBody Patient update) {
        return patientService.updatePatient(patientId, update);
    }

    @DeleteMapping("/delete/{patientId}")
    public String deletePatient(@PathVariable String patientId) {
        return patientService.deletePatient(patientId);
    }


}

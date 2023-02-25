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
    public String createPatient(@RequestBody Patient newPatient) {
        return patientService.createPatient(newPatient);
    }

    @GetMapping("/get/{patientId}")
    public Patient getPatient(@PathVariable String patientId) {
        return patientService.getPatient(patientId);
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

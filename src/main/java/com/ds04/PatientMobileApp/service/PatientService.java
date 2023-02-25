package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PatientService {

    @Autowired
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public String createPatient(Patient newPatient) {
        try {
            // Check if WoundId provided
            if(newPatient.getPatientId() == null){
                newPatient.setPatientId();
            }

            return patientRepository.create(newPatient);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Patient getPatient(String patientId){
        try {
            return patientRepository.findById(patientId);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public String updatePatient(String patientId, Patient update){
        try {
            return patientRepository.update(patientId, update);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public String deletePatient(String patientId){
        try {
            return patientRepository.delete(patientId);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
}

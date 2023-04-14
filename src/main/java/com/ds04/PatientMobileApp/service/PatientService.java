package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class PatientService {

    @Autowired
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public ResponseEntity createPatient(Patient patient) {
        try {

            // Check uid was provided
            if(patient.getUid() == null || patient.getUid().isEmpty()) {
                throw new IllegalArgumentException("uid property is required but was not provided");
            }

            // Generate a PatientId
            if(patient.getPatientId() == null) {
                patient.setPatientId();
            }

            return ResponseEntity.status(HttpStatus.OK).body(patientRepository.create(patient));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when creating Patient");
        }
    }

    public ResponseEntity getPatientByPatientId(String patientId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(patientRepository.findByPatientId(patientId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Patient");
        }
    }

    public ResponseEntity getPatientByUserId(String userId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(patientRepository.findByUserId(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Patient");
        }
    }

    public ResponseEntity updatePatient(String patientId, Patient update){
        try {
            if (patientId == null || patientId.isEmpty()) {
                throw new IllegalArgumentException("patientId property must be provided");
            } else if (update.getUid() == null) {
                // Check uid was provided - this cannot be overwritten
                throw new IllegalArgumentException("uid property must be provided");
            }

            return ResponseEntity.status(HttpStatus.OK).body(patientRepository.update(patientId, update));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when updating Patient");
        }
    }

    public ResponseEntity<String> deletePatient(String patientId){
        try {
            if (patientId == null || patientId.isEmpty()) {
                throw new IllegalArgumentException("patientId property must be provided");
            }

            return ResponseEntity.status(HttpStatus.OK).body(patientRepository.delete(patientId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when deleting Patient");
        }
    }
}

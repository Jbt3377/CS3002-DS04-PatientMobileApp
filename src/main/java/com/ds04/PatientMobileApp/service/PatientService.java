package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Patient;
import com.ds04.PatientMobileApp.repository.PatientRepository;
import com.ds04.PatientMobileApp.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

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
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when creating Patient",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity getPatientByPatientId(String patientId){
        try {
            return CommonUtil.buildResponseEntity(patientRepository.findByPatientId(patientId).convertToJson(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Patient",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity getPatientByUserId(String userId){
        try {
            return CommonUtil.buildResponseEntity(patientRepository.findByUserId(userId).convertToJson(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Patient",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
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

            return CommonUtil.buildResponseEntity(patientRepository.update(patientId, update), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when updating Patient",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity deletePatient(String patientId){
        try {
            if (patientId == null || patientId.isEmpty()) {
                throw new IllegalArgumentException("patientId property must be provided");
            }

            return CommonUtil.buildResponseEntity(patientRepository.delete(patientId), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when deleting Patient",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}

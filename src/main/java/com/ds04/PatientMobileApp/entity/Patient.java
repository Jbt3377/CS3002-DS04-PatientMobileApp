package com.ds04.PatientMobileApp.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.cloud.firestore.annotation.DocumentId;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

public class Patient {

    @DocumentId
    private String patientId;
    private String uid;
    private String firstname;
    private String surname;
    private Date dob;
    private String gender;
    private String homeAddress;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId() {
        this.patientId = UUID.randomUUID().toString();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public HashMap<String, Object> convertToMap() {
        HashMap<String, Object> docData = new HashMap<>();

        docData.put("uid", this.uid);
        docData.put("firstname", this.firstname);
        docData.put("surname", this.surname);
        docData.put("dob", this.dob);
        docData.put("gender", this.gender);
        docData.put("homeAddress", this.homeAddress);
        return docData;
    }

    public String convertToJson() throws JsonProcessingException {
        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return ow.writeValueAsString(this);
    }

}

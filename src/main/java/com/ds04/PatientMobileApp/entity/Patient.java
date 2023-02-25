package com.ds04.PatientMobileApp.entity;

import com.google.cloud.firestore.annotation.DocumentId;

import java.util.Date;
import java.util.UUID;

public class Patient {

    @DocumentId
    private String patientId;
    private String forename;
    private String surname;
    private Date dateOfBirth;
    private String gender;
    private String address;         // TODO: Expand to own class
    private String emailAddress;    // TODO: Expand to own class
    private String username;
    private String password;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId() {
        this.patientId = UUID.randomUUID().toString();
    }

    public String getForename() {
        return forename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

package com.ds04.PatientMobileApp.entity;

import com.google.cloud.firestore.annotation.DocumentId;

import java.util.Date;
import java.util.UUID;

public class WoundCapture {

    @DocumentId
    private String woundCaptureId;
    private String uid;
    private String woundId;
    private Date captureDate;
    private double c02Value;
    private boolean isInfected;

    public String getWoundCaptureId() {
        return woundCaptureId;
    }

    public void setWoundCaptureId() {
        this.woundCaptureId = UUID.randomUUID().toString();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getWoundId() {
        return woundId;
    }

    public void setWoundId(String woundId) {
        this.woundId = woundId;
    }

    public Date getCaptureDate() {
        return captureDate;
    }

    public void setCaptureDate(Date captureDate) {
        this.captureDate = captureDate;
    }

    public double getC02Value() {
        return c02Value;
    }

    public void setC02Value(double c02Value) {
        this.c02Value = c02Value;
    }

    public boolean isInfected() {
        return isInfected;
    }

    public void setInfected(boolean infected) {
        isInfected = infected;
    }
}

package com.ds04.PatientMobileApp.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.cloud.firestore.annotation.DocumentId;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Schema
public class WoundCapture {

    @DocumentId
    private String woundCaptureId;
    private String uid;
    private String woundId;
    private Date captureDate;
    private String filename;
    private byte[] base64Image;
    private double c02Value;
    private boolean isInfected;

    public WoundCapture(){}

    public WoundCapture(String uid, String woundId, Date captureDate){
        this.uid = uid;
        this.woundId = woundId;
        this.captureDate = captureDate;
    }

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

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public double getC02Value() {
        return c02Value;
    }

    public void setC02Value(double c02Value) {
        this.c02Value = c02Value;
    }

    public boolean getIsInfected() {
        return isInfected;
    }

    public void setIsInfected(boolean isInfected) {
        this.isInfected = isInfected;
    }

    public HashMap<String, Object> convertToMap() {
        HashMap<String, Object> docData = new HashMap<>();

        docData.put("uid", this.uid);
        docData.put("woundId", this.woundId);
        docData.put("captureDate", this.captureDate);
        docData.put("filename", this.filename);
        docData.put("c02Value", this.c02Value);
        docData.put("isInfected", this.isInfected);
        return docData;
    }

    public byte[] getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(byte[] base64Image) {
        this.base64Image = base64Image;
    }

    public String convertToJson() throws JsonProcessingException {
        ObjectMapper ow = new ObjectMapper();
        ow.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return ow.writeValueAsString(this);
    }
}

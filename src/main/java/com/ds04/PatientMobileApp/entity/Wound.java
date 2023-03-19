package com.ds04.PatientMobileApp.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Schema
public class Wound {

    @DocumentId
    private String woundId;
    private String uid;
    private String woundType;
    private String woundLocationOnBody;
    private Date injuryDate;
    private String placeOfInjury;
    private double placeOfInjuryLatitude;
    private double placeOfInjuryLongitude;
    private String injuryIntent;
    private String injuryActivityStatus;
    private String injuryActivityType;
    private List<String> injuryMechanism;
    private boolean injuryDrugOrAlcoholInvolvement;
    private String assaultLocationDescription;

    public String getWoundId() {
        return woundId;
    }

    public void setWoundId() {
        woundId = UUID.randomUUID().toString();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getWoundType() {
        return woundType;
    }

    public void setWoundType(String woundType) {
        this.woundType = woundType;
    }

    public String getWoundLocationOnBody() {
        return woundLocationOnBody;
    }

    public void setWoundLocationOnBody(String woundLocationOnBody) {
        this.woundLocationOnBody = woundLocationOnBody;
    }

    public Date getInjuryDate() {
        return injuryDate;
    }

    public void setInjuryDate(Date injuryDate) {
        this.injuryDate = injuryDate;
    }

    public String getPlaceOfInjury() {
        return placeOfInjury;
    }

    public void setPlaceOfInjury(String placeOfInjury) {
        this.placeOfInjury = placeOfInjury;
    }

    public double getPlaceOfInjuryLatitude() {
        return placeOfInjuryLatitude;
    }

    public void setPlaceOfInjuryLatitude(double placeOfInjuryLatitude) {
        this.placeOfInjuryLatitude = placeOfInjuryLatitude;
    }

    public double getPlaceOfInjuryLongitude() {
        return placeOfInjuryLongitude;
    }

    public void setPlaceOfInjuryLongitude(double placeOfInjuryLongitude) {
        this.placeOfInjuryLongitude = placeOfInjuryLongitude;
    }

    public String getInjuryIntent() {
        return injuryIntent;
    }

    public void setInjuryIntent(String injuryIntent) {
        this.injuryIntent = injuryIntent;
    }

    public String getInjuryActivityStatus() {
        return injuryActivityStatus;
    }

    public void setInjuryActivityStatus(String injuryActivityStatus) {
        this.injuryActivityStatus = injuryActivityStatus;
    }

    public String getInjuryActivityType() {
        return injuryActivityType;
    }

    public void setInjuryActivityType(String injuryActivityType) {
        this.injuryActivityType = injuryActivityType;
    }

    public List<String> getInjuryMechanism() {
        return injuryMechanism;
    }

    public void setInjuryMechanism(List<String> injuryMechanism) {
        this.injuryMechanism = injuryMechanism;
    }

    public boolean getInjuryDrugOrAlcoholInvolvement() {
        return injuryDrugOrAlcoholInvolvement;
    }

    public void setInjuryDrugOrAlcoholInvolvement(boolean injuryDrugOrAlcoholInvolvement) {
        this.injuryDrugOrAlcoholInvolvement = injuryDrugOrAlcoholInvolvement;
    }

    public String getAssaultLocationDescription() {
        return assaultLocationDescription;
    }

    public void setAssaultLocationDescription(String assaultLocationDescription) {
        this.assaultLocationDescription = assaultLocationDescription;
    }

    public HashMap<String, Object> convertToMap() {
        HashMap<String, Object> docData = new HashMap<>();

        docData.put("uid", this.uid);
        docData.put("woundType", this.woundType);
        docData.put("woundLocationOnBody", this.woundLocationOnBody);
        docData.put("injuryDate", this.injuryDate);
        docData.put("placeOfInjury", this.placeOfInjury);
        docData.put("injuryIntent", this.injuryIntent);
        docData.put("injuryActivityStatus", this.injuryActivityStatus);
        docData.put("injuryActivityType", this.injuryActivityType);
        docData.put("injuryMechanism", this.injuryMechanism);
        docData.put("injuryDrugOrAlcoholInvolvement", this.injuryDrugOrAlcoholInvolvement);
        docData.put("assaultLocationDescription", this.assaultLocationDescription);
        return docData;
    }
}

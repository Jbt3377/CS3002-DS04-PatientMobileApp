package com.ds04.PatientMobileApp.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import io.swagger.v3.oas.annotations.media.Schema;
import org.joda.time.DateTime;

import java.util.UUID;

import static io.swagger.v3.oas.annotations.media.Schema.AccessMode.READ_ONLY;

@Schema
public class Wound {

    @DocumentId
    @Schema(accessMode = READ_ONLY)
    private String WoundId;
    private String PatientId;
    private String WoundType;
    private String WoundLocationOnBody;
    private DateTime InjuryDateTime;
    private String PlaceOfInjury;
    private double PlaceOfInjuryLatitude;
    private double PlaceOfInjuryLongitude;
    private String InjuryIntent;
    private String InjuryActivityStatus;
    private String InjuryActivityType;
    private String InjuryMechanism;
    private String InjuryAlcoholOrDrugInvolvement;
    private String AssaultLocationDescription;

    public String getWoundId() {
        return WoundId;
    }

    public void setWoundId() {
        WoundId = UUID.randomUUID().toString();;
    }

    public String getPatientId() {
        return PatientId;
    }

    public void setPatientId(String patientId) {
        PatientId = patientId;
    }

    public String getWoundType() {
        return WoundType;
    }

    public void setWoundType(String woundType) {
        WoundType = woundType;
    }

    public String getWoundLocationOnBody() {
        return WoundLocationOnBody;
    }

    public void setWoundLocationOnBody(String woundLocationOnBody) {
        WoundLocationOnBody = woundLocationOnBody;
    }

    public DateTime getInjuryDateTime() {
        return InjuryDateTime;
    }

    public void setInjuryDateTime(DateTime injuryDateTime) {
        InjuryDateTime = injuryDateTime;
    }

    public String getPlaceOfInjury() {
        return PlaceOfInjury;
    }

    public void setPlaceOfInjury(String placeOfInjury) {
        PlaceOfInjury = placeOfInjury;
    }

    public double getPlaceOfInjuryLatitude() {
        return PlaceOfInjuryLatitude;
    }

    public void setPlaceOfInjuryLatitude(double placeOfInjuryLatitude) {
        PlaceOfInjuryLatitude = placeOfInjuryLatitude;
    }

    public double getPlaceOfInjuryLongitude() {
        return PlaceOfInjuryLongitude;
    }

    public void setPlaceOfInjuryLongitude(double placeOfInjuryLongitude) {
        PlaceOfInjuryLongitude = placeOfInjuryLongitude;
    }

    public String getInjuryIntent() {
        return InjuryIntent;
    }

    public void setInjuryIntent(String injuryIntent) {
        InjuryIntent = injuryIntent;
    }

    public String getInjuryActivityStatus() {
        return InjuryActivityStatus;
    }

    public void setInjuryActivityStatus(String injuryActivityStatus) {
        InjuryActivityStatus = injuryActivityStatus;
    }

    public String getInjuryActivityType() {
        return InjuryActivityType;
    }

    public void setInjuryActivityType(String injuryActivityType) {
        InjuryActivityType = injuryActivityType;
    }

    public String getInjuryMechanism() {
        return InjuryMechanism;
    }

    public void setInjuryMechanism(String injuryMechanism) {
        InjuryMechanism = injuryMechanism;
    }

    public String getInjuryAlcoholOrDrugInvolvement() {
        return InjuryAlcoholOrDrugInvolvement;
    }

    public void setInjuryAlcoholOrDrugInvolvement(String injuryAlcoholOrDrugInvolvement) {
        InjuryAlcoholOrDrugInvolvement = injuryAlcoholOrDrugInvolvement;
    }

    public String getAssaultLocationDescription() {
        return AssaultLocationDescription;
    }

    public void setAssaultLocationDescription(String assaultLocationDescription) {
        AssaultLocationDescription = assaultLocationDescription;
    }
}

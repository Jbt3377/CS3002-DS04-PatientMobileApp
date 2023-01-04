package com.ds04.PatientMobileApp.entity;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;

import java.util.UUID;

public class Wound {

    private UUID WoundId;
    private UUID PatientId;
    private String WoundType;
    private String WoundLocationOnBody;
    private LocalDate InjuryDate;
    private LocalTime InjuryTime;
    private String PlaceOfInjury;
    private double PlaceOfInjuryLatitude;
    private double PlaceOfInjuryLongitude;
    private String InjuryIntent;
    private String InjuryActivityStatus;
    private String InjuryActivityType;
    private String InjuryMechanism;
    private String InjuryAlcoholOrDrugInvolvement;
    private String AssaultLocationDescription;
}

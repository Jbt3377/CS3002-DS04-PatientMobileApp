package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.repository.WoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WoundService {

    @Autowired
    private final WoundRepository woundRepository;

    public WoundService(WoundRepository woundRepository) {
        this.woundRepository = woundRepository;
    }

    public String createWound(Wound newWound) {
        try {
            if(newWound.getWoundId() == null){
                newWound.setWoundId();
            }

            return woundRepository.create(newWound);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public Wound getWound(String woundId){
        try {
            return woundRepository.findById(woundId);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public List<Wound> findWoundsByUid(String uid){
        try {
            return woundRepository.findByUid(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public String updateWound(String woundId, Wound update){
        try {
            return woundRepository.update(woundId, update);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }

    public String deleteWound(String woundId){
        try {
            return woundRepository.delete(woundId);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
}

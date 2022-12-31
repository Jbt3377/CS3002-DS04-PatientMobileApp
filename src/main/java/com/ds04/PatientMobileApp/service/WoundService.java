package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.Wound;
import com.ds04.PatientMobileApp.repository.WoundRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WoundService {

    private WoundRepository woundRepository;

    public WoundService(WoundRepository woundRepository) {
        this.woundRepository = woundRepository;
    }

    // TODO: DS04-12 Setup Data Storage method and connect with Repo Pattern

    public List<Wound> getWounds(){
        //return woundRepository.findAll();
        return null;
    }

    public Wound saveWound(Wound wound) {
        //return woundRepository.save(wound);
        return null;
    }
}

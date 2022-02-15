package com.atlantbh.auctionappbackend.SampleEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// API Layer

@RestController
@RequestMapping(path = "api/sample")
public class SampleEntityController {

    private final SampleEntityService sampleEntityService;

    @Autowired
    public SampleEntityController(SampleEntityService sampleEntityService) {
        this.sampleEntityService = sampleEntityService;
    }

    @GetMapping
    public List<SampleEntity> getSampleEntities() {
        return sampleEntityService.getSampleEntities();
    }
}

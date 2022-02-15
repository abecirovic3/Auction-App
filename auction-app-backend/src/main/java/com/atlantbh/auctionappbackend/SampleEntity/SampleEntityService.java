package com.atlantbh.auctionappbackend.SampleEntity;

import org.springframework.stereotype.Service;

import java.util.List;

// Service Layer

@Service
public class SampleEntityService {

    public List<SampleEntity> getSampleEntities() {
        // Return static data
        return List.of(
                new SampleEntity(
                        1L,
                        "Sample 1",
                        1
                ),
                new SampleEntity(
                        2L,
                        "Sample 2",
                        2
                )
        );
    }
}

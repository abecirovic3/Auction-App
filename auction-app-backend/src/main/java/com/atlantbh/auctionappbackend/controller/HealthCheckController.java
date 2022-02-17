package com.atlantbh.auctionappbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${API_PREFIX}/health")
public class HealthCheckController {

    @GetMapping
    public String checkHealth() {
        return "OK";
    }
}

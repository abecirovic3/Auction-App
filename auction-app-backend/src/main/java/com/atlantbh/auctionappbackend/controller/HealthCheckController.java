package com.atlantbh.auctionappbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${application.api.prefix}/health")
public class HealthCheckController {

    @GetMapping
    public String checkHealth() {
        return "OK";
    }
}

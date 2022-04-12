package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Country;
import com.atlantbh.auctionappbackend.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${application.api.prefix}/countries")
public class CountryController {
    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<Country>> getAll() {
        return new ResponseEntity<>(
                countryService.getAll(),
                HttpStatus.OK
        );
    }
}

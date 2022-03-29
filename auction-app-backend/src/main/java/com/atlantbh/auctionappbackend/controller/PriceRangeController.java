package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}/price-range")
public class PriceRangeController {
    private final ProductService productService;

    @Autowired
    public PriceRangeController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Double>> getPriceRange() {
        return new ResponseEntity<>(
                productService.getProductPriceRange(),
                HttpStatus.OK
        );
    }
}

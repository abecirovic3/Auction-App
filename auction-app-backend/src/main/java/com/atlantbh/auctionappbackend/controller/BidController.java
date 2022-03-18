package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.request.BidRequest;
import com.atlantbh.auctionappbackend.response.BidInfoResponse;
import com.atlantbh.auctionappbackend.service.BiddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${application.api.prefix}/bid")
public class BidController {
    private final BiddingService biddingService;

    @Autowired
    public BidController(BiddingService biddingService) {
        this.biddingService = biddingService;
    }

    @PostMapping(path = "/register-bid")
    public ResponseEntity<BidInfoResponse> processBidRegister(@RequestBody BidRequest bid) {
        return new ResponseEntity<>(
                biddingService.processBid(bid),
                HttpStatus.OK
        );
    }
}

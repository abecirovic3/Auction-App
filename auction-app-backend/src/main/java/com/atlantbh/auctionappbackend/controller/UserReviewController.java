package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.UserReview;
import com.atlantbh.auctionappbackend.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${application.api.prefix}/review")
public class UserReviewController {
    private final UserReviewService userReviewService;

    @Autowired
    public UserReviewController(UserReviewService userReviewService) {
        this.userReviewService = userReviewService;
    }

    @PostMapping
    public ResponseEntity<UserReview> createReview(@RequestBody UserReview userReview) {
        return new ResponseEntity<>(
                userReviewService.createReview(userReview),
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<UserReview> getReview(
            @RequestParam Long user,
            @RequestParam Long reviewer
    ) {
        return new ResponseEntity<>(
                userReviewService.getReview(user, reviewer),
                HttpStatus.OK
        );
    }
}

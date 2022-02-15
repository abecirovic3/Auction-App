package com.atlantbh.auctionappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AuctionAppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionAppBackendApplication.class, args);
	}

	@GetMapping
	public String hello() {
		return "Auction App Backend";
	}
}

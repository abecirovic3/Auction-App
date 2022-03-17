package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.response.BidInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class BiddingService {
    private final ProductUserBidRepository productUserBidRepository;

    @Autowired
    public BiddingService(ProductUserBidRepository productUserBidRepository) {
        this.productUserBidRepository = productUserBidRepository;
    }

    public BidInfoResponse processBid(ProductUserBid bid) {
        if (bid.getProduct().getSeller().getId().equals(bid.getUser().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seller can not bid on his/her products"
            );
        }

        Optional<ProductUserBid> higherBidOptional = productUserBidRepository.findByProductAndAmountGreaterThanEqual(bid.getProduct(), bid.getAmount());
        if (higherBidOptional.isPresent()) {
            return new BidInfoResponse("fail", "There are higher bids");
        } else if (bid.getAmount() <= bid.getProduct().getStartPrice()) {
            return new BidInfoResponse("fail", "Bid must be higher than start price");
        }

        bid.setDate(LocalDate.now());
        productUserBidRepository.save(bid);

        return new BidInfoResponse("success", "Bid placed successfully");
    }
}

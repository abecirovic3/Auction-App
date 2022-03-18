package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.request.BidRequest;
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

    public BidInfoResponse processBid(BidRequest bid) {
        if (bid.getBidder().getId().equals(bid.getProduct().getSeller().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seller can not bid on his/her products"
            );
        }

        Optional<ProductUserBid> higherBidOptional = productUserBidRepository.findByProductAndAmountGreaterThanEqual(bid.getProduct(), bid.getAmount());
        if (higherBidOptional.isPresent()) {
            return new BidInfoResponse("fail", "There are higher bids than yours. You could give a second try!");
        } else if (bid.getAmount() <= bid.getProduct().getStartPrice()) {
            return new BidInfoResponse("fail", "Bid must be higher than start price. You could give a second try!");
        }

        ProductUserBid saveBid = new ProductUserBid(bid.getProduct(), bid.getBidder(), bid.getAmount(), LocalDate.now());
        productUserBidRepository.save(saveBid);

        return new BidInfoResponse("success", "Congrats! You are the highest bidder!");
    }
}

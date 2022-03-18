package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
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
    private final ProductRepository productRepository;

    @Autowired
    public BiddingService(ProductUserBidRepository productUserBidRepository, ProductRepository productRepository) {
        this.productUserBidRepository = productUserBidRepository;
        this.productRepository = productRepository;
    }

    public BidInfoResponse processBid(ProductUserBid bid) {
        Optional<Product> productOptional = productRepository.findById(bid.getProduct().getId());

        if (productOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product with " + bid.getProduct().getId() + " doesn't exist"
            );
        }

        Product product = productOptional.get();

        if (product.getSeller().getId().equals(bid.getUser().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seller can not bid on his/her products"
            );
        }

        Optional<ProductUserBid> higherBidOptional =
                productUserBidRepository.findFirstByProductAndAmountGreaterThanEqual(product, bid.getAmount());
        if (higherBidOptional.isPresent()) {
            return new BidInfoResponse("warning", "There are higher bids than yours. You could give a second try!");
        } else if (bid.getAmount() <= product.getStartPrice()) {
            return new BidInfoResponse("warning", "Bid must be higher than start price. You could give a second try!");
        }

        bid.setDate(LocalDate.now());
        productUserBidRepository.save(bid);

        return new BidInfoResponse("success", "Congrats! You are the highest bidder!");
    }
}

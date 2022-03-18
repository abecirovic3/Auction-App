package com.atlantbh.auctionappbackend.request;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;

public class BidRequest {
    private User bidder;
    private Product product;
    private Double amount;

    public BidRequest() {
        // No args constructor needed by **framework**
    }

    public BidRequest(User bidder, Product product, Double amount) {
        this.bidder = bidder;
        this.product = product;
        this.amount = amount;
    }

    public User getBidder() {
        return bidder;
    }

    public void setBidder(User bidder) {
        this.bidder = bidder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}

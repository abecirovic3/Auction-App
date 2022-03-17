package com.atlantbh.auctionappbackend.response;

import com.atlantbh.auctionappbackend.domain.Product;

public class ProductOverviewResponse {
    private Product product;
    private Double highestBid;
    private Integer numberOfBids;
    private String timeLeft;

    public ProductOverviewResponse(Product product, Double highestBid, Integer numberOfBids, String timeLeft) {
        this.product = product;
        this.highestBid = highestBid;
        this.numberOfBids = numberOfBids;
        this.timeLeft = timeLeft;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(Double highestBid) {
        this.highestBid = highestBid;
    }

    public Integer getNumberOfBids() {
        return numberOfBids;
    }

    public void setNumberOfBids(Integer numberOfBids) {
        this.numberOfBids = numberOfBids;
    }

    public String getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(String timeLeft) {
        this.timeLeft = timeLeft;
    }
}

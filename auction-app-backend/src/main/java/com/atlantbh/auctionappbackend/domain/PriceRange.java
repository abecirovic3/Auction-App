package com.atlantbh.auctionappbackend.domain;

public class PriceRange {
    private Double minPrice;
    private Double maxPrice;

    public PriceRange(Double minPrice, Double maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }
}

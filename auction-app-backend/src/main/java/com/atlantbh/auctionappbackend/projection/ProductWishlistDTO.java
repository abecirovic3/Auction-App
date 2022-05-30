package com.atlantbh.auctionappbackend.projection;

import java.time.LocalDateTime;

public class ProductWishlistDTO {
    Long id;
    String name;
    Double startPrice;
    LocalDateTime endDate;
    Double highestBid;
    String coverImageUrl;

    public ProductWishlistDTO(ProductWishlistProjection product, String coverImageUrl) {
        this.id = product.getId();
        this.name = product.getName();
        this.startPrice = product.getStartPrice();
        this.endDate = product.getEndDate();
        this.highestBid = product.getHighestBid();
        this.coverImageUrl = coverImageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(Double startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(Double highestBid) {
        this.highestBid = highestBid;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }
}

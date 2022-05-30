package com.atlantbh.auctionappbackend.projection;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class ProductWishlistProjection {
    Long id;
    String name;
    Double startPrice;
    LocalDateTime endDate;
    Double highestBid;
}

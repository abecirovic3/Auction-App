package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductUserBidRepository extends JpaRepository<ProductUserBid, Long> {
}

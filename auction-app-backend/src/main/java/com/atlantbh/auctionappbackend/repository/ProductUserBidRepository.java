package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductUserBidRepository extends JpaRepository<ProductUserBid, Long> {
    List<ProductUserBid> findByProduct(Product product, Sort sort);
}

package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductUserBidRepository extends JpaRepository<ProductUserBid, Long> {
    List<ProductUserBid> findByProduct(Product product, Sort sort);
    Optional<ProductUserBid> findFirstByProductAndAmountGreaterThanEqual(Product product, Double amount);
}

package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

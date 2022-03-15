package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}

package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductUserBidRepository extends JpaRepository<ProductUserBid, Long> {
    List<ProductUserBid> findByProduct(Product product, Sort sort);
    Optional<ProductUserBid> findFirstByProductAndAmountGreaterThanEqual(Product product, Double amount);

    @Query(
            value = "SELECT max(pub.amount) FROM product_user_bid pub WHERE pub.product_id = :productId",
            nativeQuery = true
    )
    Object findHighestBidForProduct(@Param("productId") Long productId);
}

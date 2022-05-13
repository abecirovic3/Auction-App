package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.projection.ProductNameOnlyProjection;
import com.atlantbh.auctionappbackend.projection.ProductIdOnlyProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE (p.endDate > CURRENT_TIMESTAMP) AND (:categoriesAvailable = FALSE or p.category.id IN :categories) AND (:minPrice is null and :maxPrice is null or (p.highestBid is null and p.startPrice between :minPrice and :maxPrice or p.highestBid between :minPrice and :maxPrice)) AND (:search = '' or (lower(p.name) LIKE lower(concat('%', :search, '%'))))")
    Page<Product> findAll(
            @Param("categories") Collection<Long> categories,
            @Param("categoriesAvailable") boolean categoriesAvailable,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("search") String search,
            Pageable pageable
    );

    @Modifying
    @Query("update Product p set p.highestBid = :bidValue where p.id = :id")
    void updateHighestBid(@Param(value = "id") long id, @Param(value = "bidValue") Double bidValue);

    @Modifying
    @Query("update Product p set p.sold = :isSold where p.id = :id")
    void updateSold(@Param(value = "id") long id, @Param(value = "isSold") boolean isSold);

    List<Product> findAllBySeller(User seller);

    List<ProductNameOnlyProjection> findByEndDateGreaterThan(LocalDateTime date, Pageable pageable);
    
    List<ProductIdOnlyProjection> findProductsByWishlistUsersId(Long userId);
}

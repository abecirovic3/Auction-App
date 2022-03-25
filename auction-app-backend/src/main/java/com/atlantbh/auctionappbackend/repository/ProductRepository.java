package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE (:categoriesAvailable = FALSE or p.category.id IN :categories) AND (:minPrice is null or p.startPrice >= :minPrice) AND (:maxPrice is null or p.startPrice <= :maxPrice and ((SELECT MAX(pub1.amount) FROM ProductUserBid pub1 WHERE pub1.product.id = p.id) is null or (SELECT MAX(pub1.amount) FROM ProductUserBid pub1 WHERE pub1.product.id = p.id) <= :maxPrice))")
    Page<Product> findAllWithFiltersAndSortPaginated(
            @Param("categories") Collection<Long> categories,
            @Param("categoriesAvailable") boolean categoriesAvailable,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}

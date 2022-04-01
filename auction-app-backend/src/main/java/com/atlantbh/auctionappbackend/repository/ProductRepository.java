package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE (p.endDate > CURRENT_TIMESTAMP) AND (:categoriesAvailable = FALSE or p.category.id IN :categories) AND (:minPrice is null and :maxPrice is null or ((SELECT MAX(pub1.amount) FROM ProductUserBid pub1 WHERE pub1.product.id = p.id) is null and p.startPrice between :minPrice and :maxPrice or (SELECT MAX(pub2.amount) FROM ProductUserBid pub2 WHERE pub2.product.id = p.id) between :minPrice and :maxPrice)) AND (:search = '' or (lower(p.name) LIKE lower(concat('%', :search, '%'))))")
    Page<Product> findAllWithFiltersAndSortPaginated(
            @Param("categories") Collection<Long> categories,
            @Param("categoriesAvailable") boolean categoriesAvailable,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("search") String search,
            Pageable pageable
    );

    @Query("SELECT min(p.startPrice), max(p.startPrice), (SELECT max(pub.amount) FROM ProductUserBid pub) FROM Product p")
    List<Object[]> findProductPriceRange();
}

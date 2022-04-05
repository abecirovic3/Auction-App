package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllBySuperCategoryIsNull();

    @Query(nativeQuery = true)
    List<Category> findAllSubCategoriesWithProductCountBySuperCategory(Long superCategoryId);
}

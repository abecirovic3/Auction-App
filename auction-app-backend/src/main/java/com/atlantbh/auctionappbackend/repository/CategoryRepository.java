package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllBySuperCategoryIsNull();
    @Query(value = "SELECT c.id, c.name, COUNT(c.id) FROM category c, product p WHERE c.id = p.category_id and c.super_category_id = ?1 group by c.id, c.name", nativeQuery = true)
    List<Object[]> countProductsByCategories(Long superCategoryId);
}

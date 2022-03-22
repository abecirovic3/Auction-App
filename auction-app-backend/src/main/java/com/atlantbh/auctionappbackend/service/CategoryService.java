package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Category;
import com.atlantbh.auctionappbackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllSuperCategories() {
        return categoryRepository.findAllBySuperCategoryIsNull();
    }

    public List<Object[]> getSubCategoriesForCategory(Long superCategoryId) {
        return categoryRepository.countProductsByCategories(superCategoryId);
    }
}

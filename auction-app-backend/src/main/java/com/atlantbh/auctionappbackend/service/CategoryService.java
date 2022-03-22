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

    /**
     * Method to fetch all categories with respected number of products in each
     * First, all top level categories are fetched
     * SubCategories are set for each top level category by executing custom query defined in Categeory class
     * @return List of top level categories with their respected sub categories
     */
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAllBySuperCategoryIsNull();
        for (Category c : categories) {
            c.setSubCategories(categoryRepository.countProductsByCategory(c.getId()));
        }
        return categories;
    }
}

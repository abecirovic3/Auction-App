package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Category;
import com.atlantbh.auctionappbackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${application.api.prefix}/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * This route is responsible for fetching all categories to be displayed for home and shop page
     * Categories which don't have products in them won't be returned
     * @return List of top level categories with their subcategories which have products in them
     */
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(
                categoryService.getAllCategories(),
                HttpStatus.OK
        );
    }

    /**
     * This route is responsible for fetching all categories no matter the amount of products in them
     * It is used for listing existing categories, for instance when creating a new product
     * @return List of all categories with their subcategories
     */
    @GetMapping(path = "/all")
    public ResponseEntity<List<Category>> getAllPure() {
        return new ResponseEntity<>(
                categoryService.getAllCategoriesPure(),
                HttpStatus.OK
        );
    }
}

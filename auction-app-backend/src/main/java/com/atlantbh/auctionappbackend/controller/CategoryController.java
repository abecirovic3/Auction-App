package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Category;
import com.atlantbh.auctionappbackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${application.api.prefix}/category")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(path = "/get-all")
    public ResponseEntity<List<Category>> getAllSuperCategories() {
        return new ResponseEntity<>(
                categoryService.getAllSuperCategories(),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/get-sub-categories/{superCategoryId}")
    public ResponseEntity<List<Object[]>> getSubCategoriesForCategory(@PathVariable Long superCategoryId) {
        return new ResponseEntity<>(
                categoryService.getSubCategoriesForCategory(superCategoryId),
                HttpStatus.OK
        );
    }
}

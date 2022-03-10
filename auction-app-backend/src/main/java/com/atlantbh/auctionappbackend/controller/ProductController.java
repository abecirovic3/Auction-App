package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/all-products/last-added")
    public ResponseEntity<Map<String, Object>> getAllNewestProductsPaginated(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        Page<Product> productsPage = productService.getNewestProducts(page, size);
        Map<String, Object> response = new HashMap<>();
        response.put("products", productsPage.getContent());
        response.put("isLastPage", productsPage.isLast());

        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }
}

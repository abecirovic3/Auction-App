package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${application.api.prefix}/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(
                productService.getProductOverview(id),
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(required = false) List<Long> categories,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "name") String sortKey,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsFilteredSortedAndPaginated(
                        page, size, categories, minPrice, maxPrice, sortKey, sortDirection
                ),
                HttpStatus.OK
        );
    }
}

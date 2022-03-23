package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.response.ProductOverviewResponse;
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
@RequestMapping(path = "${application.api.prefix}/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<PaginatedResponse<Product>> getAllProductsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(defaultValue = "startDate") String sortKey,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsPaginated(page, size, sortKey, sortDirection),
                HttpStatus.OK
        );
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<ProductOverviewResponse> getProductOverview(@PathVariable Long id) {
        return new ResponseEntity<>(
                productService.getProductOverview(id),
                HttpStatus.OK
        );
    }

    @GetMapping("/get-all-filtered")
    public ResponseEntity<PaginatedResponse<Product>> getAllProductsPageFiltered(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam List<Long> categories,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsPaginatedAndFiltered(page, size, categories, minPrice, maxPrice),
                HttpStatus.OK
        );
    }
}

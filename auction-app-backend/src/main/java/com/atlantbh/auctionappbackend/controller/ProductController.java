package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${application.api.prefix}/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<Product>> getAllProductsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(defaultValue = "startDate,desc") String[] sort
    ) {
        PaginatedResponse<Product> response = productService.getAllProductsPaginated(page, size, sort);
        return new ResponseEntity<>(
                response,
                response == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK
        );
    }
}

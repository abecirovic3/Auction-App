package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.response.ProductsResponse;
import com.atlantbh.auctionappbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/products/{id}")
    public ResponseEntity<com.atlantbh.auctionappbackend.domain.Product> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(
                productService.getProductOverview(id),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/products")
    public ResponseEntity<ProductsResponse> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(required = false) List<Long> categories,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "name") String sortKey,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "") String search
    ) {
        return new ResponseEntity<>(
                productService.getAll(
                        page, size, categories, minPrice, maxPrice, sortKey, sortDirection, search
                ),
                HttpStatus.OK
        );
    }

    @PostMapping(path = "/product/add")
    public ResponseEntity<com.atlantbh.auctionappbackend.domain.Product> createProduct(@RequestBody @Valid com.atlantbh.auctionappbackend.domain.Product product) {
        return new ResponseEntity<>(
                productService.createProduct(product),
                HttpStatus.OK
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }
}

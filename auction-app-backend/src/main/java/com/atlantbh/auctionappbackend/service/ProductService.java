package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getNewestProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("startDate").descending()));
    }

    public Page<Product> getFirstToEndProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("endDate")));
    }
}

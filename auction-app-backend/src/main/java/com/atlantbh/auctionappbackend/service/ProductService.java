package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PaginatedResponse<Product> getAllProductsPaginated(int page, int size, String[] sort) {
        try {
            List<Order> orders = new ArrayList<>();
            if (sort[0].contains(",")) {
                // sort by more than one column
                for (String sortOrder : sort) {
                    String[] _sort = sortOrder.split(",");
                    orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
                }
            } else {
                orders.add(new Order(getSortDirection(sort[1]), sort[0]));
            }

            Page<Product> pageProducts = productRepository.findAll(PageRequest.of(page, size, Sort.by(orders)));
            return new PaginatedResponse<>(
                    pageProducts.getContent(),
                    pageProducts.getNumber(),
                    pageProducts.getTotalElements(),
                    pageProducts.getTotalPages()
            );
        } catch (Exception e) {
            return null;
        }
    }

    private Direction getSortDirection(String direction) {
        return direction.equalsIgnoreCase("asc") ? Direction.ASC : Direction.DESC;
    }
}

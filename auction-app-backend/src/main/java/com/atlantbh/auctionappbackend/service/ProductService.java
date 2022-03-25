package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductUserBidRepository productUserBidRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductUserBidRepository productUserBidRepository) {
        this.productRepository = productRepository;
        this.productUserBidRepository = productUserBidRepository;
    }

    public Product getProductOverview(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product with id " + id + " doesn't exist"
            );
        } else {
            Product product = optionalProduct.get();
            List<ProductUserBid> productBids =
                    productUserBidRepository.findByProduct(product, Sort.by("amount").descending());
            product.setHighestBid(productBids.size() > 0 ? productBids.get(0).getAmount() : null);
            product.setNumberOfBids(productBids.size());
            return product;
        }
    }

    public PaginatedResponse<Product> getAllProductsFilteredSortedAndPaginated(
                                                                            int page,
                                                                            int size,
                                                                            List<Long> categoryIds,
                                                                            Double minPrice,
                                                                            Double maxPrice,
                                                                            String sortKey,
                                                                            String sortDirection
    ) {
        boolean categoriesAvailable = categoryIds != null;
        List<Order> sortOrders = getSortOrders(sortKey, sortDirection);
        Page<Product> pageProducts = productRepository.findAllWithFiltersAndSortPaginated(
                categoryIds, categoriesAvailable, minPrice, maxPrice, PageRequest.of(page, size, Sort.by(sortOrders))
        );
        return new PaginatedResponse<>(
                pageProducts.getContent(),
                pageProducts.getNumber(),
                pageProducts.getTotalElements(),
                pageProducts.getTotalPages()
        );
    }

    private List<Order> getSortOrders(String sortKey, String sortDirection) {
        List<Order> orders = new ArrayList<>();

        if (sortKey.contains(",")) {
            String[] _sortKeys = sortKey.split(",");
            String[] _sortDirections = sortDirection.split(",");

            if (_sortKeys.length != _sortDirections.length) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "The number of sortKeys must match the number of sortDirections"
                );
            }

            for (int i = 0; i < _sortKeys.length; i++) {
                orders.add(new Order(getSortDirection(_sortDirections[i]), _sortKeys[i]));
            }
        } else {
            orders.add(new Order(getSortDirection(sortDirection), sortKey));
        }

        // Add order by id because of pagination problems when 2 or more products are ordered at same position
        // For instance if we order products by name ascending, 2 products with the same name can cause
        // problems when their ordered position is at the end of page
        orders.add(new Order(Direction.ASC, "id"));

        return orders;
    }

    private Direction getSortDirection(String direction) {
        return direction.equalsIgnoreCase("asc") ? Direction.ASC : Direction.DESC;
    }
}

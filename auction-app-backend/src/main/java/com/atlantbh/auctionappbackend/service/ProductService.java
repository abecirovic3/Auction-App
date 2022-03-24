package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.response.ProductOverviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

    public ProductOverviewResponse getProductOverview(Long id) {
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
            return new ProductOverviewResponse(
                    optionalProduct.get(),
                    productBids.size() > 0 ? productBids.get(0).getAmount() : null,
                    productBids.size(),
                    getAuctionTimeLeftMessage(product.getEndDate()));
        }
    }

    private String getAuctionTimeLeftMessage(LocalDateTime endDate) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isAfter(endDate)) {
            return null;
        }
        long daysBetween = ChronoUnit.DAYS.between(currentDateTime, endDate);
        long weeks = daysBetween / 7;
        long days = daysBetween % 7;

        if (weeks == 0 && days == 0) {
            long minutesBetween = ChronoUnit.MINUTES.between(currentDateTime, endDate);
            long hours = minutesBetween / 60;
            long minutes = minutesBetween % 60;

            if (hours == 0 && minutes == 0) {
                return "Less than a minute";
            }

            if (hours == 0) {
                return minutes + " Minutes";
            }

            if (minutes == 0) {
                return hours + " Hours";
            }

            return hours + " Hours " + minutes + " Minutes";
        }

        if (weeks == 0) {
            return days + " Days";
        }

        if (days == 0) {
            return weeks + " Weeks";
        }

        return weeks + " Weeks " + days + " Days";
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
        List<Order> sortOrders = getSortOrders(sortKey, sortDirection);
        Page<Product> pageProducts = productRepository.findAllWithFiltersAndSortPaginated(
                categoryIds, minPrice, maxPrice, PageRequest.of(page, size, Sort.by(sortOrders))
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

        return orders;
    }

    private Direction getSortDirection(String direction) {
        return direction.equalsIgnoreCase("asc") ? Direction.ASC : Direction.DESC;
    }
}

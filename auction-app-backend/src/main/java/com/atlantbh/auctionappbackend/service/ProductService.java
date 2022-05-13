package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.PriceRange;
import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.projection.ProductNameOnlyProjection;
import com.atlantbh.auctionappbackend.projection.ProductIdOnlyProjection;
import com.atlantbh.auctionappbackend.repository.PriceRangeRepositoryImplementation;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.response.ProductsResponse;
import com.atlantbh.auctionappbackend.utils.EditDistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductUserBidRepository productUserBidRepository;
    private final PriceRangeRepositoryImplementation priceRangeRepositoryImplementation;
    private final StreetService streetService;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductUserBidRepository productUserBidRepository, PriceRangeRepositoryImplementation priceRangeRepositoryImplementation, StreetService streetService, UserService userService) {
        this.productRepository = productRepository;
        this.productUserBidRepository = productUserBidRepository;
        this.priceRangeRepositoryImplementation = priceRangeRepositoryImplementation;
        this.streetService = streetService;
    }

    public Product getProductOverview(Long id, Long userId) {
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
            product.setHighestBidder(productBids.size() > 0 ? productBids.get(0).getUser() : null);
            product.getSeller().initReviewRatingData();

            if (userId != null) {
                product.setWishlistedByUser(isProductWishlistedByUser(id, userId));
            }

            return product;
        }
    }

    private boolean isProductWishlistedByUser(Long productId, Long userId) {
        List<ProductIdOnlyProjection> products = productRepository.findProductsByWishlistUsersId(userId);
        for (ProductIdOnlyProjection p : products) {
            if (p.getId().equals(productId)) {
                return true;
            }
        }
        return false;
    }

    public ProductsResponse getAll(
            int page,
            int size,
            List<Long> categoryIds,
            Double minPrice,
            Double maxPrice,
            String sortKey,
            String sortDirection,
            String search,
            Long userId) {
        boolean categoriesAvailable = categoryIds != null;
        List<Order> sortOrders = getSortOrders(sortKey, sortDirection);

        if (minPrice == null ^ maxPrice == null) {
            PriceRange priceRange = getProductPriceRange();
            if (minPrice == null) {
                minPrice = priceRange.getMinPrice();
            } else {
                maxPrice = priceRange.getMaxPrice();
            }
        }

        Sort sort;

        if (sortKey.contains("price")) {
            JpaSort unsafeSort = JpaSort.unsafe(sortOrders.get(0).getDirection(), sortOrders.get(0).getProperty());
            for (int i = 1; i < sortOrders.size(); i++) {
                unsafeSort = unsafeSort.andUnsafe(sortOrders.get(i).getDirection(), sortOrders.get(i).getProperty());
            }
            sort = unsafeSort;
        } else {
            sort = Sort.by(sortOrders);
        }

        Page<Product> pageProducts = productRepository.findAll(
                categoryIds, categoriesAvailable, minPrice, maxPrice, search, PageRequest.of(page, size, sort)
        );
        
        if (userId != null) {
            for (Product p : pageProducts.getContent()) {
                p.setWishlistedByUser(isProductWishlistedByUser(p.getId(), userId));
            }
        }

        String searchSuggestion = null;
        if (search != null && pageProducts.getTotalElements() == 0) {
            searchSuggestion = getSearchSuggestion(search);
        }

        return new ProductsResponse(
                new PaginatedResponse<>(
                        pageProducts.getContent(),
                        pageProducts.getNumber(),
                        pageProducts.getTotalElements(),
                        pageProducts.getTotalPages()
                ),
                searchSuggestion
        );
    }

    private String getSearchSuggestion(String searchedValue) {
        int page = 0;
        int size = 20;

        Sort.Order order = new Sort.Order(Sort.Direction.ASC, "name").ignoreCase();

        Pageable pageable = PageRequest.of(page, size, Sort.by(order));

        List<ProductNameOnlyProjection> products
                = productRepository.findByEndDateGreaterThan(LocalDateTime.now(), pageable);

        while (products.size() != 0) {
            pageable = pageable.next();

            if (products.get(0).getName().compareToIgnoreCase(searchedValue) > 0) {
                return null;
            }

            if (searchedValue.compareToIgnoreCase(products.get(0).getName()) > 0
                    && searchedValue.compareToIgnoreCase(products.get(products.size()-1).getName()) < 0) {

                int minDistance
                        = EditDistanceCalculator.calculateLevenshteinDistance(searchedValue, products.get(0).getName());
                String res = products.get(0).getName();

                int distance;
                for (ProductNameOnlyProjection p : products) {
                    distance = EditDistanceCalculator.calculateLevenshteinDistance(searchedValue, p.getName());
                    if (distance < minDistance) {
                        minDistance = distance;
                        res = p.getName();
                    }
                }
                if (minDistance < 5) {
                    return res;
                } else {
                    return null;
                }
            }
            products = productRepository.findByEndDateGreaterThan(LocalDateTime.now(), pageable);
        }
        return null;
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
                // If products should be sorted py price then sort is based on highest_bid if exists
                // else the starting_price
                if (_sortKeys[i].equals("price")) {
                    orders.add(new Order(getSortDirection(_sortDirections[i]), "COALESCE(highestBid, startPrice)"));
                } else {
                    orders.add(new Order(getSortDirection(_sortDirections[i]), _sortKeys[i]));
                }
            }
        } else {
            if (sortKey.equals("price")) {
                orders.add(new Order(getSortDirection(sortDirection), "COALESCE(highestBid, startPrice)"));
            } else {
                orders.add(new Order(getSortDirection(sortDirection), sortKey));
            }
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

    public PriceRange getProductPriceRange() {
        return priceRangeRepositoryImplementation.getProductPriceRange();
    }

    public Product createProduct(Product product) {
        if (product.getEndDate().isBefore(product.getStartDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Auction end must be after auction start"
            );
        }

        product.setStreet(streetService.findOrCreateLocation(product.getStreet()));

        return productRepository.save(product);
    }

    @Transactional
    public void setProductToSold(long productId) {
        productRepository.updateSold(productId, true);
    }
}

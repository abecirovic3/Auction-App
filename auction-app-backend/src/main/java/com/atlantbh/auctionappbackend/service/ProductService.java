package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.City;
import com.atlantbh.auctionappbackend.domain.Country;
import com.atlantbh.auctionappbackend.domain.PriceRange;
import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.domain.Street;
import com.atlantbh.auctionappbackend.repository.CityRepository;
import com.atlantbh.auctionappbackend.repository.CountryRepository;
import com.atlantbh.auctionappbackend.repository.PriceRangeRepositoryImplementation;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.repository.StreetRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.JpaSort;
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
    private final PriceRangeRepositoryImplementation priceRangeRepositoryImplementation;
    private final StreetRepository streetRepository;
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductUserBidRepository productUserBidRepository, PriceRangeRepositoryImplementation priceRangeRepositoryImplementation, StreetRepository streetRepository, CityRepository cityRepository, CountryRepository countryRepository) {
        this.productRepository = productRepository;
        this.productUserBidRepository = productUserBidRepository;
        this.priceRangeRepositoryImplementation = priceRangeRepositoryImplementation;
        this.streetRepository = streetRepository;
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
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

    public PaginatedResponse<Product> getAll(
                                                int page,
                                                int size,
                                                List<Long> categoryIds,
                                                Double minPrice,
                                                Double maxPrice,
                                                String sortKey,
                                                String sortDirection,
                                                String search
    ) {
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

        Street productStreet = product.getStreet();

        Optional<Street> streetOptional
                = streetRepository.findFirstByNameAndZipcode(
                        productStreet.getName(),
                        productStreet.getZipcode()
                );

        if (streetOptional.isPresent()) {
            product.setStreet(streetOptional.get());
        } else {
            City productCity = productStreet.getCity();
            Country productCountry = productCity.getCountry();

            Optional<Country> countryOptional = countryRepository.findFirstByName(productCountry.getName());

            if (countryOptional.isPresent()) {
                Optional<City> cityOptional
                        = cityRepository.findFirstByNameAndCountry(productCity.getName(), countryOptional.get());
                if (cityOptional.isPresent()) {
                    productStreet.setCity(cityOptional.get());
                } else {
                    productCity.setCountry(countryOptional.get());
                    City newCity = cityRepository.save(productCity);
                    productStreet.setCity(newCity);
                }
            } else {
                Country newCountry = countryRepository.save(productCountry);
                productCity.setCountry(newCountry);
                City newCity = cityRepository.save(productCity);
                productStreet.setCity(newCity);
            }

            streetRepository.save(productStreet);
        }

        return productRepository.save(product);
    }
}

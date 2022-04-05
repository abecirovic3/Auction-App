package com.atlantbh.auctionappbackend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.repository.PriceRangeRepositoryImplementation;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductUserBidRepository productUserBidRepository;

    @Mock
    private PriceRangeRepositoryImplementation priceRangeRepositoryImplementation;

    private ProductService productService;

    @BeforeEach
    void initUseCase() {
        productService = new ProductService(productRepository, productUserBidRepository, priceRangeRepositoryImplementation);
    }

    @Test
    public void testGetAllProductsPaginated() {
        List<Product> products = new ArrayList<>();
        products.add(new Product(
                1L,
                "First Product",
                "Description of first product",
                10.10,
                LocalDateTime.of(2022, 3, 10, 10, 15),
                LocalDateTime.of(2022, 4, 10, 10, 15),
                null,
                null,
                null
        ));
        products.add(new Product(
                2L,
                "Second Product",
                "Description of second product",
                20.20,
                LocalDateTime.of(2022, 3, 10, 10, 15),
                LocalDateTime.of(2022, 4, 10, 10, 15),
                null,
                null,
                null
        ));

        Page<Product> page = new PageImpl<>(products, PageRequest.of(0,1), 2);

        when(productRepository.findAll(any(), anyBoolean(), any(), any(), any(), any(Pageable.class))).thenReturn(page);

        PaginatedResponse<Product> paginatedResponse
                = productService.getAll(
                        0,
                        4,
                        null,
                        null,
                        null,
                        "startDate",
                        "desc",
                        null
        );

        assertThat(paginatedResponse.getCurrentPage()).isEqualTo(0);
        assertThat(paginatedResponse.getData().size()).isEqualTo(2);
        assertThat(paginatedResponse.getTotalPages()).isEqualTo(2);
    }

}

package com.atlantbh.auctionappbackend.repostitory;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.repository.ProductImageRepository;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductImageRepository productImageRepository;

    @AfterEach
    public void destroyAll(){
        productRepository.deleteAll();
    }

    @Test
    public void testCreateProduct() {
        Product product = new Product(
                "Product Name",
                "Product Description",
                99.99,
                LocalDate.of(2022, 3, 10),
                LocalDate.of(2022, 4, 10)
        );

        Product savedProduct = productRepository.save(product);
        assertThat(product.getName()).isEqualTo(savedProduct.getName());
        assertThat(product.getDescription()).isEqualTo(savedProduct.getDescription());
    }
}

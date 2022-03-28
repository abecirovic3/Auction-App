package com.atlantbh.auctionappbackend.repostitory;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.ProductImageRepository;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.atlantbh.auctionappbackend.security.ApplicationUserRole;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @AfterEach
    public void destroyAll(){
        productRepository.deleteAll();
    }

    @Test
    public void testCreateProduct() {
        User seller = new User("First Name", "Last Name", "email@email.com", "password", ApplicationUserRole.USER.getRole());
        User savedUser = userRepository.save(seller);

        Product product = new Product(
                "Product Name",
                "Product Description",
                99.99,
                LocalDateTime.of(2022, 3, 10, 10, 15),
                LocalDateTime.of(2022, 4, 10, 10, 15)

        );

        product.setSeller(savedUser);

        Product savedProduct = productRepository.save(product);
        assertThat(product.getName()).isEqualTo(savedProduct.getName());
        assertThat(product.getDescription()).isEqualTo(savedProduct.getDescription());
    }
}

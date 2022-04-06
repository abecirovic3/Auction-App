package com.atlantbh.auctionappbackend.repostitory;

import com.atlantbh.auctionappbackend.domain.Category;
import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.CategoryRepository;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.atlantbh.auctionappbackend.security.ApplicationUserRole;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CategoryRepository categoryRepository;

    private User user;
    private User savedUser;
    private List<Category> categories;
    private List<Category> savedCategories;
    private List<Product> products;

    @BeforeAll
    public void initializeEntities() {
        initializeUserEntity();
        initializeCategoriesEntities();
        savedUser = userRepository.save(user);
        savedCategories = categoryRepository.saveAll(categories);
        initializeProductsEntities();
    }

    private void initializeProductsEntities() {
        products = new LinkedList<>();
        for (int i = 0; i < 10; i++) {
            Product product = new Product();
            product.setName("Product " + i);
            product.setDescription("Description " + i);
            product.setStartPrice(10. + i * 10.);
            product.setSeller(savedUser);
            if (i < 2) {
                product.setCategory(savedCategories.get(0));
            } else if (i < 5) {
                product.setCategory(savedCategories.get(1));
            } else {
                product.setCategory(savedCategories.get(2));
            }
            product.setStartDate(LocalDateTime.of(2022, i+1, 10, 10, 15));
            product.setEndDate(LocalDateTime.now().plusDays(i+1));

            products.add(product);
        }
    }

    private void initializeCategoriesEntities() {
        categories = new LinkedList<>();
        for (int i = 0; i < 3; i++) {
            Category category = new Category();
            category.setName("Category " + i);
            categories.add(category);
        }
    }

    private void initializeUserEntity() {
        user = new User();
        user.setFirstName("First Name");
        user.setLastName("Last Name");
        user.setEmail("email@email.com");
        user.setPassword("password");
        user.setRole(ApplicationUserRole.USER.getRole());
    }

    @BeforeEach
    public void initializeTables() {
        productRepository.saveAll(products);
    }

    @AfterEach
    public void destroyAll() {
        productRepository.deleteAll();
    }

    @Test
    public void testCreateProduct() {
        Product product = new Product();
        product.setName("Product Name");
        product.setDescription("Product Description");
        product.setStartPrice(99.99);
        product.setSeller(user);
        product.setCategory(categories.get(0));
        product.setStartDate(LocalDateTime.of(2022, 3, 10, 10, 15));
        product.setEndDate(LocalDateTime.of(2022, 4, 10, 10, 15));

        Product savedProduct = productRepository.save(product);
        assertThat(product.getName()).isEqualTo(savedProduct.getName());
        assertThat(product.getDescription()).isEqualTo(savedProduct.getDescription());
    }

    @Test
    public void testGetProductsFilteredByCategory1() {
        Page<Product> productsPage = productRepository.findAll(
                Collections.singletonList(savedCategories.get(0).getId()),
                true,
                null,
                null,
                "",
                PageRequest.of(0, 10)
        );
        assertThat(productsPage.getContent().size()).isEqualTo(2);
    }

    @Test
    public void testGetProductsFilteredByCategory2() {
        Page<Product> productsPage = productRepository.findAll(
                Arrays.asList(savedCategories.get(0).getId(), savedCategories.get(1).getId()),
                true,
                null,
                null,
                "",
                PageRequest.of(0, 10)
        );
        assertThat(productsPage.getContent().size()).isEqualTo(5);
    }

    @Test
    public void testGetProductsFilteredByPrice() {
        Page<Product> productsPage = productRepository.findAll(
                null,
                false,
                30.0,
                60.0,
                "",
                PageRequest.of(0, 10)
        );
        assertThat(productsPage.getContent().size()).isEqualTo(4);
    }

    @Test
    public void testGetAllProductsWithPageSize() {
        Page<Product> productsPage = productRepository.findAll(
                null,
                false,
                null,
                null,
                "",
                PageRequest.of(0, 4)
        );
        assertThat(productsPage.getContent().size()).isEqualTo(4);
    }

    @Test
    public void testGetAllProductsSortedByEndDate() {
        Page<Product> productsPage = productRepository.findAll(
                null,
                false,
                null,
                null,
                "",
                PageRequest.of(0, 4, Sort.by("endDate").ascending())
        );
        List<Product> fetchedProducts = productsPage.getContent();
        for (int i = 0; i < fetchedProducts.size() - 1; i++) {
            assertThat(fetchedProducts.get(i).getEndDate()).isBefore(fetchedProducts.get(i+1).getEndDate());
        }
    }

    @Test
    public void testGetAllProductsSortedByName() {
        Page<Product> productsPage = productRepository.findAll(
                null,
                false,
                null,
                null,
                "",
                PageRequest.of(0, 4, Sort.by("name").descending())
        );
        List<Product> fetchedProducts = productsPage.getContent();
        for (int i = 0; i < fetchedProducts.size() - 1; i++) {
            assertThat(fetchedProducts.get(i).getName())
                    .isEqualTo(products.get(products.size() - 1 - i).getName());
        }
    }
}

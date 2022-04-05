package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.response.PaginatedResponse;
import com.atlantbh.auctionappbackend.security.SecurityConfig;
import com.atlantbh.auctionappbackend.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.servlet.Filter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Value("${application.api.prefix}")
    private String apiPrefix;

    @MockBean
    private ProductService productService;
    @MockBean(name = "springSecurityFilterChain")
    private Filter springSecurityFilterChain;
    @MockBean
    private SecurityConfig securityConfig;

    @Test
    public void testGetAllProductsPage() throws Exception {
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

        PaginatedResponse<Product> paginatedResponse = new PaginatedResponse<>(products, 0, 2, 2);

        when(productService.getAll(anyInt(), anyInt(), any(), any(), any(), any(), any(), any())).thenReturn(paginatedResponse);

        mockMvc.perform(
                MockMvcRequestBuilders.get(apiPrefix + "/products")
                        .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("\"data\"")))
                .andExpect(content().string(containsString("\"currentPage\"")))
                .andExpect(content().string(containsString("\"totalElements\"")))
                .andExpect(content().string(containsString("\"totalPages\"")));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

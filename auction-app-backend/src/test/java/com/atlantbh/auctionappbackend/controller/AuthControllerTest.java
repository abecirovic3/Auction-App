package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.api.ApiConfig;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.security.JwtUtil;
import com.atlantbh.auctionappbackend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.servlet.Filter;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;
    @MockBean
    private JwtUtil jwtUtil;
    @MockBean
    private JwtConfig jwtConfig;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private ApiConfig apiConfig;
    @MockBean(name = "springSecurityFilterChain")
    private Filter springSecurityFilterChain;


    @Test
    public void greetingShouldReturnMessageFromService() throws Exception {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");
        when(userService.registerUser(any())).thenReturn(user);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/auth/register")
                                .content(asJsonString(user))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().string(asJsonString(user)));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

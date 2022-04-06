package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.api.ApiConfig;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.service.UserService;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.servlet.Filter;

import static com.atlantbh.auctionappbackend.security.ApplicationUserRole.USER;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${application.api.prefix}")
    private String apiPrefix;

    @MockBean
    private UserService userService;
    @MockBean
    private Algorithm signAlgorithm;
    @MockBean
    private JwtConfig jwtConfig;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private ApiConfig apiConfig;
    @MockBean(name = "springSecurityFilterChain")
    private Filter springSecurityFilterChain;

    private final User user = new User();

    @BeforeEach
    public void initUser() {
        user.setId(1L);
        user.setFirstName("Foo");
        user.setLastName("Bar");
        user.setEmail("foo@bar.org.com");
        user.setPassword("password");
        user.setRole(USER.getRole());
    }


    @Test
    public void testRegisterUserSuccess() throws Exception {
        when(userService.registerUser(any())).thenReturn(user);

        mockMvc.perform(
                MockMvcRequestBuilders.post(apiPrefix + "/auth/register")
                        .content(asJsonString(user))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(content().string(asJsonString(user)));
    }

    @Test
    public void testRegisterUserInvalidFirstName() throws Exception {
        user.setFirstName(null);

        mockMvc.perform(
                MockMvcRequestBuilders.post(apiPrefix + "/auth/register")
                        .content(asJsonString(user))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("\"firstName\"")));
    }

    @Test
    public void testRegisterUserInvalidLastName() throws Exception {
        user.setLastName("Invalid1234");

        mockMvc.perform(
                        MockMvcRequestBuilders.post(apiPrefix + "/auth/register")
                                .content(asJsonString(user))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("\"lastName\"")));
    }

    @Test
    public void testRegisterUserInvalidEmail() throws Exception {
        user.setEmail("foo@not_valid");

        mockMvc.perform(
                        MockMvcRequestBuilders.post(apiPrefix + "/auth/register")
                                .content(asJsonString(user))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("\"email\"")));
    }

    @Test
    public void testRegisterUserInvalidEmailAndPassword() throws Exception {
        user.setEmail("foo@notValid");
        user.setPassword("");

        mockMvc.perform(
                        MockMvcRequestBuilders.post(apiPrefix + "/auth/register")
                                .content(asJsonString(user))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("\"password\"")))
                .andExpect(content().string(containsString("\"email\"")));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

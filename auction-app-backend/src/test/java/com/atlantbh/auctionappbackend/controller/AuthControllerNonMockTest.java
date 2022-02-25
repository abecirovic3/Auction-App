package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;

import static org.assertj.core.api.Assertions.assertThat;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthControllerNonMockTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void destroyAll(){
        userRepository.deleteAll();
    }

    @Test
    public void greetingShouldReturnDefaultMessage() throws Exception {
        assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/api/v1/health",
                String.class)).contains("OK");
    }

    @Test
    public void testRegisterUserSuccess() {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");
        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/register",
                user,
                String.class
        );
        assertThat(resp.contains("\"firstName\":\"Foo\",\"lastName\":\"Bar\",\"email\":\"foo@bar.org.com\"")).isTrue();
    }

    @Test
    public void testRegisterUserInvalidRequest() {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");
        user.setFirstName("");
        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/register",
                user,
                String.class
        );

        assertThat(resp.contains("\"firstName\"")).isTrue();
    }

    @Test
    public void testLoginUserSuccess() {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");
        this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/register",
                user,
                String.class
        );

        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/login?email=" + user.getEmail() + "&password=" + user.getPassword(),
                null,
                String.class
        );

        assertThat(resp.contains("\"access_token\"")).isTrue();
        assertThat(resp.contains("\"refresh_token\"")).isTrue();
    }

    @Test
    public void testLoginUserFail() {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");

        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/login?email=" + user.getEmail() + "&password=pogresan",
                null,
                String.class
        );

        assertThat(resp).isEqualTo("{\"error\":\"Failed Authentication, Bad Credentials\"}");
    }

    @Test
    public void testRefreshTokenSuccess() {
        User user = new User(1L,"Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");
        this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/register",
                user,
                String.class
        );

        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + "/api/v1/auth/login?email=" + user.getEmail() + "&password=" + user.getPassword(),
                null,
                String.class
        );

        int startIndex = resp.indexOf("\"refresh_token\"");
        String refresh_token = resp.substring(startIndex + "\"refresh_token\":\"".length(), resp.length() - 2);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(refresh_token);
        HttpEntity<String> entity = new HttpEntity<>("body", headers);

        ResponseEntity<String> finalResponse = restTemplate.exchange(
                "http://localhost:" + port + "/api/v1/auth/token/refresh",
                HttpMethod.GET,
                entity,
                String.class
        );

        assertThat(finalResponse.getBody()).isNotNull();
        assertThat(finalResponse.getBody().contains("\"access_token\"")).isTrue();
        assertThat(finalResponse.getBody().contains("\"refresh_token\"")).isTrue();

    }

}

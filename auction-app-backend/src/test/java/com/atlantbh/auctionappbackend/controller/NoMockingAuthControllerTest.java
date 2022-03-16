package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import java.util.HashMap;
import java.util.Map;

import static com.atlantbh.auctionappbackend.security.ApplicationUserRole.USER;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * This test class is used for AuthController tests.
 * No mocking is used in any of the tests.
 * Before the tests are executed, the server is started and listens on a random port for requests.
 * After all tests are done, the server is shut down.
 * In memory H2 database is used instead of real database.
 */

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class NoMockingAuthControllerTest {

    @LocalServerPort
    private int port;

    @Value("${application.api.prefix}")
    private String apiPrefix;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    private final User testUser = new User(1L, "foo", "bar", "foo@bar.com", "password", USER.getRole());

    @BeforeEach
    public void destroyAll(){
        userRepository.deleteAll();
    }

    @Test
    public void testRegisterUserSuccess() {
        String response = this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/register",
                testUser,
                String.class
        );
        assertThat(response.contains(
                        "\"firstName\":\"" + testUser.getFirstName()
                        + "\",\"lastName\":\"" + testUser.getLastName()
                        + "\",\"email\":\"" + testUser.getEmail() + "\"")).isTrue();
    }

    @Test
    public void testRegisterUserInvalidRequest() {
        testUser.setFirstName("");
        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/register",
                testUser,
                String.class
        );

        assertThat(resp.contains("\"firstName\"")).isTrue();
    }

    @Test
    public void testLoginUserSuccess() {
        this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/register",
                testUser,
                String.class
        );

        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/login?email=" + testUser.getEmail() + "&password=" + testUser.getPassword(),
                null,
                String.class
        );

        assertThat(resp.contains("\"access_token\"")).isTrue();
        assertThat(resp.contains("\"refresh_token\"")).isTrue();
    }

    @Test
    public void testLoginUserFail() {
        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/login?email=" + testUser.getEmail() + "&password=wrong",
                null,
                String.class
        );

        assertThat(resp).isEqualTo("{\"error\":\"Failed Authentication, Bad Credentials\"}");
    }

    @Test
    public void testRefreshTokenSuccess() {
        this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/register",
                testUser,
                String.class
        );

        String resp = this.restTemplate.postForObject(
                "http://localhost:" + port + apiPrefix + "/auth/login?email=" + testUser.getEmail() + "&password=" + testUser.getPassword(),
                null,
                String.class
        );

        Map<String, String> decodedJson = decodeJson(resp);
        String refresh_token = decodedJson.get("refresh_token");

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

    /**
     * This is a simple helper method, which is used to decode non-object value, key-value Json strings
     * Pairs where the value is of type Object won't be parsed correctly
     * @param json
     * @return Map<String, String> representing the decoded Json
     */
    private Map<String, String> decodeJson(String json) {
        Map<String, String> decodedJson = new HashMap<>();
        String[] keyValues = json.split(",");
        for (String keyValue : keyValues) {
            String[] kv = keyValue.split(":");
            kv[0] = kv[0].replace("\"", "").replace("{", "").replace("}", "");
            kv[1] = kv[1].replace("\"", "").replace("{", "").replace("}", "");
            decodedJson.put(kv[0], kv[1]);
        }
        return decodedJson;
    }

}

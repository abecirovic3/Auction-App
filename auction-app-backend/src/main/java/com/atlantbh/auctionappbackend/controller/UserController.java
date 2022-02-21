package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.service.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "${application.api.prefix}/user")
public class UserController {

    private final UserService userService;
    private final JwtConfig jwtConfig;
    private final Algorithm signAlgorithm;

    @Autowired
    public UserController(UserService userService, JwtConfig jwtConfig, Algorithm signAlgorithm) {
        this.userService = userService;
        this.jwtConfig = jwtConfig;
        this.signAlgorithm = signAlgorithm;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<Map<String, String>> processRegister(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping(path = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
            try {
                String refreshToken = authorizationHeader.substring(jwtConfig.getTokenPrefix().length());
                JWTVerifier verifier = JWT.require(signAlgorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                List<String> authorities = new ArrayList<>();
                authorities.add(user.getRole());
                String accessToken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getTokenExpAfterMin() * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", authorities)
                        .sign(signAlgorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (Exception exception) {
                System.out.println("Error: " + exception.getMessage());
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_msg", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.security.JwtUtil;
import com.atlantbh.auctionappbackend.service.UserService;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequestMapping(path = "${application.api.prefix}/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil, JwtConfig jwtConfig) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.jwtConfig = jwtConfig;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<User> processRegister(@RequestBody @Valid User user) {
        return new ResponseEntity<>(
                userService.registerUser(user),
                HttpStatus.OK
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("status", "error");
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }

    @GetMapping(path = "/token/refresh")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null &&
                jwtUtil.isAuthorizationHeaderValid(authorizationHeader)) {
            try {
                String refreshToken = jwtUtil.getTokenFromHeader(authorizationHeader);
                String email = jwtUtil.verifyToken(refreshToken).getSubject();
                User user = userService.getUser(email);
                List<String> authorities = new ArrayList<>();
                authorities.add(user.getRole());
                String accessToken = jwtUtil.createToken(
                        user.getEmail(),
                        request.getRequestURL().toString(),
                        jwtConfig.getTokenExpDate(),
                        authorities
                );

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (JWTVerificationException e) {
                log.error("Refresh token is not valid");
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Refresh token is not valid"
                );
            }

        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Refresh token is missing"
            );
        }
    }

}

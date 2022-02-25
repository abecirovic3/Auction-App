package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.utils.JwtUtil;
import com.atlantbh.auctionappbackend.service.UserService;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequestMapping(path = "${application.api.prefix}/auth")
public class AuthController {

    private final UserService userService;
    private final Algorithm signAlgorithm;
    private final JwtConfig jwtConfig;

    @Autowired
    public AuthController(UserService userService, Algorithm signAlgorithm, JwtConfig jwtConfig) {
        this.userService = userService;
        this.signAlgorithm = signAlgorithm;
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
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }

    @GetMapping(path = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && JwtUtil.isAuthorizationHeaderValid(jwtConfig.getTokenPrefix(), authorizationHeader)) {
            try {
                String refreshToken = JwtUtil.getTokenFromHeader(jwtConfig.getTokenPrefix(), authorizationHeader);
                String email = JwtUtil.verifyToken(signAlgorithm, refreshToken).getSubject();
                User user = userService.getUserByEmail(email);
                String accessToken = JwtUtil.createToken(
                        signAlgorithm,
                        user.getEmail(),
                        request.getRequestURL().toString(),
                        jwtConfig.getTokenExpDate(),
                        Collections.singletonList(user.getRole())
                );

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(
                        response.getOutputStream(),
                        JwtUtil.getTokensResponseBody(accessToken, refreshToken)
                );

            } catch (JWTVerificationException e) {
                log.error("Refresh token is not valid");
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        e.getMessage()
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

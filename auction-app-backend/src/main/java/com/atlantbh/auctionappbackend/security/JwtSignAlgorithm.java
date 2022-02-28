package com.atlantbh.auctionappbackend.security;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtSignAlgorithm {

    private final JwtConfig jwtConfig;

    @Autowired
    public JwtSignAlgorithm(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Bean
    public Algorithm signAlgorithm() {
        return Algorithm.HMAC256(jwtConfig.getSecretKey().getBytes());
    }
}

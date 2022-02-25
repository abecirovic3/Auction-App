package com.atlantbh.auctionappbackend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Slf4j
@Component
public class JwtUtil {

    private final JwtConfig jwtConfig;
    private final Algorithm signAlgorithm;

    @Autowired
    public JwtUtil(JwtConfig jwtConfig, Algorithm signAlgorithm) {
        this.jwtConfig = jwtConfig;
        this.signAlgorithm = signAlgorithm;
    }

    public String createToken(String subject, String issuer, Date expDate, List<String> authorities) {
        JWTCreator.Builder tokenBuilder = JWT.create();
        tokenBuilder.withSubject(subject);
        tokenBuilder.withExpiresAt(expDate);
        tokenBuilder.withIssuer(issuer);
        if (authorities != null) {
            tokenBuilder.withClaim("roles", authorities);
        }
        return tokenBuilder.sign(signAlgorithm);
    }

    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(signAlgorithm).build();
        return verifier.verify(token);
    }

    public String getTokenFromHeader(String header) {
        return header.replace(jwtConfig.getTokenPrefix(), "");
    }

    public boolean isAuthorizationHeaderValid(String header) {
        return header.startsWith(jwtConfig.getTokenPrefix());
    }

    public Collection<SimpleGrantedAuthority> getGrantedAuthorities(String[] roles) {
        return stream(roles).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public Map<String, String> getErrorResponseBody(String msg) {
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("error", msg);
        return responseBody;
    }

    public Map<String, String> getTokensResponseBody(String accessToken, String refreshToken) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        return tokens;
    }
}

package com.atlantbh.auctionappbackend.utils;

import com.atlantbh.auctionappbackend.domain.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Slf4j
public class JwtUtil {

    private static final String ACCESS_TOKEN = "access_token";
    private static final String REFRESH_TOKEN = "refresh_token";

    public static String createToken(
                                        Algorithm signAlgorithm,
                                        String subject,
                                        String issuer,
                                        Date expDate,
                                        List<String> authorities
    ) {
        JWTCreator.Builder tokenBuilder = JWT.create();
        tokenBuilder.withSubject(subject);
        tokenBuilder.withExpiresAt(expDate);
        tokenBuilder.withIssuer(issuer);
        if (authorities != null) {
            tokenBuilder.withClaim("roles", authorities);
        }
        return tokenBuilder.sign(signAlgorithm);
    }

    public static DecodedJWT verifyToken(Algorithm signAlgorithm, String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(signAlgorithm).build();
        return verifier.verify(token);
    }

    public static String getTokenFromHeader(String tokenPrefix, String header) {
        return header.replace(tokenPrefix, "");
    }

    public static boolean isAuthorizationHeaderValid(String tokenPrefix, String header) {
        return header.startsWith(tokenPrefix);
    }

    public static Collection<SimpleGrantedAuthority> getGrantedAuthorities(String[] roles) {
        return stream(roles).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public static Map<String, String> getErrorResponseBody(String msg) {
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("error", msg);
        return responseBody;
    }

    public static Map<String, String> getTokensResponseBody(String accessToken, String refreshToken) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put(ACCESS_TOKEN, accessToken);
        tokens.put(REFRESH_TOKEN, refreshToken);
        return tokens;
    }

    public static Map<String, Object> getLoginResponseBody(User user, String accessToken, String refreshToken) {
        Map<String, Object> response = new HashMap<>();
        response.put(ACCESS_TOKEN, accessToken);
        response.put(REFRESH_TOKEN, refreshToken);
        response.put("credentials", user);
        return response;
    }
}

package com.atlantbh.auctionappbackend.filter;

import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final Algorithm signAlgorithm;

    public CustomAuthenticationFilter(
                                        AuthenticationManager authenticationManager,
                                        JwtConfig jwtConfig,
                                        Algorithm signAlgorithm
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtConfig = jwtConfig;
        this.signAlgorithm = signAlgorithm;
    }

    @Override
    public Authentication attemptAuthentication(
                                                    HttpServletRequest request,
                                                    HttpServletResponse response
    ) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        log.info("AttemptAuth: Email: " + email + " Password: " + password);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(
                                                HttpServletRequest request,
                                                HttpServletResponse response,
                                                FilterChain chain,
                                                Authentication authentication
    ) throws IOException {
        org.springframework.security.core.userdetails.User user =
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        String accessToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getTokenExpAfterMin() * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles",
                        user.getAuthorities()
                                .stream().map(
                                        GrantedAuthority::getAuthority).collect(Collectors.toList()
                                )
                )
                .sign(signAlgorithm);

        String refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getRefreshTokenExpAfterMin() * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .sign(signAlgorithm);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}

package com.atlantbh.auctionappbackend.filter;

import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Authentication Filter Class used to authenticate user.
 * <p>
 * Provides method to authenticate user by username (in our case email) and password.
 * <p>
 * Provides method to process successful authentication.
 * If authentication is successful an access and a refresh token are created and returned as JSON via the response object
 * <p>
 * Provides method to process unsuccessful authentication.
 * If authentication is unsuccessful a JSON response is returned with an appropriate message and status code 403.
 */
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, JwtConfig jwtConfig) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.jwtConfig = jwtConfig;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void unsuccessfulAuthentication(
                                                HttpServletRequest request,
                                                HttpServletResponse response,
                                                AuthenticationException failed
    ) throws IOException, ServletException {
        response.setStatus(FORBIDDEN.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(
                response.getOutputStream(),
                jwtUtil.getErrorResponseBody("Failed Authentication, Bad Credentials")
        );
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

        String accessToken = jwtUtil.createToken(
                user.getUsername(),
                request.getRequestURL().toString(),
                jwtConfig.getTokenExpDate(),
                user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())
        );

        String refreshToken = jwtUtil.createToken(
                user.getUsername(),
                request.getRequestURL().toString(),
                jwtConfig.getRefreshTokenExpDate(),
                null
        );

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(
                response.getOutputStream(),
                JwtUtil.getTokensResponseBody(accessToken, refreshToken)
        );
    }
}

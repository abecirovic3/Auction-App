package com.atlantbh.auctionappbackend.filter;

import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.security.JwtUtil;
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
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;

    public CustomAuthenticationFilter(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            JwtConfig jwtConfig) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.jwtConfig = jwtConfig;
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
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
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
                                                    user.getAuthorities()
                                                        .stream().map(
                                                            GrantedAuthority::getAuthority).collect(Collectors.toList()
                                                        )
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
                jwtUtil.getTokensResponseBody(accessToken, refreshToken)
        );
    }
}

package com.atlantbh.auctionappbackend.filter;

import com.atlantbh.auctionappbackend.api.AuthWhitelistConfig;
import com.atlantbh.auctionappbackend.security.JwtConfig;
import com.atlantbh.auctionappbackend.utils.JwtUtil;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Authorization Filter class used to authorize user requests
 * <p>
 * Provides method for request filtering. If a request is made to a non whitelisted path, a token verification process
 * is triggered. If token verification is successful the request is authorized, otherwise the request is
 * blocked, and a 403 status code is returned.
 */
@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;
    private final Algorithm signAlgorithm;

    public JwtAuthorizationFilter(JwtConfig jwtConfig, Algorithm signAlgorithm) {
        this.jwtConfig = jwtConfig;
        this.signAlgorithm = signAlgorithm;
    }

    @Override
    protected void doFilterInternal(
                                        HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain
    ) throws ServletException, IOException {

        if (isWhitelistRoute(request)) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && JwtUtil.isAuthorizationHeaderValid(jwtConfig.getTokenPrefix(), authorizationHeader)) {
                try {
                    String token = JwtUtil.getTokenFromHeader(jwtConfig.getTokenPrefix(), authorizationHeader);
                    DecodedJWT decodedJWT = JwtUtil.verifyToken(signAlgorithm, token);
                    String email = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    JwtUtil.getGrantedAuthorities(roles)
                            );
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);

                } catch (JWTVerificationException exception) {
                    response.setStatus(FORBIDDEN.value());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(
                            response.getOutputStream(),
                            JwtUtil.getErrorResponseBody("Token Verification Failed")
                    );
                }

            } else {
                filterChain.doFilter(request, response);
            }
        }
    }

    private boolean isWhitelistRoute(HttpServletRequest request) {
        return Arrays.asList(AuthWhitelistConfig.getAuthWhitelist()).contains(request.getServletPath());
    }
}

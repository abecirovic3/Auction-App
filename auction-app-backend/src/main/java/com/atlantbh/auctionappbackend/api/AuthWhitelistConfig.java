package com.atlantbh.auctionappbackend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthWhitelistConfig {

    private static String[] authWhitelist;

    @Autowired
    public AuthWhitelistConfig(String apiPrefix) {
        authWhitelist = new String[] {
                "/api-docs",
                "/swagger-resources",
                "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**",
                "/v2/api-docs/**",
                "/swagger-ui/**",
                apiPrefix + "/auth/login",
                apiPrefix + "/auth/login/**",
                apiPrefix + "/auth/register",
                apiPrefix + "/auth/register/**",
                apiPrefix + "/auth/token/refresh",
                apiPrefix + "/auth/token/refresh/**",
                apiPrefix + "/health"
        };
    }

    public static String[] getAuthWhitelist() {
        return authWhitelist;
    }
}

package com.atlantbh.auctionappbackend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthWhitelistConfig {

    private static String[] authWhitelist;

    @Autowired
    public AuthWhitelistConfig(ApiConfig apiConfig) {
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
                apiConfig.getPrefix() + "/auth/login",
                apiConfig.getPrefix() + "/auth/login/**",
                apiConfig.getPrefix() + "/auth/register",
                apiConfig.getPrefix() + "/auth/register/**",
                apiConfig.getPrefix() + "/auth/token/refresh",
                apiConfig.getPrefix() + "/auth/token/refresh/**",
                apiConfig.getPrefix() + "/products",
                apiConfig.getPrefix() + "/health"
        };
    }

    public static String[] getAuthWhitelist() {
        return authWhitelist;
    }
}

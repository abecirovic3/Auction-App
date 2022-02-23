package com.atlantbh.auctionappbackend.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
@ConfigurationProperties(prefix = "application.jwt")
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpAfterMin;
    private Integer refreshTokenExpAfterMin;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public void setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
    }

    public Integer getTokenExpAfterMin() {
        return tokenExpAfterMin;
    }

    public void setTokenExpAfterMin(Integer tokenExpAfterMin) {
        this.tokenExpAfterMin = tokenExpAfterMin;
    }

    public Integer getRefreshTokenExpAfterMin() {
        return refreshTokenExpAfterMin;
    }

    public void setRefreshTokenExpAfterMin(Integer refreshTokenExpAfterMin) {
        this.refreshTokenExpAfterMin = refreshTokenExpAfterMin;
    }

    public Date getTokenExpDate() {
        return new Date(System.currentTimeMillis() + tokenExpAfterMin * 60000);
    }

    public Date getRefreshTokenExpDate() {
        return new Date(System.currentTimeMillis() + refreshTokenExpAfterMin * 60000);
    }
}

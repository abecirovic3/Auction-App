package com.atlantbh.auctionappbackend.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application.api")
public class ApiConfig {

    private String prefix;

    public ApiConfig() {
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Bean
    public String apiPrefix() {
        return prefix;
    }
}

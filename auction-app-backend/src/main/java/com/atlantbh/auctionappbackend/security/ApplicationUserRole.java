package com.atlantbh.auctionappbackend.security;

public enum ApplicationUserRole {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    private final String role;

    ApplicationUserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

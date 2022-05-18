package com.atlantbh.auctionappbackend.response;

import com.atlantbh.auctionappbackend.domain.Product;

public class ProductsResponse {
    private PaginatedResponse<Product> paginatedData;
    private String searchSuggestion;

    public ProductsResponse(PaginatedResponse<Product> paginatedData, String searchSuggestion) {
        this.paginatedData = paginatedData;
        this.searchSuggestion = searchSuggestion;
    }

    public PaginatedResponse<Product> getPaginatedData() {
        return paginatedData;
    }

    public void setPaginatedData(PaginatedResponse<Product> paginatedData) {
        this.paginatedData = paginatedData;
    }

    public String getSearchSuggestion() {
        return searchSuggestion;
    }

    public void setSearchSuggestion(String searchSuggestion) {
        this.searchSuggestion = searchSuggestion;
    }
}

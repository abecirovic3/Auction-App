package com.atlantbh.auctionappbackend.response;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> products;
    private int currentPage;
    private long totalElements;
    private int totalPages;

    public PaginatedResponse(List<T> products, int currentPage, long totalElements, int totalPages) {
        this.products = products;
        this.currentPage = currentPage;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<T> getProducts() {
        return products;
    }

    public void setProducts(List<T> products) {
        this.products = products;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}

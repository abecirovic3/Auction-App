package com.atlantbh.auctionappbackend.response;

import com.atlantbh.auctionappbackend.domain.Product;

import java.util.List;

public class ProductPaginated {
    private List<Product> products;
    private int currentPage;
    private long totalElements;
    private int totalPages;

    public ProductPaginated(List<Product> products, int currentPage, long totalElements, int totalPages) {
        this.products = products;
        this.currentPage = currentPage;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
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

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}

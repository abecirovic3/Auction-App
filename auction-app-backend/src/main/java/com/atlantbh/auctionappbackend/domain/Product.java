package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "Product")
@Table(name = "product")
public class Product {
    @Id
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition="TEXT")
    private String description;

    @Column(nullable = false)
    private Double startPrice;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<ProductImage> images;
    
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ProductUserBid> productBids;

    private Integer size;
    private String color;

    public Product() {
        // No args constructor needed by **framework**
    }

    public Product(
                    Long id,
                    String name,
                    String description,
                    Double startPrice,
                    LocalDate startDate,
                    LocalDate endDate,
                    List<ProductImage> images,
                    Integer size,
                    String color
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.images = images;
        this.size = size;
        this.color = color;
    }

    public Product(
                    Long id,
                    String name,
                    String description,
                    Double startPrice,
                    LocalDate startDate,
                    LocalDate endDate,
                    List<ProductImage> images,
                    List<ProductUserBid> productBids,
                    Integer size,
                    String color
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.images = images;
        this.productBids = productBids;
        this.size = size;
        this.color = color;
    }

    public Product(
            String name,
            String description,
            Double startPrice,
            LocalDate startDate,
            LocalDate endDate,
            List<ProductImage> images,
            Integer size,
            String color
    ) {
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.images = images;
        this.size = size;
        this.color = color;
    }

    public Product(String name, String description, Double startPrice, LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(Double startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public List<ProductImage> getImages() {
        return images;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<ProductUserBid> getProductBids() {
        return productBids;
    }

    public void setProductBids(List<ProductUserBid> productBids) {
        this.productBids = productBids;
    }
}

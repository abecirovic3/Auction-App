package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.LocalDateTime;
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
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference(value = "product-image-reference")
    private List<ProductImage> images;
    
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ProductUserBid> productBids;

    @ManyToOne
    @JoinColumn(
            name = "seller_id",
            foreignKey = @ForeignKey(name = "seller_id"),
            nullable = false
    )
    private User seller;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            foreignKey = @ForeignKey(name = "category_id"),
            nullable = false
    )
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JoinColumn(
            name = "street_id",
            foreignKey = @ForeignKey(name = "street_id"),
            nullable = false
    )
    private Street street;

    private Integer size;
    private String color;
    private Double highestBid;

    @Transient
    private Integer numberOfBids;

    public Product() {
        // No args constructor needed by **framework**
    }

    public Product(
            Long id,
            String name,
            String description,
            Double startPrice,
            LocalDateTime startDate,
            LocalDateTime endDate,
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
            LocalDateTime startDate,
            LocalDateTime endDate,
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
            LocalDateTime startDate,
            LocalDateTime endDate,
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

    public Product(String name, String description, Double startPrice, LocalDateTime startDate, LocalDateTime endDate) {
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

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
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

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public Category getCategory() {
        return category;
    }

    @JsonProperty
    public void setCategory(Category category) {
        this.category = category;
    }

    public Double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(Double highestBid) {
        this.highestBid = highestBid;
    }

    public Integer getNumberOfBids() {
        return numberOfBids;
    }

    public void setNumberOfBids(Integer numberOfBids) {
        this.numberOfBids = numberOfBids;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }
}

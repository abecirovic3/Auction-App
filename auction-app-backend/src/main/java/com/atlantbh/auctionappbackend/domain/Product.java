package com.atlantbh.auctionappbackend.domain;

import com.atlantbh.auctionappbackend.constraint.AuctionStartDatePreference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
    @NotBlank(message = "Product name is required")
    private String name;

    @Column(nullable = false, columnDefinition="TEXT")
    @NotBlank(message = "Product description is required")
    private String description;

    @Column(nullable = false)
    @NotNull(message = "Start price is required")
    @Positive(message = "Start price must be positive")
    private Double startPrice;

    @Column(nullable = false)
    @NotNull(message = "Start date is required")
    @AuctionStartDatePreference(message = "Auction start cannot be in the past")
    private LocalDateTime startDate;

    @Column(nullable = false)
    @NotNull(message = "End date is required")
    @FutureOrPresent(message = "Auction end cannot be in the past")
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "product-image-reference")
    private List<ProductImage> images;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ProductUserBid> productBids;

    @ManyToOne
    @JoinColumn(
            name = "seller_id",
            foreignKey = @ForeignKey(name = "seller_id"),
            nullable = false
    )
    @NotNull(message = "Seller is required")
    private User seller;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            foreignKey = @ForeignKey(name = "category_id"),
            nullable = false
    )
    @JsonIgnore
    @NotNull(message = "Category is required")
    private Category category;

    @ManyToOne
    @JoinColumn(
            name = "street_id",
            foreignKey = @ForeignKey(name = "street_id"),
            nullable = false
    )
    @NotNull(message = "Street is required")
    @Valid
    private Street street;

    private Integer size;
    private String color;
    private Double highestBid;

    private Boolean sold;

    @Transient
    private Integer numberOfBids;

    @Transient
    private User highestBidder;

    @ManyToMany(cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "wishlistProducts")
    @JsonIgnore
    private Set<User> wishlistUsers;

    @Transient
    private Boolean wishlistedByUser;

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

    public User getHighestBidder() {
        return highestBidder;
    }

    public void setHighestBidder(User highestBidder) {
        this.highestBidder = highestBidder;
    }

    public Boolean getSold() {
        return sold;
    }

    public void setSold(Boolean sold) {
        this.sold = sold;
    }

    public Set<User> getWishlistUsers() {
        return wishlistUsers;
    }

    public void setWishlistUsers(Set<User> wishlistUsers) {
        this.wishlistUsers = wishlistUsers;
    }

    public Boolean isWishlistedByUser() {
        return wishlistedByUser;
    }

    public void setWishlistedByUser(boolean wishlistedByUser) {
        this.wishlistedByUser = wishlistedByUser;
    }

    public Boolean getWishlistedByUser() {
        return wishlistedByUser;
    }

    public void setWishlistedByUser(Boolean wishlistedByUser) {
        this.wishlistedByUser = wishlistedByUser;
    }
}

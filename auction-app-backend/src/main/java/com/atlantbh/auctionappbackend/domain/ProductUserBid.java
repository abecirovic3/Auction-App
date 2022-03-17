package com.atlantbh.auctionappbackend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity(name = "ProductUserBid")
@Table(name = "product_user_bid")
public class ProductUserBid {
    @Id
    @SequenceGenerator(
            name = "product_user_bid_sequence",
            sequenceName = "product_user_bid_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_user_bid_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(name = "product_id"),
            nullable = false
    )
    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "bidder_id",
            foreignKey = @ForeignKey(name = "bidder_id"),
            nullable = false
    )
    private User user;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    public ProductUserBid() {
        // No args constructor needed by **framework**
    }

    public ProductUserBid(Long id, Product product, User user, Double amount, LocalDate date) {
        this.id = id;
        this.product = product;
        this.user = user;
        this.amount = amount;
        this.date = date;
    }

    public ProductUserBid(Product product, User user, Double amount, LocalDate date) {
        this.product = product;
        this.user = user;
        this.amount = amount;
        this.date = date;
    }

    public ProductUserBid(Product product, User user, Double amount) {
        this.product = product;
        this.user = user;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

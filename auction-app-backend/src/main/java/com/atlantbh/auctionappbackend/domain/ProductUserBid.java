package com.atlantbh.auctionappbackend.domain;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Collections;

@Entity(name = "ProductUserBid")
@Table(name = "product_user_bid")
@SqlResultSetMapping(
        name = "productUserBidMapping",
        classes = @ConstructorResult(
                targetClass = ProductUserBid.class,
                columns = {
                        @ColumnResult(name = "user_highest_bid", type = Double.class),
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "start_date", type = LocalDateTime.class),
                        @ColumnResult(name = "end_date", type = LocalDateTime.class),
                        @ColumnResult(name = "highest_bid", type = Double.class),
                        @ColumnResult(name = "number_of_bids", type = Long.class),
                        @ColumnResult(name = "image_url", type = String.class),
                }
        )
)
@NamedNativeQuery(
        name = "ProductUserBid.findMaxProductBidsByUser",
        resultClass = ProductUserBid.class,
        resultSetMapping = "productUserBidMapping",
        query = "select max(pub.amount) as user_highest_bid, p.id, p.name, p.start_date, p.end_date, p.highest_bid," +
                " (select count(pub1.id) from product_user_bid pub1 where pub1.product_id=p.id) as number_of_bids," +
                " (select pi.image_url from product_image pi where pi.product_id=p.id) as image_url" +
                " from product_user_bid pub, product p where pub.product_id = p.id and bidder_id=?1 group by p.id"
)
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
    private LocalDateTime date;

    public ProductUserBid() {
        // No args constructor needed by **framework**
    }

    // Constructor needed for Result Set Mapping
    public ProductUserBid(
                            Double userHighestBid,
                            Long productId,
                            String productName,
                            LocalDateTime productStartDate,
                            LocalDateTime productEndDate,
                            Double productHighestBid,
                            Long numberOfBids,
                            String imageUrl
    ) {
        this.amount = userHighestBid;
        this.product = new Product();
        this.product.setId(productId);
        this.product.setName(productName);
        this.product.setStartDate(productStartDate);
        this.product.setEndDate(productEndDate);
        this.product.setHighestBid(productHighestBid);
        this.product.setNumberOfBids(numberOfBids.intValue());
        if (imageUrl != null) {
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(imageUrl);
            this.product.setImages(Collections.singletonList(productImage));
        }
    }

    public ProductUserBid(Long id, Product product, User user, Double amount, LocalDateTime date) {
        this.id = id;
        this.product = product;
        this.user = user;
        this.amount = amount;
        this.date = date;
    }

    public ProductUserBid(Product product, User user, Double amount, LocalDateTime date) {
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}

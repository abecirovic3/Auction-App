package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.annotation.CreatedDate;

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
import java.util.Date;

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
    @JsonBackReference
    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "bidder_id",
            foreignKey = @ForeignKey(name = "bidder_id"),
            nullable = false
    )
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private Double amount;

    @CreatedDate
    private Date date;
}

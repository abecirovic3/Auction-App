package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import javax.persistence.UniqueConstraint;

@Entity(name = "UserReview")
@Table(
        name = "user_review",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "user_review_unique",
                        columnNames = {
                                "user_id",
                                "reviewer_id"
                        }
                )
        }
)
public class UserReview {
    @Id
    @SequenceGenerator(
            name = "user_review_sequence",
            sequenceName = "user_review_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_review_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "user_id"),
            nullable = false
    )
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(
            name = "reviewer_id",
            foreignKey = @ForeignKey(name = "reviewer_id"),
            nullable = false
    )
    @JsonIgnore
    private User reviewer;

    @Column(nullable = false)
    private byte rating;

    public UserReview() {
        // No args constructor needed by **framework**
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public byte getRating() {
        return rating;
    }

    public void setRating(byte rating) {
        this.rating = rating;
    }
}

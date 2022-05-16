package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity(name = "Card")
@Table(
        name = "card",
        uniqueConstraints = {
                @UniqueConstraint(name = "card_number_unique", columnNames = "number")
        }
)
public class Card {
    @Id
    @SequenceGenerator(
            name = "card_sequence",
            sequenceName = "card_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "card_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Card Number is required")
    private String number;

    @Column(nullable = false)
    @NotBlank(message = "Card Name is required")
    private String name;

    @Column(nullable = false)
    @NotNull(message = "Expiration date is required")
    @FutureOrPresent(message = "Card expiration must not be in the past")
    private LocalDate expirationDate;

    @Column(nullable = false)
    @NotBlank(message = "Card Name is required")
    private String cvc;

    @OneToOne(mappedBy = "card")
    @JsonIgnore
    private User user;

    public Card() {
        // No args constructor needed by **framework**
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

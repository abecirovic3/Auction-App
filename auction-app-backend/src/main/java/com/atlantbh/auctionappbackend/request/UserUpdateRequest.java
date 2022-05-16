package com.atlantbh.auctionappbackend.request;

import com.atlantbh.auctionappbackend.domain.Card;
import com.atlantbh.auctionappbackend.domain.Street;

import javax.persistence.Column;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

public class UserUpdateRequest {
    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "First Name is invalid")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Last Name is invalid")
    private String lastName;

    @Past(message = "Date of birth is not valid")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^(\\+\\d+\\s)?(\\(\\d+\\))?[\\s\\d.-]*$")
    private String phoneNumber;

    private String photoUrl;

    @Valid
    private Street street;

    @Valid
    private Card card;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }
}

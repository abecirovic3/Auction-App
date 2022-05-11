package com.atlantbh.auctionappbackend.projection;

import com.atlantbh.auctionappbackend.domain.Card;
import com.atlantbh.auctionappbackend.domain.Street;
import lombok.Value;

import java.time.LocalDate;

@Value
public class UserLoginProjection {
    Long id;
    String firstName;
    String lastName;
    String email;
    LocalDate dateOfBirth;
    String phoneNumber;
    String photoUrl;
    Street street;
    Card card;
}

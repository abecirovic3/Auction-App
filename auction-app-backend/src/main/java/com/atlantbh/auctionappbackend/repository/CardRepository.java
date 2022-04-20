package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findFirstByNumber(String number);
}

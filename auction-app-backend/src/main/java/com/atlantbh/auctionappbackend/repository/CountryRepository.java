package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Long> {
    Optional<Country> findFirstByName(String name);
}

package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}

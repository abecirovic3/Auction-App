package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.City;
import com.atlantbh.auctionappbackend.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findFirstByNameAndCountry(String name, Country country);
}

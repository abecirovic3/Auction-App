package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}

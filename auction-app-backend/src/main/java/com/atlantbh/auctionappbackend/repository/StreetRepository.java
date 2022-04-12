package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.Street;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StreetRepository extends JpaRepository<Street, Long> {
    Optional<Street> findFirstByNameAndZipcode(String name, String zipcode);
}

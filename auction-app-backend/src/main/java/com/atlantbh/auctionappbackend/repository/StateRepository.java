package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StateRepository extends JpaRepository<State, Long> {
    Optional<State> findFirstByName(String name);
}

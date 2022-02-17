package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

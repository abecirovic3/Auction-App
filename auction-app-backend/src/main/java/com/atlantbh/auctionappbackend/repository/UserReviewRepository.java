package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.domain.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserReviewRepository extends JpaRepository<UserReview, Long> {
    Optional<UserReview> findFirstByUserAndReviewer(User user, User reviewer);
}

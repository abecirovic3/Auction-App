package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.domain.UserReview;
import com.atlantbh.auctionappbackend.repository.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserReviewService {
    private final UserReviewRepository userReviewRepository;

    @Autowired
    public UserReviewService(UserReviewRepository userReviewRepository) {
        this.userReviewRepository = userReviewRepository;
    }

    public UserReview createReview(UserReview userReview) {
        Optional<UserReview> userReviewOptional =
                userReviewRepository.findFirstByUserAndReviewer(userReview.getUser(), userReview.getReviewer());
        if (userReviewOptional.isEmpty()) {
            return userReviewRepository.save(userReview);
        } else {
            UserReview existingUserReview = userReviewOptional.get();
            existingUserReview.setRating(userReview.getRating());
            return userReviewRepository.save(existingUserReview);
        }
    }

    public UserReview getReview(Long userId, Long reviewerId) {
        User user = new User();
        user.setId(userId);
        User reviewer = new User();
        reviewer.setId(reviewerId);
        return userReviewRepository.findFirstByUserAndReviewer(user, reviewer).orElse(null);
    }
}

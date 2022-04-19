package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductUserBidRepository productUserBidRepository;

    @Autowired
    public UserService(UserRepository userRepository, ProductRepository productRepository, ProductUserBidRepository productUserBidRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productUserBidRepository = productUserBidRepository;
    }

    public List<Product> getAllProducts(Long userId) {
        User seller = new User();
        seller.setId(userId);
        List<Product> products = productRepository.findAllBySeller(seller);
        for (Product p : products) {
            p.setNumberOfBids(productUserBidRepository.countByProduct(p).intValue());
            p.setSeller(seller);
        }
        return products;
    }

    public User getUserInfo(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User with id " + id + " doesn't exist"
            );
        }

        return userOptional.get();
    }
}

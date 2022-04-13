package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

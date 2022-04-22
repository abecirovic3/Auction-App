package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Card;
import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.Street;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.CardRepository;
import com.atlantbh.auctionappbackend.repository.ProductRepository;
import com.atlantbh.auctionappbackend.repository.ProductUserBidRepository;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.atlantbh.auctionappbackend.request.UserUpdateRequest;
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
    private final CardRepository cardRepository;
    private final StreetService streetService;

    @Autowired
    public UserService(UserRepository userRepository, ProductRepository productRepository, ProductUserBidRepository productUserBidRepository, CardRepository cardRepository, StreetService streetService) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productUserBidRepository = productUserBidRepository;
        this.cardRepository = cardRepository;
        this.streetService = streetService;
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

    public User updateUserInfo(Long id, UserUpdateRequest user) {
        Optional<User> currentUserOptional = userRepository.findById(id);

        if (currentUserOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User with id " + id + " doesn't exist"
            );
        }

        User currentUser = currentUserOptional.get();

        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setDateOfBirth(user.getDateOfBirth());
        currentUser.setPhoneNumber(user.getPhoneNumber());
        currentUser.setCard(getUserCard(user.getCard()));
        currentUser.setStreet(getUserStreet(user.getStreet()));

        return userRepository.save(currentUser);
    }

    private Street getUserStreet(Street street) {
        if (street == null) {
            return null;
        }
        return streetService.findOrCreateLocation(street);
    }

    private Card getUserCard(Card card) {
        if (card == null) {
            return null;
        }

        Optional<Card> cardOptional = cardRepository.findFirstByNumber(card.getNumber());
        if (cardOptional.isPresent()) {
            Card existingCard = cardOptional.get();
            existingCard.setName(card.getName());
            existingCard.setExpirationDate(card.getExpirationDate());
            existingCard.setCvc(card.getCvc());
            return cardRepository.save(existingCard);
        } else {
            return cardRepository.save(card);
        }
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "Account deactivated successfully";
    }
}

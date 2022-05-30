package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.ProductUserBid;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.projection.ProductWishlistDTO;
import com.atlantbh.auctionappbackend.request.UserUpdateRequest;
import com.atlantbh.auctionappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/{id}/products")
    public ResponseEntity<List<Product>> getAllProducts(@PathVariable Long id) {
        return new ResponseEntity<>(
                userService.getAllProducts(id),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) {
        return new ResponseEntity<>(
                userService.getUserInfo(id),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest user) {
        return new ResponseEntity<>(
                userService.updateUserInfo(id, user),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/{id}/bids")
    public ResponseEntity<List<ProductUserBid>> getAllBids(@PathVariable Long id) {
        return new ResponseEntity<>(
                userService.getAllBids(id),
                HttpStatus.OK
        );
    }

    @PostMapping(path = "/{id}/wishlist")
    public ResponseEntity<Void> addToWishlist(
            @PathVariable Long id,
            @RequestParam() Long productId
    ) {
        userService.addToWishlist(id, productId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}/wishlist")
    public ResponseEntity<Void> removeFromWishlist(
            @PathVariable Long id,
            @RequestParam() Long productId
    ) {
        userService.removeFromWishlist(id, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/{id}/wishlist")
    public ResponseEntity<List<ProductWishlistDTO>> getAllWishlistProducts(@PathVariable Long id) {
        return new ResponseEntity<>(
                userService.getAllWishlistProducts(id),
                HttpStatus.OK
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }
}

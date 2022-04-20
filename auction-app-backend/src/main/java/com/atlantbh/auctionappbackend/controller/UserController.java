package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.request.UserUpdateRequest;
import com.atlantbh.auctionappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<User> getUserInfo(@PathVariable Long id) {
        return new ResponseEntity<>(
                userService.getUserInfo(id),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<User> updateUserInfo(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest user) {
        return new ResponseEntity<>(
                userService.updateUserInfo(id, user),
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

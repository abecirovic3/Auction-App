package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    public ResponseEntity<Map<String, String>> registerUser(User user) {
        List<String> errMessages = new LinkedList<>();
        Map<String, String> response = new HashMap<>();

        if (isEmpty(user.getFirstName()))
            errMessages.add("First Name is required");
        if (isEmpty(user.getLastName()))
            errMessages.add("Last Name is required");
        if (isEmpty(user.getEmail()))
            errMessages.add("Email is required");
        if (isEmpty(user.getPassword()))
            errMessages.add("Password is required");

        if (errMessages.size() != 0) {
            response.put("error", String.join(", ", errMessages));
            return new ResponseEntity<>(
                    response,
                    HttpStatus.BAD_REQUEST
            );
        }

        if (!EmailValidator.getInstance().isValid(user.getEmail())) {
            response.put("error", "Email is not valid");
            return new ResponseEntity<>(
                    response,
                    HttpStatus.BAD_REQUEST
            );
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("error", "User with email " + user.getEmail() + " already exists");
            return new ResponseEntity<>(
                    response,
                    HttpStatus.BAD_REQUEST
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userRepository.save(user);

        response.put("success", "User " + user.getEmail() + " is registered");
        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }

    private boolean isEmpty(String s) {
        return s == null || s.isBlank();
    }

    public User getUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }
        return user;
    }
}

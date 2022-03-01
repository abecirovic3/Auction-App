package com.atlantbh.auctionappbackend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    private UserService userService;

    private final User testUser = new User("Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");;

    @BeforeEach
    void initUseCase() {
        userService = new UserService(userRepository, new BCryptPasswordEncoder());
    }

    @Test
    public void testRegisterUserSuccess() {
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User registeredUser = userService.registerUser(testUser);

        assertThat(registeredUser.getEmail()).isEqualTo(testUser.getEmail());
    }

    @Test
    public void testRegisterExistingUser() {
        when(userRepository.findByEmail(any(String.class))).thenReturn(testUser);

        try {
            userService.registerUser(testUser);
        } catch (ResponseStatusException e) {
            assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
            assertThat(e.getReason()).isEqualTo("User with email " + testUser.getEmail() + " already exists");
        }
    }

    @Test
    public void testGetUserByEmailSuccess() {
        when(userRepository.findByEmail(any(String.class))).thenReturn(testUser);

        User fetchedUser = userService.getUserByEmail("foo@bar.org.com");

        assertThat(fetchedUser.getPassword()).isEqualTo(testUser.getPassword());
    }

    @Test
    public void testLoadUserByUsernameSuccess() {
        when(userRepository.findByEmail(any(String.class))).thenReturn(testUser);

        UserDetails loadedUser = userService.loadUserByUsername(testUser.getEmail());

        assertThat(loadedUser.getUsername()).isEqualTo(testUser.getEmail());
    }
}

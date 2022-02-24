package com.atlantbh.auctionappbackend.serviceTest;

import static org.assertj.core.api.Assertions.assertThat;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.atlantbh.auctionappbackend.service.UserService;
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

    @BeforeEach
    void initUseCase() {
        userService = new UserService(userRepository, new BCryptPasswordEncoder());
    }

    @Test
    public void testRegisterUserSuccess() {
        User user = new User("Foo", "Bar", "foo@bar.org.com", "password", "ROLE_USER");

        when(userRepository.save(any(User.class))).thenReturn(user);

        User registeredUser = userService.registerUser(user);
        assertThat(registeredUser.getEmail()).isEqualTo(user.getEmail());
    }

    @Test
    public void testRegisterExistingUser() {
        User user = new User("Sabit", "Iz Tarčina", "sabit@tarcin_city.com", "tajna", "ROLE_USER");

        when(userRepository.findByEmail(any(String.class))).thenReturn(user);

        try {
            userService.registerUser(user);
        } catch (ResponseStatusException e) {
            assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
            assertThat(e.getReason()).isEqualTo("User with email " + user.getEmail() + " already exists");
        }
    }

    @Test
    public void testGetUserSuccess() {
        User user = new User("Test", "User", "test@user.com", "whatever", "ROLE_USER");

        when(userRepository.findByEmail(any(String.class))).thenReturn(user);

        User fetchedUser = userService.getUser("test@user.com");

        assertThat(fetchedUser.getPassword()).isEqualTo("whatever");
    }

    @Test
    public void testLoadUserByUsernameSuccess() {
        User user = new User("Rocky", "Balboa", "rocky@balboa.com", "Adrian", "ROLE_USER");
        when(userRepository.findByEmail(any(String.class))).thenReturn(user);
        UserDetails loadedUser = userService.loadUserByUsername(user.getEmail());
        assertThat(loadedUser.getUsername()).isEqualTo(user.getEmail());
    }
}

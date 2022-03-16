package com.atlantbh.auctionappbackend.repostitory;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private final User testUser = new User("John", "Doe", "john@doe.com", "password", "ROLE_USER");

    @BeforeEach
    void initUseCase() {
        List<User> customers = List.of(testUser);
        userRepository.saveAll(customers);
    }

    @AfterEach
    public void destroyAll(){
        userRepository.deleteAll();
    }

    @Test
    public void testCreateUser() {
        User savedUser = userRepository.save(testUser);

        assertThat(testUser.getEmail()).isEqualTo(savedUser.getEmail());
    }

    @Test
    public void testFindAllUsers() {
        List<User> users = userRepository.findAll();
        assertThat(users.size()).isGreaterThanOrEqualTo(1);
    }

    @Test
    public void testFindByEmail() {
        User foundUser = userRepository.findByEmail(testUser.getEmail());
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getFirstName()).isEqualTo(testUser.getFirstName());
    }
}

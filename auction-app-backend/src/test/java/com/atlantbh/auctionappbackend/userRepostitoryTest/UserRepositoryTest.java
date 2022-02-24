package com.atlantbh.auctionappbackend.userRepostitoryTest;

import static org.assertj.core.api.Assertions.assertThat;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.Arrays;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private final User dummy = new User("John", "Doe", "john@doe.com", "passwod", "ROLE_USER");

    @BeforeEach
    void initUseCase() {
        List<User> customers = List.of(
                dummy
        );
        userRepository.saveAll(customers);
    }

    @AfterEach
    public void destroyAll(){
        userRepository.deleteAll();
    }

    @Test
    public void testCreateUser() {
        User savedUser = userRepository.save(dummy);

        assertThat(dummy.getEmail()).isEqualTo(savedUser.getEmail());
    }

    @Test
    public void testFinAllUsers() {
        List<User> users = userRepository.findAll();
        assertThat(users.size()).isGreaterThanOrEqualTo(1);
    }

    @Test
    public void testFindByEmail() {
        User foundUser = userRepository.findByEmail(dummy.getEmail());
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getFirstName()).isEqualTo(dummy.getFirstName());
    }
}

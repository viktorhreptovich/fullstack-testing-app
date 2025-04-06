package org.example.springtest.tests;

import net.datafaker.Faker;
import org.example.springtest.BaseTest;
import org.example.springtest.annotations.ApiClient;
import org.example.springtest.api.clients.AuthClient;
import org.example.springtest.api.dto.AuthSignUpDto;
import org.example.springtest.db.entities.UserEntity;
import org.example.springtest.db.services.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static org.example.springtest.api.matchers.ApiResultMatchers.status;
import static org.example.springtest.db.matchers.DbResultMatchers.exists;


class AuthServiceTest extends BaseTest {

    @ApiClient
    private AuthClient authClient;

    @Autowired
    private UserService userService;

    @Autowired
    private Faker faker;

    @Test
    @DisplayName("Sign up new user should be success")
    void testSignUpSuccess() {
        AuthSignUpDto authSignUpDto = AuthSignUpDto.builder()
            .username(faker.internet().username())
            .email(faker.internet().emailAddress())
            .password(faker.internet().password())
            .build();

        authClient.signUp(authSignUpDto)
            .expect(status().is(HttpStatus.CREATED));

        userService.findByEmail(authSignUpDto.getEmail())
            .expect(exists());
    }

    @Test
    @DisplayName("Sign up existing user should be fail")
    void testSignUpFail() {
        AuthSignUpDto authSignUpDto = AuthSignUpDto.builder()
            .username(faker.internet().username())
            .email(faker.internet().emailAddress())
            .password(faker.internet().password())
            .build();
        UserEntity userEntity = UserEntity.builder()
            .username(authSignUpDto.getUsername())
            .email(authSignUpDto.getEmail())
            .password(authSignUpDto.getPassword())
            .build();
        userService.save(userEntity);

        authClient.signUp(authSignUpDto)
            .expect(status().is(HttpStatus.CONFLICT));
    }

    @Test
    @DisplayName("Sign up new user with invalid email should be fail")
    void testSignUpFailInvalidEmail() {
        AuthSignUpDto authSignUpDto = AuthSignUpDto.builder()
            .username(faker.internet().username())
            .email("invalid_email")
            .password(faker.internet().password())
            .build();

        authClient.signUp(authSignUpDto)
            .expect(status().is(HttpStatus.BAD_REQUEST));
    }

}

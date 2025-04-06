package org.example.springtest.db.services;

import io.qameta.allure.Step;
import lombok.AllArgsConstructor;
import org.example.springtest.db.entities.UserEntity;
import org.example.springtest.db.matchers.DbResult;
import org.example.springtest.db.repositories.UserRepository;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Step("Find user by email")
    public DbResult<UserEntity> findByEmail(String mail) {
        UserEntity user = userRepository.findByEmail(mail);
        return new DbResult<UserEntity>(user);
    }

    @Override
    public void save(UserEntity userEntity) {
        userRepository.save(userEntity);
    }


}

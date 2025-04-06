package org.example.springtest.db.services;

import org.example.springtest.db.entities.UserEntity;
import org.example.springtest.db.matchers.DbResult;

public interface UserService {

    DbResult<UserEntity> findByEmail(String mail);

    void save(UserEntity userEntity);

}

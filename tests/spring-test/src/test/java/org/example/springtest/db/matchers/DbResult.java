package org.example.springtest.db.matchers;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DbResult<T> {

    private final T entity;

    public DbResult<T> expect(DbResultMatcher matcher) {
        matcher.match(this);
        return this;
    }

}

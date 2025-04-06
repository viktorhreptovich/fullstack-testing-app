package org.example.springtest.db.matchers;

@FunctionalInterface
public interface DbResultMatcher {

    void match(DbResult result);

}

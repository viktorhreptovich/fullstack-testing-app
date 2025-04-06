package org.example.springtest.annotations;

import org.springframework.beans.factory.annotation.Autowired;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


//https://www.baeldung.com/spring-annotation-bean-pre-processor
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD,
    ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Autowired
public @interface ApiClient {

}

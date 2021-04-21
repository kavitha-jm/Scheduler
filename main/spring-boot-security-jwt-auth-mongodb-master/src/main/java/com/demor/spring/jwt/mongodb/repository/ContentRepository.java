package com.demor.spring.jwt.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.demor.spring.jwt.mongodb.models.Content;

@Repository
public interface ContentRepository  extends MongoRepository<Content,String>{

}

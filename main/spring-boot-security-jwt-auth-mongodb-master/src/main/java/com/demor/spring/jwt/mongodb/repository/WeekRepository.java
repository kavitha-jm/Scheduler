package com.demor.spring.jwt.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demor.spring.jwt.mongodb.models.WeekSchedule;

public interface WeekRepository extends MongoRepository<WeekSchedule,String> {
	

}

package com.demor.spring.jwt.mongodb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demor.spring.jwt.mongodb.models.Schedule;

public interface ScheduleRepository extends MongoRepository<Schedule, String> {
	List<Schedule> findByFinished(boolean status);
	List<Schedule> findByTitleContaining(String title);

}

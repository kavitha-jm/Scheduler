package com.demor.spring.jwt.mongodb.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.demor.spring.jwt.mongodb.models.WeekSchedule;
import com.demor.spring.jwt.mongodb.repository.WeekRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class WeekController {
	
	@Autowired
	WeekRepository weekRepository;
	
	@PostMapping("/week")
	  public ResponseEntity<WeekSchedule> createTutorial(@Valid @RequestBody List<WeekSchedule> week) {
		
	    try {
	    for(int i=0;i<week.size();i++)
	    {
	      WeekSchedule week_schedule = weekRepository.save(week.get(i));
	    }
	      return new ResponseEntity<>(null, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	

}

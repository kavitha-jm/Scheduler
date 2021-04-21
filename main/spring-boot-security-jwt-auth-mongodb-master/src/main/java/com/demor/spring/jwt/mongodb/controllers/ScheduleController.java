package com.demor.spring.jwt.mongodb.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demor.spring.jwt.mongodb.models.Schedule;
import com.demor.spring.jwt.mongodb.repository.ScheduleRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ScheduleController {
	
	@Autowired
	ScheduleRepository scheduleRepository;
	
	
	@GetMapping("/home")
	  public ResponseEntity<List<Schedule>> getAllTutorials(@Valid @RequestParam(required = false) String userid,String title) {
	    try {
	      List<Schedule> tutorials = new ArrayList<Schedule>();
	      List<Schedule> schedulesPerUser = new ArrayList<Schedule>();
	      if (title == null )
	      {
	        scheduleRepository.findAll().forEach(tutorials::add);
	        for(int i=0;i<tutorials.size();i++)
	        {
	        	if(tutorials.get(i).getUserid()==userid)
	        	{
	        		tutorials.remove(i);
	        	}
	        }
	       
	      }
	      else
	        scheduleRepository.findByTitleContaining(title).forEach(tutorials::add);

	      if (tutorials.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }
	      
	      return new ResponseEntity<>(tutorials, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @GetMapping("/home/{id}")
	  public ResponseEntity<Schedule> getTutorialById(@Valid @PathVariable("id") String id) {
	    Optional<Schedule> tutorialData = scheduleRepository.findById(id);

	    if (tutorialData.isPresent()) {
	      return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }

	  @PostMapping("/home")
	  public ResponseEntity<Schedule> createTutorial(@Valid @RequestBody Schedule tutorial) {
	    try {
	      Schedule _tutorial = scheduleRepository.save(new Schedule(tutorial.getTitle(), tutorial.getDescription(), false,tutorial.getUserid()));
	      return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @PutMapping("/home/{id}")
	  public ResponseEntity<Schedule> updateTutorial(@Valid @PathVariable("id") String id, @RequestBody Schedule tutorial) {
	    Optional<Schedule> tutorialData = scheduleRepository.findById(id);

	    if (tutorialData.isPresent()) {
	      Schedule _tutorial = tutorialData.get();
	      _tutorial.setTitle(tutorial.getTitle());
	      _tutorial.setDescription(tutorial.getDescription());
	      _tutorial.setStatus(tutorial.isFinished());
	      return new ResponseEntity<>(scheduleRepository.save(_tutorial), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }

	  @DeleteMapping("/home/{id}")
	  public ResponseEntity<HttpStatus> deleteTutorial(@Valid @PathVariable("id") String id) {
	    try {
	      scheduleRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @DeleteMapping("/home")
	  public ResponseEntity<HttpStatus> deleteAllTutorials() {
	    try {
	      scheduleRepository.deleteAll();
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @GetMapping("/home/published")
	  public ResponseEntity<List<Schedule>> findByStatus() {
	    try {
	      List<Schedule> tutorials = scheduleRepository.findByFinished(true);

	      if (tutorials.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }
	      return new ResponseEntity<>(tutorials, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }


}

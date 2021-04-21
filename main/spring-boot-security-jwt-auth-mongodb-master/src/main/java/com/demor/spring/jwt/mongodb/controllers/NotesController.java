package com.demor.spring.jwt.mongodb.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demor.spring.jwt.mongodb.models.Content;
import com.demor.spring.jwt.mongodb.repository.ContentRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class NotesController {
	@Autowired
	ContentRepository contentRepo;

	 @PostMapping("/save")
	  public ResponseEntity<Content> createDocument(@Valid @RequestBody Content doc) {
	    try {
	      Content _doc = contentRepo.save(doc);
	      return new ResponseEntity<>(_doc, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
}

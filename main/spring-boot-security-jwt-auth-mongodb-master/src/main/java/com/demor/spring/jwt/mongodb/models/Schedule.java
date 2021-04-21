package com.demor.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tutorials")
public class Schedule {
	 @Id
	  private String id;
	  private String title;
	  private String description;
	  private boolean finished;
	  private String userid;

	  public Schedule() {

	  }

	  public Schedule(String title, String description, boolean status,String userid) {
	    this.title = title;
	    this.description = description;
	    this.finished = status;
	    this.userid = userid;
	  }
	  
	   public String getUserid() {
			return userid;
		}

		public void setUserid(String userid) {
			this.userid = userid;
		}


	public String getId() {
	    return id;
	  }

	  public String getTitle() {
	    return title;
	  }

	  public void setTitle(String title) {
	    this.title = title;
	  }

	  public String getDescription() {
	    return description;
	  }

	  public void setDescription(String description) {
	    this.description = description;
	  }

	  public boolean isFinished() {
	    return finished;
	  }

	  public void setStatus(boolean isDone) {
	    this.finished = isDone;
	  }

	  @Override
	  public String toString() {
	    return "Tutorial [id=" + id + ", title=" + title + ", desc=" + description + ", finished?=" + finished + "]";
	  }
	}


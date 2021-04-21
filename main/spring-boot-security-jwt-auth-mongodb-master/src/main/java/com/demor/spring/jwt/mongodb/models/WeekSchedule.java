package com.demor.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "week")
public class WeekSchedule {
	@Id
    private String id;
	private String text;
	private String start;
	private String end;
	private String backcolor;
	public WeekSchedule()
	{
		
	}
	public WeekSchedule(String id, String text, String start, String end) {
		super();
		this.id = id;
		this.text = text;
		this.start = start;
		this.end = end;
		
	}
	public WeekSchedule(String id, String text, String start, String end, String backcolor) {
		super();
		this.id = id;
		this.text = text;
		this.start = start;
		this.end = end;
		this.backcolor = backcolor;	
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getBackcolor() {
		return backcolor;
	}
	public void setBackcolor(String backcolor) {
		this.backcolor = backcolor;
	}

	
	
}

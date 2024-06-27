package com.quizapp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Quiz {
	@Id
	String quizId;
	String userId;
	String date;
	String difficulty;
	String subject;
	String title;
	int duration;
	String totalQuestions;
	String totalPoints;
	public String getQuizId() {
		return quizId;
	}
	public void setQuizId(String quizId) {
		this.quizId = quizId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}	
	
	
	public String getTotalQuestions() {
		return totalQuestions;
	}
	public void setTotalQuestions(String totalQuestions) {
		this.totalQuestions = totalQuestions;
	}
	public Quiz(String quizId, String date, String difficulty, String subject, String title, int duration, String totalQuestions, String totalPoints) {
		super();
		this.quizId = quizId;
		this.date = date;
		this.difficulty = difficulty;
		this.subject = subject;
		this.title = title;
		this.duration = duration;
		this.totalQuestions = totalQuestions;
		this.totalPoints = totalPoints;
	}
	
	public Quiz() {
		super();
	}
	public String getTotalPoints() {
		return totalPoints;
	}
	public void setTotalPoints(String totalPoints) {
		this.totalPoints = totalPoints;
	}
	@Override
	public String toString() {
		return "Quiz [quizId=" + quizId + ", userId=" + userId + ", date=" + date + ", difficulty=" + difficulty
				+ ", subject=" + subject + ", title=" + title + ", duration=" + duration + ", totalQuestions="
				+ totalQuestions + ", totalPoints=" + totalPoints + "]";
	}
	
	
	
}

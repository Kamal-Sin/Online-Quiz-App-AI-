package com.quizapp.dto;

import java.util.List;
import java.util.Map;

import com.quizapp.models.Question;
import com.quizapp.models.Quiz;

public class QuizSubmissionDto {
	private String quizId;
	private String date;
	private Map<String, String> answers;
	public String getQuizId() {
		return quizId;
	}
	public void setQuizId(String quizId) {
		this.quizId = quizId;
	}
	public Map<String, String> getAnswers() {
		return answers;
	}
	public void setAnswers(Map<String, String> answers) {
		this.answers = answers;
	}
	
	
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "QuizSubmissionDto [quizId=" + quizId + ", date=" + date + ", answers=" + answers + "]";
	}
	
	
	
	
	
}

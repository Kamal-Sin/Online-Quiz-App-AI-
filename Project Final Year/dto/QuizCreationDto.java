package com.quizapp.dto;

import java.util.List;

import com.quizapp.models.Question;
import com.quizapp.models.Quiz;

public class QuizCreationDto {
	private Quiz quiz;
	private List<Question> questions;
	public Quiz getQuiz() {
		return quiz;
	}
	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	@Override
	public String toString() {
		return "QuizCreationDto [quiz=" + quiz + ", questions=" + questions + "]";
	}
	
}

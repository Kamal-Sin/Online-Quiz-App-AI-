package com.quizapp.models;

import com.quizapp.keys.QuestionCompositeKey;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(value = QuestionCompositeKey.class)
public class Question {
	@Id
	String quizId;
	@Id
	String questionNo;
	String question;
	String option1;
	String option2;
	String option3;
	String option4;
	String correct;
	String points;
	public String getQuizId() {
		return quizId;
	}

	public void setQuizId(String quizId) {
		this.quizId = quizId;
	}

	public String getQuestionNo() {
		return questionNo;
	}

	public void setQuestionNo(String questionNo) {
		this.questionNo = questionNo;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getOption1() {
		return option1;
	}

	public void setOption1(String option1) {
		this.option1 = option1;
	}

	public String getOption2() {
		return option2;
	}

	public void setOption2(String option2) {
		this.option2 = option2;
	}

	public String getOption3() {
		return option3;
	}

	public void setOption3(String option3) {
		this.option3 = option3;
	}

	public String getOption4() {
		return option4;
	}

	public void setOption4(String option4) {
		this.option4 = option4;
	}

	public String getCorrect() {
		return correct;
	}

	public void setCorrect(String correct) {
		this.correct = correct;
	}
	
	

	public String getPoints() {
		return points;
	}

	public void setPoints(String points) {
		this.points = points;
	}

	public Question(String questionNo, String question, String option1, String option2, String option3, String option4,
			String correct,String points) {
		super();
		this.questionNo = questionNo;
		this.question = question;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
		this.correct = correct;
		this.points = points;
	}
	
	
	

	public Question() {
		super();
	}

	@Override
	public String toString() {
		return "Question [quizId=" + quizId + ", questionNo=" + questionNo + ", question=" + question + ", option1="
				+ option1 + ", option2=" + option2 + ", option3=" + option3 + ", option4=" + option4 + ", correct="
				+ correct + ", points=" + points + "]";
	}

	

}

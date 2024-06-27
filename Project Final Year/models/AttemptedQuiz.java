package com.quizapp.models;

import com.quizapp.keys.AttemptedQuizKey;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(AttemptedQuizKey.class)
public class AttemptedQuiz {
	@Id
	private String userId;
	@Id
	private String quizId;
	private String points;
	private String date;
	private String totalPoints;
	
	public AttemptedQuiz() {
		super();
	}
	
	public AttemptedQuiz(String userId, String quizId, String points, String date, String totalPoints) {
		super();
		this.userId = userId;
		this.quizId = quizId;
		this.points = points;
		this.date = date;
		this.totalPoints = totalPoints;
	}






	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getQuizId() {
		return quizId;
	}
	public void setQuizId(String quizId) {
		this.quizId = quizId;
	}
	public String getPoints() {
		return points;
	}
	public void setPoints(String points) {
		this.points = points;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTotalPoints() {
		return totalPoints;
	}
	public void setTotalPoints(String totalPoints) {
		this.totalPoints = totalPoints;
	}
	@Override
	public String toString() {
		return "AttemptedQuiz [userId=" + userId + ", quizId=" + quizId + ", points=" + points + ", date=" + date
				+ ", totalPoints=" + totalPoints + "]";
	}

	
}

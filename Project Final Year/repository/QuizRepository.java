package com.quizapp.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.quizapp.models.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, String> {

	Optional<Quiz> findByQuizId(String id);
	
	@Query("Select q.quizId as quizId, q.title as title, q.subject as subject, q.difficulty as difficulty, q.totalQuestions as totalQuestions from Quiz q where q.quizId =?1")
	Map<String,String> findByQuizIdNoDate(String id);
	
//	@Query("Select new com.quizapp.dto.PartialQuizDetailsDto(q.title, q.date) from Quiz as q where q.userId =?1 order by q.date Desc")
//	Optional<List<PartialQuizDetailsDto>> findByUserId(String userId);
	

	Optional<List<Quiz>> findByUserIdOrderByDateDesc(String userId);

	@Query("Select q.title as title, q.quizId as quizId, q.duration as duration,q.totalQuestions as totalQuestions, q.subject as subject, q.difficulty as difficulty from Quiz q where q.quizId = ?1")
	Optional<Map<String, String>> findQuizByQuizId(String quizId);
	
	@Query("select q.totalPoints as totalPoints from Quiz q where q.quizId = ?1")
	public String findPointsByQuizId(String quizId);
}

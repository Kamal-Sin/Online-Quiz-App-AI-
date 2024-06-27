package com.quizapp.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.quizapp.keys.QuestionCompositeKey;
import com.quizapp.models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionCompositeKey>{

	@Query("Select q.questionNo as questionNo, q.question as question, q.option1 as option1, q.option2 as option2, q.option3 as option3, q.option4 as option4,q.points as points from Question q Where q.quizId =?1")
	public Optional<List<Map<String, String>>> findByQuizId(String id);
	
	@Query("Select q.correct as correct,q.points as points from Question q Where q.quizId =?1 and q.questionNo = ?2")
	public Map<String, String> findQuestionByQuizId(String id,String questionNo);

}

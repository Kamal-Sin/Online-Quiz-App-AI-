package com.quizapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.quizapp.keys.AttemptedQuizKey;
import com.quizapp.models.AttemptedQuiz;

public interface AttemptedQuizRepository extends JpaRepository<AttemptedQuiz, AttemptedQuizKey> {

	Optional<AttemptedQuiz> findByUserIdAndQuizId(String userId, String quizId);

	List<AttemptedQuiz> findByUserId(String userId);

}

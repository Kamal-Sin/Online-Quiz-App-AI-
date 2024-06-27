package com.quizapp.services;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quizapp.models.AttemptedQuiz;
import com.quizapp.models.Question;
import com.quizapp.models.Quiz;
import com.quizapp.models.User;
import com.quizapp.repository.AttemptedQuizRepository;
import com.quizapp.repository.QuizRepository;
import com.quizapp.repository.UserRepository;

@Service
public class UserService {

	private UserRepository repo;
	private QuizRepository quizRepo;
	private QuestionService questionService;
	private AttemptedQuizRepository attemptedRepo;

	public UserService(UserRepository repo, QuizRepository quizRepo, QuestionService questionService,
			AttemptedQuizRepository attemptedRepo) {
		this.repo = repo;
		this.quizRepo = quizRepo;
		this.questionService = questionService;
		this.attemptedRepo = attemptedRepo;
	}

	public ResponseEntity<?> registerUser(User user) {
		if (repo.findByEmail(user.getEmail()).isPresent())
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		String id = UUID.randomUUID().toString();
		user.setId(id);
		User response = repo.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	public ResponseEntity<?> loginUser(Map<String, String> login) {
		Optional<User> res = repo.findByEmail(login.get("email"));
		if (res.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		User user = res.get();
		if (!login.get("password").equals(user.getPassword()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

		byte[] userId = String.valueOf(user.getId()).getBytes();
		String encodedUid = Base64.getEncoder().encodeToString(userId);
		Map<String, String> data = new HashMap<>();
		data.put("id", encodedUid);
		data.put("username", user.getFirstName());
		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	public User getUser(String id) {
		User user = repo.findById(id).get();
		return user;
	}

	public boolean checkUser(String uid) {
		Optional<User> user = repo.findById(uid);
		if (user.isEmpty())
			return false;
		return true;
	}

	public ResponseEntity<List<Quiz>> allQuizzes(String userId) {
		Optional<List<Quiz>> all = quizRepo.findByUserIdOrderByDateDesc(userId);
		if (all.isEmpty())
			return ResponseEntity.noContent().build();
		return ResponseEntity.status(HttpStatus.FOUND).body(all.get());
	}

	public ResponseEntity<Quiz> getQuiz(String quizId, String userId) {
		Optional<Quiz> res = quizRepo.findByQuizId(quizId);
		if (res.isEmpty())
			return ResponseEntity.notFound().build();
		if (userQuizRelation(userId, quizId)) {
			res.get().setUserId(null);
			return ResponseEntity.ok(res.get());
		}
		return ResponseEntity.notFound().build();
	}

	private boolean userQuizRelation(String userId, String quizId) {
		Optional<Quiz> res = quizRepo.findByQuizId(quizId);
		if (res.isEmpty() || res.get().getUserId().isBlank())
			return false;
		if (userId.equals(res.get().getUserId()))
			return true;
		return false;
	}

	public ResponseEntity<?> getQuestions(String quizId, String userId) {
		if (!userQuizRelation(userId, quizId))
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return questionService.getQuiz(quizId);
	}

	public ResponseEntity<?> getAttempted(String userId) {
		List<AttemptedQuiz> attemptedQuizId = attemptedRepo.findByUserId(userId);
		if (attemptedQuizId.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		Map<String, List<?>> response = new HashMap<>();
		List<Map<String, String>> quizzes = new ArrayList<>();
		for (AttemptedQuiz quiz : attemptedQuizId) {
			Map<String, String> m = quizRepo.findByQuizIdNoDate(quiz.getQuizId());
			if (!m.isEmpty())
				quizzes.add(m);
		}

		response.put("attempted", attemptedQuizId);
		response.put("quizDetails", quizzes);
		return ResponseEntity.ok(response);

	}

	public ResponseEntity<?> getUsers(String userId) {
		Optional<String> res = repo.findByUserId(userId);
		if (res.isEmpty())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		return ResponseEntity.ok(res.get());
	}

}
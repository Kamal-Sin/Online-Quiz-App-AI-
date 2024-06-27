package com.quizapp.controller;

import java.awt.PageAttributes.MediaType;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.dto.QuizCreationDto;
import com.quizapp.dto.QuizSubmissionDto;
import com.quizapp.models.Quiz;
import com.quizapp.services.QuestionService;
import com.quizapp.services.QuizService;

@RestController
@RequestMapping("quiz")
public class QuizController {

	private QuizService quizService;
	private QuestionService questionService;

	public QuizController(QuizService quizService, QuestionService questionService) {
		this.quizService = quizService;
		this.questionService = questionService;
	}

	@PostMapping("create")
	public ResponseEntity<?> createQuiz(@RequestAttribute("userId") String userId, @RequestBody QuizCreationDto quizDto)
	{
		Quiz quiz =  quizDto.getQuiz();
		quiz.setUserId(userId);
		String quizId = quizService.createQuiz(quiz,quizDto.getQuestions());
		if(quizId.isBlank())
		return ResponseEntity.internalServerError().build();
		
		if(questionService.addQuestions(quizDto.getQuestions(), quizId))
			return ResponseEntity.status(HttpStatus.CREATED).body(quizId);
		System.out.println(quizDto);
		return ResponseEntity.notFound().build();
	}
	
	
	@GetMapping("{quizId}")
	public ResponseEntity<?> getQuiz(@PathVariable("quizId") String id)
	{
		return questionService.getQuiz(id);
	}
	
	
	@GetMapping("attempt/{quizId}")
	public ResponseEntity<?> getQuizInstructions(@PathVariable String quizId,@RequestAttribute String userId)
	{
		if(quizService.checkAttempted(userId,quizId))
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		return quizService.getQuizInstructions(quizId);
	}
	@PostMapping("start")
	public ResponseEntity<?> getQuestions(@RequestBody Map<String, String> quizId)
	{
		return questionService.getQuiz(quizId.get("quizId"));
	}
	
	
	@PostMapping("submit")
	public ResponseEntity<?> submitQuiz(@RequestBody QuizSubmissionDto answers, @RequestAttribute String userId)
	{
		answers.getAnswers().remove("0");
		return quizService.submitQuiz(answers.getQuizId(),userId,answers.getDate(),answers.getAnswers());
	}
}

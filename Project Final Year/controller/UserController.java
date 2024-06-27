package com.quizapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.models.Question;
import com.quizapp.models.Quiz;
import com.quizapp.models.User;
import com.quizapp.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("user")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService)
	{
		this.userService = userService;
	}

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
    	return userService.registerUser(user);
    }
    
    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> user)
    {
    	return userService.loginUser(user);
    }
    
    @GetMapping("getUser")
    public ResponseEntity<?> getUser(@RequestAttribute String userId)
    {
    	return userService.getUsers(userId);
    }
    
    
    @GetMapping("creations")
    public ResponseEntity<?> allQuizzes(@RequestAttribute String userId)
    {
    	return userService.allQuizzes(userId);
    }
    
    @GetMapping("creations/{quizId}")
    public ResponseEntity<Quiz> specificQuiz(@PathVariable String quizId, @RequestAttribute String userId)
    {
    	return userService.getQuiz(quizId,userId);
    }
    
    
    @GetMapping("creations/{quizId}/questions")
    public ResponseEntity<?> getQuestions(@PathVariable("quizId") String quizId,@RequestAttribute("userId") String userId)
    {
    	return userService.getQuestions(quizId,userId);
    }
    
    @GetMapping("attempted")
    public ResponseEntity<?> getAttempted(@RequestAttribute String userId)
    {
    	return userService.getAttempted(userId);
    }
}

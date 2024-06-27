package com.quizapp.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizapp.models.Question;
import com.quizapp.repository.QuestionRepository;

@Service
public class QuestionService {

	private QuestionRepository repo;

	public QuestionService(QuestionRepository repo) {
		this.repo = repo;
	}

//	@Transactional
	public boolean addQuestions(List<Question> questions,String quizId)
	{
		try {
			System.out.println("Inside add questions quizId : " + quizId);
			for(Question q : questions)
			{
				
				q.setQuizId(quizId);
				System.out.println(q );
				Question saved = repo.save(q);
			}
			return true;
		}
		catch(Exception e)
		{
			System.out.println(e);
			return false;
		}
	}
	
	public ResponseEntity<?> getQuiz(String id)
	{
		Optional<List<Map<String, String>>> res = repo.findByQuizId(id);
		if(res.isEmpty() || res.get().isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return ResponseEntity.status(HttpStatus.FOUND).body(res.get());
		
	}
}

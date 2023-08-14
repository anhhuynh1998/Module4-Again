package com.example.quiz.service.Question;

import com.example.quiz.model.Question;
import com.example.quiz.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

public Page<Question> findAll(Pageable pageable){
    return questionRepository.findAll(pageable);
}
public Page<Question> findAllQuestionByQuiz(Long id,Pageable pageable){
return questionRepository.findByQuizQ_Id(id,pageable);
}
}

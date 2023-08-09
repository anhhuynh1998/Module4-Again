package com.example.quiz.Service.Answer;

import com.example.quiz.model.Answer;
import com.example.quiz.repository.AnswerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public List<Answer> findAllAnswer(Long id){
        return answerRepository.findByQuestionId(id);
    }

}

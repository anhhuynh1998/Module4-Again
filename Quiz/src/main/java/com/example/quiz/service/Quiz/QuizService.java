package com.example.quiz.service.Quiz;

import com.example.quiz.model.Quiz;
import com.example.quiz.model.UserQuiz;
import com.example.quiz.repository.QuizRepository;
import com.example.quiz.repository.UserQuizRepository;
import com.example.quiz.service.Quiz.request.UserSaveQuizRequest;
import com.example.quiz.ulti.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserQuizRepository userQuizRepository;

    public List<Quiz> findAllQuiz(){
        return quizRepository.findAll();
    }


    public void saveScore(UserSaveQuizRequest request){
        UserQuiz newScore  = AppUtils.mapper.map(request,UserQuiz.class);
        userQuizRepository.save(newScore);
    }

}

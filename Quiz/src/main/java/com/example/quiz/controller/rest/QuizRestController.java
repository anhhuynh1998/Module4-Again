package com.example.quiz.controller.rest;

import com.example.quiz.service.Quiz.QuizService;
import com.example.quiz.model.Quiz;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizRestController {

    private final QuizService quizService;

    @GetMapping
    public List<Quiz> getAllQuiz(){
        return quizService.findAllQuiz();
    }
}

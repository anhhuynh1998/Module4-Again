package com.example.quiz.controller;

import com.example.quiz.Service.Quiz.QuizService;
import com.example.quiz.repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("quiz")
@AllArgsConstructor
public class QuizController {

    private final QuizRepository quizRepository;

    @GetMapping
    public String showQuiz(){
        return "home";
    }

}

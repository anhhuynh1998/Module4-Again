package com.example.quiz.controller;

import com.example.quiz.repository.QuizRepository;
import com.example.quiz.service.Answer.AnswerService;
import com.example.quiz.service.Question.QuestionService;
import com.example.quiz.service.Quiz.QuizService;
import com.example.quiz.service.Quiz.request.UserSaveQuizRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("quiz")
@AllArgsConstructor
public class QuizController {
    private final QuizService quizService;
    private final AnswerService answerService;
    private final QuestionService questionService;

    @GetMapping
    public String showQuiz(){
        return "home";
    }

    @PostMapping("/save-score")
    public ResponseEntity<?> saveScore(@RequestBody UserSaveQuizRequest request){
            quizService.saveScore(request);
            return ResponseEntity.ok(request);
    }

}

package com.example.quiz.controller.rest;

import com.example.quiz.service.Question.QuestionService;
import com.example.quiz.model.Question;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
@AllArgsConstructor
public class QuestionRestController {
    private final QuestionService questionService;
    @GetMapping
    public Page<Question> findAllQuestion(@PageableDefault(size = 9) Pageable pageable){
        return questionService.findAll(pageable);
    }
    @GetMapping("{id}")
    public Page<Question> findAllQuestionByQuiz(@PathVariable Long id,@PageableDefault(size = 9) Pageable pageable){
        return questionService.findAllQuestionByQuiz(id,pageable);
    }
}

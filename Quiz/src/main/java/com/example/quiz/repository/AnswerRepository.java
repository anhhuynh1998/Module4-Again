package com.example.quiz.repository;

import com.example.quiz.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer , Long> {

    List<Answer> findByQuestionId(Long QuestionId);
}

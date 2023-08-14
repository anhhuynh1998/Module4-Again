package com.example.quiz.repository;

import com.example.quiz.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question , Long> {

    Page<Question> findByQuizQ_Id(Long QuizId, Pageable pageable);
}

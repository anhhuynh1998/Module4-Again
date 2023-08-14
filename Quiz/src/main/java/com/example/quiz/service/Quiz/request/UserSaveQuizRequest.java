package com.example.quiz.service.Quiz.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSaveQuizRequest {
    private String score;
    private String  quiz_id;
}

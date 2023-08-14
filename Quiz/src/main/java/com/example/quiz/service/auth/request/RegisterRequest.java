package com.example.quiz.service.auth.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {
    private String fullName;
    private String username;

    private String password;

    private String email;
}

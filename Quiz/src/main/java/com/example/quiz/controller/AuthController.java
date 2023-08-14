//package com.example.quiz.controller;
//
//import com.example.quiz.model.User;
//import com.example.quiz.service.auth.AuthService;
//import com.example.quiz.service.auth.request.RegisterRequest;
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//
//@Controller
//@AllArgsConstructor
//public class AuthController {
//    private final AuthService authService;
//
//    @GetMapping("/login")
//    public String showLogin() {
//        return "login";
//    }
//
//    @GetMapping("/register")
//    public String showRegister(Model model){
//        model.addAttribute("user",new User());
//        return "register";
//    }
//    @PostMapping("/register")
//    public String showRegister(@Valid @ModelAttribute("user") RegisterRequest request, BindingResult result,
//                               Model model) {
//        authService.checkUserNameAndEmail(request, result);
//        if (result.hasErrors()) {
//            return "register";
//        }
//        authService.register(request);
//        return "redirect:/register?success";
//    }
//
//}

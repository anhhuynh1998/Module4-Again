//package com.example.quiz.service.auth;
//
//import com.example.quiz.model.User;
//import com.example.quiz.model.eNum.Role;
//import com.example.quiz.repository.UserRepository;
//import com.example.quiz.service.auth.request.RegisterRequest;
//import com.example.quiz.ulti.AppUtils;
//import lombok.AllArgsConstructor;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.validation.BindingResult;
//import org.springframework.validation.FieldError;
//
//import java.util.ArrayList;
//@Service
//@AllArgsConstructor
//public class AuthService implements UserDetailsService {
//    private final UserRepository userRepository;
//
//    private final PasswordEncoder passwordEncoder;
//
//    public void register(RegisterRequest request){
//        var user = AppUtils.mapper.map(request, User.class);
//        user.setRole(Role.ROLE_USER);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//    }
//
//    public boolean checkUserNameAndEmail(RegisterRequest request, BindingResult result){
//        boolean check = false;
//        if(userRepository.existsByUsernameIgnoreCase(request.getUsername())){
//            FieldError error = new FieldError("user", "username", "Trùng username rồi bạn ei!!");
//            result.addError(error);
//            check = true;
//        }
//        if(userRepository.existsByEmailIgnoreCase(request.getEmail())){
//            FieldError error = new FieldError("user", "email", "Trùng email rồi bạn ei!!");
//            result.addError(error);
//            check = true;
//        }
//        return check;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(username,username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not Exist") );
//        var role = new ArrayList<SimpleGrantedAuthority>();
//        role.add(new SimpleGrantedAuthority(user.getRole().toString()));
//
//        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), role);
//    }
//
//}

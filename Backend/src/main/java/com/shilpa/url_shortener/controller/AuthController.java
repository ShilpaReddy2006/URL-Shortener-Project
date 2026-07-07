package com.shilpa.url_shortener.controller;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.shilpa.url_shortener.config.JwtUtil;
import com.shilpa.url_shortener.entity.UserEntity;
import com.shilpa.url_shortener.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repository;
    private final  JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder ;

    public AuthController(UserRepository repository, JwtUtil jwtUtil,BCryptPasswordEncoder encoder) {
        this.repository=repository;
        this.jwtUtil = jwtUtil;
        this.encoder=encoder;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserEntity user) {

        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserEntity user) {

        UserEntity dbUser = repository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (encoder.matches(user.getPassword(), dbUser.getPassword())) {
            return jwtUtil.generateToken(user.getUsername());
        }

        return "Invalid credentials";
    }
}


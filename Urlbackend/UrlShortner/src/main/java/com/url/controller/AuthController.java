package com.url.controller;


import com.url.dtos.LoginRequest;
import com.url.dtos.RegisterUser;
import com.url.model.User;


import com.url.repository.UserRepository;
import com.url.security.jwt.AuthenticationResponse;
import com.url.service.userServcie.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin("${frontend.url}")
public class AuthController {


    private UserServiceImpl userService;


    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUser registerUser){

        User user=new User();
        user.setUserName(registerUser.getUserName());
        user.setEmail(registerUser.getEmail());
        user.setRole("ROLE_USER");
        user.setPassword(registerUser.getPassword());

        User savedUser = userService.registerUser(user);
        if(savedUser==null){
            return ResponseEntity.internalServerError().body("Username is already there .Please change it.");
        }
        return new ResponseEntity<>("User registered", HttpStatus.CREATED);

    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        try{
            AuthenticationResponse authenticationResponse=userService.authenticateUser(loginRequest);
            return new ResponseEntity<>(authenticationResponse,HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

package com.url.service.userServcie;

import com.url.dtos.LoginRequest;
import com.url.model.User;
import com.url.security.jwt.AuthenticationResponse;

public interface UserService {
    public User registerUser(User user);
    public AuthenticationResponse authenticateUser(LoginRequest loginRequest);
    public User findByUserName(String userName);
}

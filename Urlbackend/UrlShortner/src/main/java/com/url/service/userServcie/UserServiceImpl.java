package com.url.service.userServcie;

import com.url.dtos.LoginRequest;
import com.url.model.User;
import com.url.repository.UserRepository;
import com.url.security.jwt.AuthenticationResponse;
import com.url.security.jwt.JwtUtils;
import com.url.service.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    @Override
    public User registerUser(User user) {
        if(userRepository.findByUserName(user.getUserName())!=null){
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public AuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserName()
                        ,loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails= (UserDetailsImpl) authentication.getPrincipal();
        String jwt= jwtUtils.generateToken(userDetails);

        return new AuthenticationResponse(jwt);
    }

    @Override
    public User findByUserName(String userName) {
       return userRepository.findByUserName(userName);
    }
}

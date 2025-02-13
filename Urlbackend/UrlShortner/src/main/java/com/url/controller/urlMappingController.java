package com.url.controller;

import com.url.dtos.UrlMappingDto;
import com.url.model.UrlMapping;
import com.url.model.User;
import com.url.service.urlService.UrlServcie;
import com.url.service.userServcie.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/url")
@AllArgsConstructor
@CrossOrigin("${frontend.url}")
public class urlMappingController {

    private UserService userService;
    private UrlServcie urlServcie;

    @PostMapping("/shortUrl")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDto> generateShortUrl(@RequestBody Map<String,String> request
                                                          , Principal principal){
        String originalUrl= request.get("originalUrl");
        User user = userService.findByUserName(principal.getName());
        UrlMappingDto urlMappingDto=urlServcie.generateShortUrl(originalUrl,user);
        return new ResponseEntity<>(urlMappingDto,HttpStatus.OK);

    }

    @GetMapping("/myUrls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDto>> getUrls(Principal principal){
        User user = userService.findByUserName(principal.getName());
        List<UrlMappingDto> urlList =urlServcie.getUserUrls(user);
        return new ResponseEntity<>(urlList,HttpStatus.OK);

    }

    @DeleteMapping("/deleteUrl/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUrl(@PathVariable Long id){
        return new ResponseEntity<>(urlServcie.deleteShortUrl(id),HttpStatus.OK);

    }




}

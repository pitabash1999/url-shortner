package com.url.controller;

import com.url.model.UrlMapping;
import com.url.service.urlService.UrlServcie;
import com.url.service.urlService.UrlServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin("${frontend.url}")
public class RedirectionController {

    private UrlServcie urlService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl){

        UrlMapping urlMapping = urlService.getOriginalUrl(shortUrl);
        if(urlMapping!=null){
            HttpHeaders headers=new HttpHeaders();
            headers.add("Location",urlMapping.getOriginalUrl());
            return ResponseEntity.status(302).headers(headers).build();
        }
        else return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
}

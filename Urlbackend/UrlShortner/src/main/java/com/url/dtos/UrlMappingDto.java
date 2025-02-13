package com.url.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UrlMappingDto {

    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDate creationTime;
    private String userName;
}

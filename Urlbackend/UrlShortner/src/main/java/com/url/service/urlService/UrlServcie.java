package com.url.service.urlService;

import com.url.dtos.UrlMappingDto;
import com.url.model.UrlMapping;
import com.url.model.User;

import java.util.List;

public interface UrlServcie {

    public UrlMappingDto generateShortUrl(String originalUrl, User user);
    public List<UrlMappingDto> getUserUrls(User user);

    public UrlMapping getOriginalUrl(String shortUrl);

    public boolean deleteShortUrl(Long id);


}

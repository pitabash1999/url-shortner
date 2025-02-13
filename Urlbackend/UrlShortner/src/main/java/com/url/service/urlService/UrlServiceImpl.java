package com.url.service.urlService;

import com.url.dtos.UrlMappingDto;
import com.url.model.UrlMapping;
import com.url.model.User;
import com.url.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class UrlServiceImpl implements UrlServcie{

    private UrlMappingRepository urlMappingRepository;

    @Override
    public UrlMappingDto generateShortUrl(String originalUrl, User user) {
        try{
            String shortUrl=createUrl();
            UrlMapping urlMapping=new UrlMapping();
            urlMapping.setOriginalUrl(originalUrl);
            urlMapping.setShortUrl(shortUrl);
            urlMapping.setUser(user);
            urlMapping.setCreationDate(LocalDate.now());
            urlMappingRepository.save(urlMapping);
            return convertToDto(urlMapping);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UrlMappingDto> getUserUrls(User user) {
        List<UrlMapping> urls = urlMappingRepository.findByUser(user);
        List<UrlMappingDto> urlsDto=new ArrayList<>();
        for (UrlMapping urlMapping:urls){
            urlsDto.add(this.convertToDto(urlMapping));
        }
        return urlsDto;
    }

    @Override
    public UrlMapping getOriginalUrl(String shortUrl) {

        return urlMappingRepository.findByShortUrl(shortUrl);
    }

   @Override
    public boolean deleteShortUrl(Long id) {
        if(urlMappingRepository.findById(id).isPresent()){
            urlMappingRepository.deleteById(id);
            return true;
        }

        return false;
    }

    private String createUrl() {
        StringBuilder shortUrl=new StringBuilder();
        String base="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        Random random=new Random();
        for(int i=0;i<10;i++){
            shortUrl.append(base.charAt(random.nextInt(base.length())));
        }

        return shortUrl.toString();
    }

    public UrlMappingDto convertToDto(UrlMapping urlMapping){
        UrlMappingDto urlMappingDto = new UrlMappingDto();
        urlMappingDto.setId(urlMapping.getId());
        urlMappingDto.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDto.setShortUrl(urlMapping.getShortUrl());
        urlMappingDto.setUserName(urlMapping.getUser().getUserName());
        urlMappingDto.setCreationTime(urlMapping.getCreationDate());
        return urlMappingDto;
    }
}

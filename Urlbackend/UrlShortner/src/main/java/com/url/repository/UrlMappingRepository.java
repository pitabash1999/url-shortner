package com.url.repository;

import com.url.dtos.UrlMappingDto;
import com.url.model.UrlMapping;
import com.url.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {

    public UrlMapping findByShortUrl(String shortUrl);
    public List<UrlMapping> findByUser(User user);
}

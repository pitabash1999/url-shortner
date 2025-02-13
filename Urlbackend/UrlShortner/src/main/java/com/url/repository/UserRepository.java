package com.url.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.url.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByUserName(String userName);

}

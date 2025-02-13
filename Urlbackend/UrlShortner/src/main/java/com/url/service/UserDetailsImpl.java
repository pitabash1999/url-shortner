package com.url.service;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.url.model.User;

//creating a user in context of spring security 

public class UserDetailsImpl implements UserDetails{
	
	/**
	 * 
	 */
	@Serial
	private static final long serialVersionUID = 1L;
	private final User user;
	
	public UserDetailsImpl(User user) {
		this.user=user;
	}
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		GrantedAuthority authorities=new SimpleGrantedAuthority(user.getRole());
		return Collections.singleton(authorities);
	}

	@Override
	public String getPassword() {
		
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		
		return user.getUserName();
	}

}

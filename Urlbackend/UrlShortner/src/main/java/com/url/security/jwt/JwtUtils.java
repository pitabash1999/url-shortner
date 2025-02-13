package com.url.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import com.url.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {
	
	@Value("${jwt.secret}")  //Getting from application properties
	private String secretKey;
	
	@Value("${jwt.expiration}") //Getting from application properties
	private int jwtExpirationMs;
	
	//Getting token from request header (Authorization -> Bearer<TOKEN>)
	public String getJwtFromHeader(HttpServletRequest request) {
		String bearerToken= request.getHeader("Authorization");
		if(bearerToken!=null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
	
	//Generating a token
	public String generateToken(UserDetailsImpl userDetails) { // Use UserDetails or UserDetailsImpl consistently
		String userName = userDetails.getUsername();
		String role = userDetails.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		return Jwts.builder()
				.subject(userName)
				.claim("roles", role)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
				.signWith(key())
				.compact();
	}
	
	public String getUserNameFromJwt(String token) {
		
		return Jwts.parser()
				.verifyWith((SecretKey)key())
				.build().parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}
	
	
	//Method to create secret key which return an object of Key
	public Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}
	
	
	//validating token
	public boolean validateToken(String authToken) {
		try {
			Jwts.parser()
			.verifyWith((SecretKey) key())
			.build().parseSignedClaims(authToken);
			return true;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

}

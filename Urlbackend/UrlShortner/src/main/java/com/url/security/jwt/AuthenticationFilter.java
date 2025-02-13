package com.url.security.jwt;

import java.io.IOException;

import com.url.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends OncePerRequestFilter{
 
	@Autowired
	private JwtUtils jwtUtilsProvider; 
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		try {
			//Getting JWT from request header-> getting userName from JWT
			//-> getting userDetails using that userName 
			//-> if valid user then load user details and set security context
			
			String jwt=jwtUtilsProvider.getJwtFromHeader(request);
			if(jwt!=null && jwtUtilsProvider.validateToken(jwt)) {
				String userName=jwtUtilsProvider.getUserNameFromJwt(jwt);
				UserDetails userDetails=userDetailsService.loadUserByUsername(userName);
				if(userDetails!=null) {
					UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
			
			filterChain.doFilter(request, response);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}

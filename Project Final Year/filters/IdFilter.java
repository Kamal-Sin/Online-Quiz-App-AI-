package com.quizapp.filters;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import com.quizapp.services.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class IdFilter extends OncePerRequestFilter {

    @Autowired
    UserService userService;
    
    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    	
    	if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "pid, Content-Type, Accept, X-Requested-With, remember-me");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }
    	String url = request.getRequestURI();
        
        if(url.equals("/user/login") || url.equals("/user/register"))
        {
        	filterChain.doFilter(request, response);
        	return ;
        }
        
        
        String encodedUid = request.getHeader("pid");
        if (encodedUid == null || encodedUid.isEmpty() || encodedUid.equals("undefined") ){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        byte[] dUid = Base64.getDecoder().decode(encodedUid);
        String uid = new String(dUid);
        if(userService.checkUser(uid) == false)
        {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        	return;
        }
        request.setAttribute("userId", uid);
        filterChain.doFilter(request, response);
    }

}

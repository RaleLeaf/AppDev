package com.basick.app.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
       try {
           FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
           request.setAttribute("firebaseUser", decodedToken);
       } catch (FirebaseAuthException e) {
           response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Firebase ID token");
           return;
       }

        filterChain.doFilter(request, response);
    }
}


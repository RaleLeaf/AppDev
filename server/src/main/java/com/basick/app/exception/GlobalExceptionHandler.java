package com.basick.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.basick.app.dto.ApiResponse;
import com.google.firebase.auth.FirebaseAuthException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FirebaseAuthException.class)
    public ResponseEntity<ApiResponse<Object>> handleFirebaseAuthException(
            FirebaseAuthException ex, WebRequest request) {
        
        String message;
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        String errorCode = ex.getErrorCode() != null ? ex.getErrorCode().toString() : "UNKNOWN";
        
        switch (errorCode) {
            case "ID_TOKEN_EXPIRED":
                message = "Token has expired";
                break;
            case "ID_TOKEN_REVOKED":
                message = "Token has been revoked";
                break;
            case "USER_NOT_FOUND":
                message = "User not found";
                status = HttpStatus.NOT_FOUND;
                break;
            default:
                message = "Invalid authentication token";
        }
        
        return ResponseEntity.status(status)
                .body(ApiResponse.error(message, errorCode));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("Invalid request", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGlobalException(
            Exception ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Internal server error", ex.getMessage()));
    }
}

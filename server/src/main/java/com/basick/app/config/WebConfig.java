package com.basick.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    // Commented out to avoid conflicts with CorsFilter
    // The CorsFilter handles CORS configuration with higher precedence
    /*
    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        logger.info("Configuring CORS settings...");
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        logger.info("CORS configuration completed");
    }
    */
}


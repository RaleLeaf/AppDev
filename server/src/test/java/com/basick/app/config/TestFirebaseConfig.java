package com.basick.app.config;

import static org.mockito.Mockito.mock;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import com.google.cloud.firestore.Firestore;

/**
 * Test configuration for Firebase services using mocks
 */
@TestConfiguration
@Profile("test")
public class TestFirebaseConfig {

    @Bean
    @Primary
    public Firestore testFirestore() {
        // Return a mock Firestore for testing
        return mock(Firestore.class);
    }
}

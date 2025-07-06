package com.basick.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import com.basick.app.config.TestFirebaseConfig;

@SpringBootTest
@ActiveProfiles("test")
@ContextConfiguration(classes = {BaSickApplication.class, TestFirebaseConfig.class})
class BaSickApplicationTests {

	@Test
	void contextLoads() {
	}

}

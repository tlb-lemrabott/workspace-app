package com.example.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
@Configuration
public class FirebaseConfig {
    @Bean
    public Firestore getFirestore() throws Exception {
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("firebase-config.json");

        if (serviceAccount == null) {
            throw new IllegalStateException("Firebase config file not found in resources folder. Please ensure 'firebase-config.json' is located in src/main/resources.");
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        return FirestoreClient.getFirestore();
    }
}

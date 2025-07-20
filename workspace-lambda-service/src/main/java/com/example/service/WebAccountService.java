package com.example.service;

import com.example.models.WebAccount;
import com.google.cloud.firestore.*;
import com.google.api.core.ApiFuture;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class WebAccountService {
    private static final Logger logger = LoggerFactory.getLogger(WebAccountService.class);
    private final Firestore firestore;
    public WebAccountService(Firestore firestore) {
        this.firestore = firestore;
    }

    private static final String COLLECTION_NAME = "web-accounts";

    public String SaveAccount(WebAccount account) throws ExecutionException, InterruptedException {
        if (account.getAccountId() == null){
            account.setAccountId(UUID.randomUUID().toString());
        }
        ApiFuture<WriteResult> future = firestore.collection(COLLECTION_NAME)
                .document(account.getAccountId())
                .set(account);

        return future.get().getUpdateTime().toString();
    }

    public WebAccount getAccountById(String accountId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(accountId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return document.toObject(WebAccount.class);
        } else {
            return null;
        }
    }

    public List<WebAccount> searchAccountsByName(String keyword) throws ExecutionException, InterruptedException {
        List<WebAccount> allAccounts = getAllAccounts();
        String loweredKeyword = keyword.toLowerCase();
        List<WebAccount> filteredAccounts = new ArrayList<>();

        for (WebAccount account : allAccounts) {
            if (account.getCompanyName() != null && account.getCompanyName().toLowerCase().contains(loweredKeyword)) {
                filteredAccounts.add(account);
            }
        }

        return filteredAccounts;
    }

    public List<WebAccount> getAllAccounts() throws ExecutionException, InterruptedException {
        logger.info("Fetching all accounts from collection: {}", COLLECTION_NAME);
        long startTime = System.currentTimeMillis();
        List<WebAccount> accounts = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = firestore
                .collection(COLLECTION_NAME)
                .get();
        QuerySnapshot querySnapshot = future.get();
        for (DocumentSnapshot document : querySnapshot.getDocuments()) {
            WebAccount account = document.toObject(WebAccount.class);
            if (account != null) {
                accounts.add(account);
                logger.debug("Loaded account: {}", account);
            }
        }
        logger.info("Fetched {} accounts in {} ms", accounts.size(), System.currentTimeMillis() - startTime);
        return accounts;
    }

    public List<WebAccount> getAccountsPaginated(String startAfterId, int pageSize) throws Exception {
        CollectionReference colRef = firestore.collection(COLLECTION_NAME);
        Query query = colRef.orderBy("accountId").limit(pageSize);

        if (startAfterId != null && !startAfterId.isEmpty()) {
            DocumentSnapshot lastDoc = firestore.collection(COLLECTION_NAME).document(startAfterId).get().get();
            query = query.startAfter(lastDoc);
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<WebAccount> accounts = new ArrayList<>();
        for (DocumentSnapshot doc : future.get().getDocuments()) {
            WebAccount acc = doc.toObject(WebAccount.class);
            if (acc != null) accounts.add(acc);
        }

        return accounts;
    }

    public long countTotalAccounts() throws Exception {
        ApiFuture<QuerySnapshot> future = firestore
                .collection(COLLECTION_NAME)
                .get();
        QuerySnapshot querySnapshot = future.get();
        return querySnapshot.getDocuments().size();
    }

    public String generateRandomPassword(int length) {
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(charset.length());
            password.append(charset.charAt(index));
        }
        return password.toString();
    }
}

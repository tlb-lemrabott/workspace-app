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
import java.util.Date;
import java.util.stream.Collectors;

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
        
        // Ensure companyNameLower is set for search functionality
        if (account.getCompanyName() != null && account.getCompanyNameLower() == null) {
            account.setCompanyNameLower(account.getCompanyName().toLowerCase());
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

    public List<WebAccount> advancedSearchAccounts(
            String q,
            String resource,
            Date startDate,
            Date endDate,
            String sortBy,
            String sortOrder,
            int pageSize,
            String startAfterId
    ) throws Exception {
        CollectionReference colRef = firestore.collection(COLLECTION_NAME);
        Query query = colRef;

        // Filtering
        if (resource != null && !resource.isEmpty()) {
            query = query.whereEqualTo("resourceLink", resource);
        }
        if (startDate != null) {
            query = query.whereGreaterThanOrEqualTo("creation_date", startDate);
        }
        if (endDate != null) {
            query = query.whereLessThanOrEqualTo("creation_date", endDate);
        }

        // Sorting
        if (sortBy != null && !sortBy.isEmpty()) {
            Query.Direction direction = ("desc".equalsIgnoreCase(sortOrder)) ? Query.Direction.DESCENDING : Query.Direction.ASCENDING;
            query = query.orderBy(sortBy, direction);
        } else {
            query = query.orderBy("accountId", Query.Direction.ASCENDING);
        }

        // Pagination
        if (startAfterId != null && !startAfterId.isEmpty()) {
            DocumentSnapshot lastDoc = firestore.collection(COLLECTION_NAME).document(startAfterId).get().get();
            query = query.startAfter(lastDoc);
        }
        if (pageSize > 0) {
            query = query.limit(pageSize);
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<WebAccount> accounts = new ArrayList<>();
        for (DocumentSnapshot doc : future.get().getDocuments()) {
            WebAccount acc = doc.toObject(WebAccount.class);
            if (acc != null) accounts.add(acc);
        }

        // Free-text search (q) on companyName only
        if (q != null && !q.isEmpty()) {
            String lowered = q.toLowerCase();
            accounts.removeIf(acc ->
                acc.getCompanyName() == null || !acc.getCompanyName().toLowerCase().contains(lowered)
            );
        }
        return accounts;
    }

    public static class SearchResult {
        public List<WebAccount> accounts;
        public long totalAccounts;
        public SearchResult(List<WebAccount> accounts, long totalAccounts) {
            this.accounts = accounts;
            this.totalAccounts = totalAccounts;
        }
    }

    public SearchResult advancedSearchAccountsWithCount(
            String q,
            String resource,
            Date startDate,
            Date endDate,
            String sortBy,
            String sortOrder,
            int pageSize,
            String startAfterId
    ) throws Exception {
        // For simplicity and reliability, we'll get all accounts and filter in memory
        // This approach works well for smaller datasets and provides better search capabilities
        List<WebAccount> allAccounts = getAllAccounts();
        
        // Apply search filter if provided
        if (q != null && !q.isEmpty()) {
            String searchTerm = q.toLowerCase();
            allAccounts = allAccounts.stream()
                .filter(acc -> acc.getCompanyName() != null && 
                              acc.getCompanyName().toLowerCase().contains(searchTerm))
                .collect(Collectors.toList());
        }
        
        // Always sort by creation_date in descending order (newest first)
        allAccounts.sort((a, b) -> {
            Date dateA = a.getCreation_date();
            Date dateB = b.getCreation_date();
            
            if (dateA == null && dateB == null) return 0;
            if (dateA == null) return 1; // null dates go to the end
            if (dateB == null) return -1;
            
            // Descending order (newest first)
            return dateB.compareTo(dateA);
        });
        
        // Calculate total count before pagination
        long totalAccounts = allAccounts.size();
        
        // Apply pagination
        int startIndex = 0;
        if (startAfterId != null && !startAfterId.isEmpty()) {
            for (int i = 0; i < allAccounts.size(); i++) {
                if (startAfterId.equals(allAccounts.get(i).getAccountId())) {
                    startIndex = i + 1;
                    break;
                }
            }
        }
        
        int endIndex = Math.min(startIndex + pageSize, allAccounts.size());
        List<WebAccount> paginatedAccounts = allAccounts.subList(startIndex, endIndex);
        
        return new SearchResult(paginatedAccounts, totalAccounts);
    }
    
    /**
     * Helper method to get field value by name
     */
    private Object getFieldValue(WebAccount account, String fieldName) {
        switch (fieldName.toLowerCase()) {
            case "companyname":
                return account.getCompanyName();
            case "email":
                return account.getEmail();
            case "username":
                return account.getUsername();
            case "creation_date":
                return account.getCreation_date();
            case "updated_date":
                return account.getUpdated_date();
            case "accountid":
                return account.getAccountId();
            default:
                return null;
        }
    }

    /**
     * Migrate existing accounts to include companyNameLower field for search
     * This should be run once to update existing data
     */
    public void migrateExistingAccountsForSearch() throws Exception {
        logger.info("Starting migration of existing accounts for search functionality...");
        List<WebAccount> allAccounts = getAllAccounts();
        int updatedCount = 0;
        
        for (WebAccount account : allAccounts) {
            if (account.getCompanyName() != null && account.getCompanyNameLower() == null) {
                account.setCompanyNameLower(account.getCompanyName().toLowerCase());
                SaveAccount(account);
                updatedCount++;
                logger.debug("Updated account: {}", account.getAccountId());
            }
        }
        
        logger.info("Migration completed. Updated {} accounts.", updatedCount);
    }
}

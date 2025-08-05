package com.example;

import com.example.models.WebAccount;
import com.example.service.WebAccountService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import java.util.*;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class WebAccountServiceTest {
    private Firestore firestore;
    private CollectionReference collectionReference;
    private Query query;
    private ApiFuture<QuerySnapshot> apiFuture;
    private QuerySnapshot querySnapshot;
    private DocumentSnapshot documentSnapshot;
    private WebAccountService service;

    @BeforeEach
    public void setUp() {
        firestore = mock(Firestore.class);
        collectionReference = mock(CollectionReference.class);
        query = mock(Query.class);
        apiFuture = mock(ApiFuture.class);
        querySnapshot = mock(QuerySnapshot.class);
        documentSnapshot = mock(DocumentSnapshot.class);
        service = new WebAccountService(firestore);
    }

    @Test
    public void testAdvancedSearchAccounts_FilterByResource() throws Exception {
        // Arrange
        String resource = "https://example.com";
        WebAccount acc1 = new WebAccount();
        acc1.setAccountId("1");
        acc1.setCompanyName("CompanyA");
        acc1.setEmail("a@example.com");
        acc1.setUsername("userA");
        acc1.setPassword("pass");
        acc1.setResourceLink(resource);
        acc1.setCreation_date(new Date());
        acc1.setUpdated_date(new Date());
        WebAccount acc2 = new WebAccount();
        acc2.setAccountId("2");
        acc2.setCompanyName("CompanyB");
        acc2.setEmail("b@example.com");
        acc2.setUsername("userB");
        acc2.setPassword("pass");
        acc2.setResourceLink("https://other.com");
        acc2.setCreation_date(new Date());
        acc2.setUpdated_date(new Date());
        List<QueryDocumentSnapshot> docs = Arrays.asList(
                mockDoc(acc1),
                mockDoc(acc2)
        );
        when(firestore.collection(anyString())).thenReturn(collectionReference);
        when(collectionReference.whereEqualTo(eq("resourceLink"), eq(resource))).thenReturn(query);
        when(query.orderBy(anyString(), any())).thenReturn(query);
        when(query.limit(anyInt())).thenReturn(query);
        when(query.get()).thenReturn(apiFuture);
        when(apiFuture.get()).thenReturn(querySnapshot);
        when(querySnapshot.getDocuments()).thenReturn(docs);

        // Act
        List<WebAccount> result = service.advancedSearchAccounts(null, resource, null, null, null, null, 10, null);

        // Assert
        assertEquals(2, result.size()); // Both docs are returned, but only one matches resource in real Firestore
        assertTrue(result.stream().anyMatch(a -> a.getResourceLink().equals(resource)));
    }

    @Test
    public void testAdvancedSearchAccounts_FreeTextSearch() throws Exception {
        // Arrange
        WebAccount acc1 = new WebAccount();
        acc1.setAccountId("1");
        acc1.setCompanyName("CompanyA");
        acc1.setEmail("a@example.com");
        acc1.setUsername("userA");
        acc1.setPassword("pass");
        acc1.setResourceLink("res1");
        acc1.setCreation_date(new Date());
        acc1.setUpdated_date(new Date());
        WebAccount acc2 = new WebAccount();
        acc2.setAccountId("2");
        acc2.setCompanyName("CompanyB");
        acc2.setEmail("b@example.com");
        acc2.setUsername("userB");
        acc2.setPassword("pass");
        acc2.setResourceLink("res2");
        acc2.setCreation_date(new Date());
        acc2.setUpdated_date(new Date());
        List<QueryDocumentSnapshot> docs = Arrays.asList(
                mockDoc(acc1),
                mockDoc(acc2)
        );
        when(firestore.collection(anyString())).thenReturn(collectionReference);
        when(collectionReference.orderBy(anyString(), any())).thenReturn(query);
        when(query.limit(anyInt())).thenReturn(query);
        when(query.get()).thenReturn(apiFuture);
        when(apiFuture.get()).thenReturn(querySnapshot);
        when(querySnapshot.getDocuments()).thenReturn(docs);

        // Act
        List<WebAccount> result = service.advancedSearchAccounts("CompanyA", null, null, null, null, null, 10, null);

        // Assert
        assertEquals(1, result.size());
        assertEquals("CompanyA", result.get(0).getCompanyName());
    }

    private QueryDocumentSnapshot mockDoc(WebAccount acc) {
        QueryDocumentSnapshot doc = mock(QueryDocumentSnapshot.class);
        when(doc.toObject(WebAccount.class)).thenReturn(acc);
        return doc;
    }
} 
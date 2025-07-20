package com.example.controller;

import com.example.models.WebAccount;
import com.example.service.WebAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@EnableWebMvc
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class WebAccountController {
    private final WebAccountService service;
    private final String DEFAULT_PAGE_SIZE = "10";
    public WebAccountController(WebAccountService service) {
        this.service = service;
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseEntity<Map<String, String>> createAccount(@RequestBody WebAccount account) throws ExecutionException, InterruptedException {
        if (account.getCreation_date() == null) {
            account.setCreation_date(new Date());
        }
        account.setUpdated_date(new Date());
        if (account.getPassword() == null || account.getPassword().isEmpty()) {
            account.setPassword(service.generateRandomPassword(12));
        }
        String updateTime = service.SaveAccount(account);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("updateTime", updateTime);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{accountId}", produces = "application/json")
    public ResponseEntity<WebAccount> getAccountById(@PathVariable("accountId") String accountId) throws ExecutionException, InterruptedException {
        WebAccount foundAccount = service.getAccountById(accountId);
        if (foundAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foundAccount, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/search", produces = "application/json")
    public ResponseEntity<List<WebAccount>> searchAccountsByName(@RequestParam("q") String keyword) throws ExecutionException, InterruptedException {
        List<WebAccount> results = service.searchAccountsByName(keyword);
        if (results.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<Map<String, Object>> getAllAccounts(
            @RequestParam(required = false) String startAfterId,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int pageSize)
            throws Exception {
        System.out.println("Starting Firestore getAllAccounts()");
        long start = System.currentTimeMillis();
        List<WebAccount> accounts = service.getAccountsPaginated(startAfterId, pageSize);
        long totalAccounts = service.countTotalAccounts();
        System.out.println("Finished in " + (System.currentTimeMillis() - start) + "ms");
        if (accounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("accounts", accounts);
            response.put("totalAccounts", totalAccounts);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }


    @GetMapping("/ping")
    public String ping() {
        return "pong to lemrabott";
    }

}

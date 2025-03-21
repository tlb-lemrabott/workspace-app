package com.lemrabott.workspace.controllers;

import com.lemrabott.workspace.models.Account;
import com.lemrabott.workspace.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping()
    public ResponseEntity<?> addNewAccount(@RequestBody Account account) {
        try {
            Account newAccount = accountService.addOne(account);
            return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating account: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/{accountId}")
    public ResponseEntity<?> updateAccount(@PathVariable UUID accountId, @RequestBody Account account) {
        try {
            Account updatedAccount = accountService.updateOne(accountId, account);
            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating account: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{accountId}")
    public ResponseEntity<?> getAccountById(@PathVariable UUID accountId) {
        try {
            Account account = accountService.getOne(accountId);
            return new ResponseEntity<>(account, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving account: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAccounts() {
        try {
            List<Account> accounts = accountService.getAll();
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving accounts: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{accountId}")
    public ResponseEntity<?> deleteAccountById(@PathVariable UUID accountId) {
        try {
            accountService.deleteOne(accountId);
            return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting account: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
package com.lemrabott.workspace.services;

import com.lemrabott.workspace.models.Account;
import com.lemrabott.workspace.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;
    public Account addOne(Account account){
        account.setCreation_date(LocalDate.now());
        return this.accountRepository.save(account);
    }
    public Account updateOne(UUID accountId, Account account){
        Account foundOne = this.accountRepository.getById(accountId);
        foundOne.setCompanyName(account.getCompanyName());
        foundOne.setEmail(account.getEmail());
        foundOne.setUsername(account.getUsername());
        foundOne.setResourceLink(account.getResourceLink());
        foundOne.setUpdated_date(LocalDate.now());
        return foundOne;
    }
    public Account getOne(UUID accountId){
        return this.accountRepository.getById(accountId);
    }
    public List<Account> getAll(){
        return this.accountRepository.findAll();
    }
    public Account deleteOne(UUID accountId){
        return this.accountRepository.getById(accountId);
    }




}

package com.example.comicop.service;

import com.example.comicop.dto.AccountDto;

import java.util.List;

public interface AccountService {
    AccountDto createAccount(AccountDto accountDto);
    AccountDto findAccountById(Long accountId);
    List<AccountDto> findAllAccounts();
    AccountDto updateAccount(Long accountID, AccountDto updatedAccountDto);
    void deleteAccount(Long accountId);




}
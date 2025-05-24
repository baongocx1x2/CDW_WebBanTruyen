package com.example.comicop.controller.api;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private AccountService accountService;


    //add REST API
    @PostMapping
    public ResponseEntity<AccountDto> createAccount(@RequestBody AccountDto accountDto) {
        AccountDto savedAccountDto = accountService.createAccount(accountDto);
        return new ResponseEntity<>(savedAccountDto, HttpStatus.CREATED);
    }

    //get REST API
    @GetMapping("{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable("id") Long accountId) {
        AccountDto accountDto = accountService.findAccountById(accountId);
        return ResponseEntity.ok(accountDto);

    }

    //getAll REST API
    @GetMapping
    public ResponseEntity<List<AccountDto>> getAllAccounts() {
        List<AccountDto> accountDtos = accountService.findAllAccounts();
        return ResponseEntity.ok(accountDtos);
    }

    ///update REST API
    @PutMapping("{id}")
    public ResponseEntity<AccountDto> updateAccount(@PathVariable("id") Long accountId,@RequestBody AccountDto updatedAccountDto) {
        AccountDto accountDto = accountService.updateAccount(accountId, updatedAccountDto);
        return ResponseEntity.ok(accountDto);
    }

    //delete REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable("id") Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok("Account deleted successfullly!");
    }

}
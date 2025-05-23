package com.example.comicop.controller;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@AllArgsConstructor
@RestController
@RequestMapping("api/accounts")
public class AccountController {

    private AccountService accountService;


    @PostMapping
    public ResponseEntity<AccountDto> createAccount(@RequestBody AccountDto accountDto) {
            AccountDto savedAccountDto = accountService.createAccount(accountDto);
            return new ResponseEntity<>(savedAccountDto, HttpStatus.CREATED);
    }



}

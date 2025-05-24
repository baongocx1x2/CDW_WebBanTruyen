package com.example.comicop.mapper;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.entity.Account;




public class AccountMapper {



    public static AccountDto accountToAccountDto(Account account) {
        return new AccountDto(
                account.getUserID(),
                account.getUserName(),
                account.getPassword(),
                account.getEmail(),
                account.getPhone(),
                account.getFirstName(),
                account.getLastName(),
                account.getGender(),
                account.getImg(),
                account.getRole(),
                account.isActivated())
                ;
    }

    public static Account accountDtoToAccount(AccountDto accountDto) {
        return new Account(
                accountDto.getUserID(),
                accountDto.getUserName(),
                accountDto.getPassword(),
                accountDto.getEmail(),
                accountDto.getPhone(),
                accountDto.getFirstName(),
                accountDto.getLastName(),
                accountDto.getGender(),
                accountDto.getImg(),
                accountDto.getRole(),
                accountDto.isActivated());
    }
}
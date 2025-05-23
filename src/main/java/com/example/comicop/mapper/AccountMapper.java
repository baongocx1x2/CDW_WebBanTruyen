package com.example.comicop.mapper;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.entity.Account;
import com.example.comicop.utils.PasswordEncoder;



public class AccountMapper {

    PasswordEncoder passwordEncoder;

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
                account.isActivated(),
                account.getRole())
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
                accountDto.isActivated(),
                accountDto.getRole());
    }
}

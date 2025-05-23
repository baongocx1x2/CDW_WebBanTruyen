package com.example.comicop.service.implement;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.entity.Account;
import com.example.comicop.mapper.AccountMapper;
import com.example.comicop.repository.AccountRepository;
import com.example.comicop.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;
    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.accountDtoToAccount(accountDto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.accountToAccountDto(savedAccount);
    }
}

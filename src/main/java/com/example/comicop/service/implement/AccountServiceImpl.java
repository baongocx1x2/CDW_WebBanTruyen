package com.example.comicop.service.implement;

import com.example.comicop.dto.AccountDto;
import com.example.comicop.entity.Account;
import com.example.comicop.exception.ResourceNotFoundException;
import com.example.comicop.mapper.AccountMapper;
import com.example.comicop.repository.AccountRepository;
import com.example.comicop.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


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

    @Override
    public AccountDto findAccountById(Long accountId) {
        Account account =  accountRepository.findById(accountId)
                .orElseThrow(()->new ResourceNotFoundException("account is not exist with given id" + accountId));


        return AccountMapper.accountToAccountDto(account);
    }

    @Override
    public List<AccountDto> findAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(AccountMapper::accountToAccountDto)
                .collect(Collectors.toList());
    }

    @Override
    public AccountDto updateAccount(Long accountId, AccountDto updatedAccountDto) {
        Account account = accountRepository.findById(accountId).orElseThrow(()-> new ResourceNotFoundException("account is not exist with given id" + accountId));

        //account.setPassword(updatedAccountDto.getPassword());
        account.setEmail(updatedAccountDto.getEmail());
//       account.setFirstName(updatedAccountDto.getFirstName());
//       account.setLastName(updatedAccountDto.getLastName());
//       account.setPhone(updatedAccountDto.getPhone());
//       account.setGender(updatedAccountDto.getGender());
//       account.setImg(updatedAccountDto.getImg());
        /*
        muốn update cái nào thì mở cái đó nha
         */
        Account updatedAccountObj = accountRepository.save(account);
        return AccountMapper.accountToAccountDto(updatedAccountObj);
    }

    @Override
    public void deleteAccount(Long accountId) {
        Account account = accountRepository.findById(accountId).
                orElseThrow(()-> new ResourceNotFoundException("account is not exist with given id" +
                        accountId));
        accountRepository.deleteById(accountId);

    }
}
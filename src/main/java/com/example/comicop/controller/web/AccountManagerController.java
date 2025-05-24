package com.example.comicop.controller.web;


import com.example.comicop.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AccountManagerController {

    @Autowired
    AccountService accountService;


    //display account list
    @GetMapping("/accounts")
    public String viewAccountMngPage(Model model) {
        model.addAttribute("title", "Manager Account");
        model.addAttribute("listAccounts", accountService.findAllAccounts());
        return "account-mng";
    }


}

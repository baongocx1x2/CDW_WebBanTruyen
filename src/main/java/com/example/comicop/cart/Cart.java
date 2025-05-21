package com.example.comicop.cart;

import com.example.comicop.account.Account;
import com.example.comicop.cartItem.CartItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Cart {
    //@Id
    private String cartID;

//    @ManyToOne
//    @JoinColumn(name = "accountID")
    private Account account;

    //@OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems;
}
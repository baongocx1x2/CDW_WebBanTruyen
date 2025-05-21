package com.example.comicop.cartItem;

import com.example.comicop.cart.Cart;
import com.example.comicop.product.Product;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class CartItem {
   // @Id
    private String cartItemID;

//    @ManyToOne
//    @JoinColumn(name = "productID")
    private Product product;

//    @ManyToOne
//    @JoinColumn(name = "cartID")
    private Cart cart;

    private int qty;
}

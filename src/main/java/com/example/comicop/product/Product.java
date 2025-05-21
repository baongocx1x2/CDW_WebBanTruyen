package com.example.comicop.product;

import com.example.comicop.cartItem.CartItem;
import com.example.comicop.category.Category;
import com.example.comicop.orderDetail.OrderDetail;
import com.example.comicop.review.Review;
import com.example.comicop.voucher.Voucher;

import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Product {
   // @Id
    private String productID;
    private String category;
    private String productName;
    private double price;
    private int qtyInStock;
    private String img;
    private String description;
    private boolean isAvailable;

//    @ManyToOne
//    @JoinColumn(name = "categoryID")
    private Category categoryRef;

    //@OneToMany(mappedBy = "product")
    private List<Review> reviews;

   // @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems;

//    @OneToMany(mappedBy = "product")
    private List<Voucher> vouchers;

 //   @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;
}
package com.example.comicop.order;

import com.example.comicop.account.Account;
import com.example.comicop.orderDetail.OrderDetail;
import com.example.comicop.review.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Order {
   // @Id
    private String orderID;

//    @ManyToOne
//    @JoinColumn(name = "orderDetailID")
    private OrderDetail orderDetail;

//    @ManyToOne
//    @JoinColumn(name = "accountID")
    private Account account;

  //  @OneToMany(mappedBy = "order")
    private List<Review> reviews;
}

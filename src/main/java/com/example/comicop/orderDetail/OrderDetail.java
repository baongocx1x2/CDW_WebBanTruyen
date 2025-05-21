package com.example.comicop.orderDetail;

import com.example.comicop.address.Address;
import com.example.comicop.order.Order;
import com.example.comicop.payment.Payment;
import com.example.comicop.product.Product;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class OrderDetail {
   // @Id
    private String orderDetailID;

//    @ManyToOne
//    @JoinColumn(name = "productID")
    private Product product;

    private int qty;
    private double tmpPrice;

   // @OneToOne(mappedBy = "orderDetail")
    private Order order;

//    @ManyToOne
//    @JoinColumn(name = "addressID")
    private Address address;

//    @ManyToOne
//    @JoinColumn(name = "paymentID")
    private Payment payment;
}

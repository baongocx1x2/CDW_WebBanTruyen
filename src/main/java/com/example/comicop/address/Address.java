package com.example.comicop.address;

import com.example.comicop.orderDetail.OrderDetail;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Address {
   // @Id
    private String addressID;

    private String province;
    private String city;
    private String addressDetail;

    //@OneToMany(mappedBy = "address")
    private List<OrderDetail> orderDetails;
}

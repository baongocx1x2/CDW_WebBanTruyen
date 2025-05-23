package com.example.comicop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String gender;
    private String img;
    private boolean isActivated;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

//    @OneToMany(mappedBy = "account")
//    private List<Order> orders;
//
//    @OneToMany(mappedBy = "account")
//    private List<Cart> carts;
}
package com.example.comicop.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userID;
    @Column(name = "username")
    private String userName;
    @Column(name = "password")
    private String password;
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "avatar_img")
    private String img;
    @Column(name = "role")
    private String role;
    @Column(name = "is_activated")
    private boolean activated = true;



//    @OneToMany(mappedBy = "account")
//    private List<Order> orders;
//
//    @OneToMany(mappedBy = "account")
//    private List<Cart> carts;
}
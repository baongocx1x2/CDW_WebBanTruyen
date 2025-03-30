package com.example.comicop.account;

import com.example.comicop.cart.Cart;
import com.example.comicop.order.Order;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    private String userID;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String gender;
    private String img;
    private String accountRole;
    private boolean isActivated;

    @OneToMany(mappedBy = "account")
    private List<Order> orders;

    @OneToMany(mappedBy = "account")
    private List<Cart> carts;
}

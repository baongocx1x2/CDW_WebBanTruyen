package com.comicop_v2.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    private double totalPrice;

    // Thêm sản phẩm vào giỏ hàng
    public void addItem(Product product, int quantity) {
        boolean productExists = false;
        for (CartItem item : items) {
            if (item.getProduct().equals(product)) {
                item.setQuantity(item.getQuantity() + quantity);
                productExists = true;
                break;
            }
        }

        if (!productExists) {
            CartItem newItem = new CartItem(product, quantity, this);
            items.add(newItem);
        }
        calculateTotalPrice();
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public void removeItem(Product product) {
        items.removeIf(item -> item.getProduct().equals(product));
        calculateTotalPrice();
    }

    // Tính tổng giá trị giỏ hàng
    public void calculateTotalPrice() {
        this.totalPrice = items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    public void clear() {
        items.clear();
        totalPrice = 0;
    }
}
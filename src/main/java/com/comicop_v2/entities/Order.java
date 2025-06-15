package com.comicop_v2.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    private LocalDateTime orderDate;
    private double totalAmount;
    private String shippingAddress;
    private String paymentMethod;
    private String status; // "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
    }

    // Thêm sản phẩm vào đơn hàng
    public void addItem(Product product, int quantity) {
        OrderItem item = new OrderItem(product, quantity, this);
        items.add(item);
        calculateTotalAmount();
    }

    // Tính tổng giá trị đơn hàng
    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }
}
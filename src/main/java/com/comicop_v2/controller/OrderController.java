package com.comicop_v2.controller;

import com.comicop_v2.entities.Order;
import com.comicop_v2.Service.OrderService;
import com.comicop_v2.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    /**
     * Tạo đơn hàng từ giỏ hàng hiện tại
     */
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestParam String shippingAddress,
            @RequestParam String paymentMethod) {
        User user = getAuthenticatedUser();
        Order newOrder = orderService.createOrderFromCart(user.getId(), shippingAddress, paymentMethod);
        return ResponseEntity.ok(newOrder);
    }

    /**
     * Lấy tất cả đơn hàng của user hiện tại
     */
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders() {
        User user = getAuthenticatedUser();
        List<Order> orders = orderService.getUserOrders(user.getId());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(
            @PathVariable Long orderId) {
        User user = getAuthenticatedUser();
        return orderService.getUserOrder(user.getId(), orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Hủy đơn hàng (chỉ khi ở trạng thái PENDING)
     */
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(
            @PathVariable Long orderId) {
        User user = getAuthenticatedUser();
        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Cập nhật trạng thái đơn hàng (dành cho admin)
     */
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String newStatus) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}
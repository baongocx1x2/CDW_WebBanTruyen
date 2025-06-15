package com.comicop_v2.controller;

import com.comicop_v2.entities.Cart;
import com.comicop_v2.entities.CartItem;
import com.comicop_v2.Service.CartService;
import com.comicop_v2.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    /**
     * Lấy giỏ hàng của user hiện tại
     */
    @GetMapping
    public ResponseEntity<Cart> getCart() {
        User user = getAuthenticatedUser();
        Cart cart = cartService.getOrCreateCart(user);
        return ResponseEntity.ok(cart);
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     */
    @PostMapping("/items")
    public ResponseEntity<Cart> addItemToCart(
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity) {
        User user = getAuthenticatedUser();
        Cart updatedCart = cartService.addItemToCart(user, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng
     */
    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> updateCartItem(
            @PathVariable Long productId,
            @RequestParam int quantity) {
        User user = getAuthenticatedUser();
        Cart updatedCart = cartService.updateItemQuantity(user, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Cart> removeItemFromCart(
            @PathVariable Long productId) {
        User user = getAuthenticatedUser();
        Cart updatedCart = cartService.removeItemFromCart(user, productId);
        return ResponseEntity.ok(updatedCart);
    }

    /**
     * Xóa toàn bộ giỏ hàng
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        User user = getAuthenticatedUser();
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }
}
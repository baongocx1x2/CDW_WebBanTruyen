package com.comicop_v2.Service;


import com.comicop_v2.entities.Cart;
import com.comicop_v2.entities.Order;
import com.comicop_v2.entities.User;
import com.comicop_v2.repositories.CartRepository;
import com.comicop_v2.repositories.OrderRepository;
import com.comicop_v2.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;


    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public Cart getUserCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        return cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Cart not found for user"));
    }

    @Transactional
    public void clearUserCart(Long userId) {
        Cart cart = getUserCart(userId);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }

    // ========== ORDER RELATED OPERATIONS ========== //

    public List<Order> getUserOrders(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UsernameNotFoundException("User not found with id: " + userId);
        }
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getUserOrder(Long userId, Long orderId) {
        return orderRepository.findByIdAndUserId(orderId, userId);
    }


}

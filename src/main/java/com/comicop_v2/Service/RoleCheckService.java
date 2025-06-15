package com.comicop_v2.Service;

import com.comicop_v2.entities.User;
import com.comicop_v2.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class RoleCheckService {

    private final UserRepository userRepository;

    public boolean hasRole(String username, String requiredRole) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Chuyển đổi enum Role thành GrantedAuthority
        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        // Chuẩn hóa requiredRole (bỏ prefix ROLE_ nếu có)
        String normalizedRequiredRole = requiredRole.startsWith("ROLE_")
                ? requiredRole.substring(5)
                : requiredRole;

        return authorities.stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_" + normalizedRequiredRole) ||
                                authority.getAuthority().equals(normalizedRequiredRole)
                );
    }
}
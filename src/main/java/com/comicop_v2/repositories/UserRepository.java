package com.comicop_v2.repositories;

import com.comicop_v2.entities.Role;
import com.comicop_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
    Optional<User> findByVerificationCode(String verificationCode);
}

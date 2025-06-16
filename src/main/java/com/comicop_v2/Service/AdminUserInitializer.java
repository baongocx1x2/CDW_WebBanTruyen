package com.comicop_v2.Service;

import com.comicop_v2.entities.Role;
import com.comicop_v2.entities.User;
import com.comicop_v2.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AdminUserInitializer {

@Autowired
private final PasswordEncoder passwordEncoder;
    @Bean
    public CommandLineRunner createAdmin(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByRole(Role.ADMIN).isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setEnabled(true);
                admin.setRole(Role.ADMIN);


                userRepository.save(admin);
                System.out.println("the default admin: " + admin.getUsername() + "/n is created");
            }else{
                System.out.println("admin already exists: ");
            }
        };
    }
}

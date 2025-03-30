package com.example.comicop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ComicopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ComicopApplication.class, args);
    }

    @GetMapping
    public String hello(){
        return "Hello World";
    }

}

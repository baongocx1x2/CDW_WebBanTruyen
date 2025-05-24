package com.example.comicop.controller.web;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorHandleController implements ErrorController {


    @GetMapping("/error")
    public String viewErrorPage() {
        return "error";
    }
}

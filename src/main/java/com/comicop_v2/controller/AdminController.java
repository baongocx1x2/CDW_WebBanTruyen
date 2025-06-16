package com.comicop_v2.controller;

import com.comicop_v2.Service.CategoryService;
import com.comicop_v2.Service.ProductService;
import com.comicop_v2.Service.RoleCheckService;
import com.comicop_v2.Service.UserService;
import com.comicop_v2.entities.Category;
import com.comicop_v2.entities.Product;
import com.comicop_v2.entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final CategoryService categoryService;
    private final ProductService productService;
    private final RoleCheckService roleCheckService;
    private final ObjectMapper objectMapper;

    public AdminController(UserService userService, CategoryService categoryService, ProductService productService,
                           RoleCheckService roleCheckService, ObjectMapper objectMapper) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.roleCheckService = roleCheckService;
        this.objectMapper = objectMapper;
    }

    private ResponseEntity<?> checkAdminPermission() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        if (!roleCheckService.hasRole(username, "ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Admin role required.");
        }
        return null;
    }
    // ========== USERS ENDPOINTS ========== //
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.allUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    // ========== CATEGORY ENDPOINTS ========== //
    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(
            @RequestBody Category category) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Category newCategory = categoryService.createCategory(category.getCategoryName(), category.getDescription());
            return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id)
                .map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Category updatedCategory = categoryService.updateCategory(id, name, description);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            categoryService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    // ========== PRODUCT ENDPOINTS ========== //

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "categoryIds", required = false) Set<Long> categoryIds) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product product = objectMapper.readValue(productJson, Product.class);

            // Validate product data
            if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product name is required");
            }
            if (product.getPrice() <= 0) {
                return ResponseEntity.badRequest().body("Price must be greater than 0");
            }
            if (product.getQtyInStock() < 0) {
                return ResponseEntity.badRequest().body("Quantity in stock cannot be negative");
            }

            Product savedProduct = productService.createProduct(product, image, categoryIds);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);

        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Invalid product data format");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to process image: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/products/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product productDetails = objectMapper.readValue(productJson, Product.class);
            Product updatedProduct = productService.updateProduct(id, productDetails, image);
            return ResponseEntity.ok(updatedProduct);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Invalid product data format");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to process image: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to retrieve products");
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> product = productService.getProductById(id);
            return product.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to retrieve product");
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to delete product image");
        }
    }

    // ========== PRODUCT-CATEGORY MANAGEMENT ========== //
    @PostMapping("/products/{productId}/categories/{categoryId}")
    public ResponseEntity<?> addCategoryToProduct(
            @PathVariable Long productId,
            @PathVariable Long categoryId) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product product = productService.addCategoryToProduct(productId, categoryId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/products/{productId}/categories/{categoryId}")
    public ResponseEntity<?> removeCategoryFromProduct(
            @PathVariable Long productId,
            @PathVariable Long categoryId) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product product = productService.removeCategoryFromProduct(productId, categoryId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/products/{productId}/categories")
    public ResponseEntity<?> getProductCategories(@PathVariable Long productId) {
        try {
            Set<Category> categories = productService.getProductCategories(productId);
            return ResponseEntity.ok(categories);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
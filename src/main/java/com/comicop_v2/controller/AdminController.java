package com.comicop_v2.controller;

import com.comicop_v2.Service.CategoryService;
import com.comicop_v2.Service.ProductService;
import com.comicop_v2.Service.RoleCheckService;
import com.comicop_v2.entities.Category;
import com.comicop_v2.entities.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CategoryService categoryService;
    private final ProductService productService;
    private final RoleCheckService roleCheckService;

    public AdminController(CategoryService categoryService, ProductService productService, RoleCheckService roleCheckService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.roleCheckService = roleCheckService;
    }

    private ResponseEntity<?> checkAdminPermission() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        if (!roleCheckService.hasRole(username, "ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Admin role required.");
        }
        return null;
    }

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

    @PostMapping(value = "/products",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "categoryIds", required = false) Set<Long> categoryIds) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product newProduct = productService.createProduct(product, image, categoryIds);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("File upload error", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestPart Product productDetails,
            @RequestPart(required = false) MultipartFile newImage) {

        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            Product updatedProduct = productService.updateProduct(id, productDetails, newImage);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("File upload error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        ResponseEntity<?> permissionCheck = checkAdminPermission();
        if (permissionCheck != null) return permissionCheck;

        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
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
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
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
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/products/{productId}/categories")
    public ResponseEntity<Set<Category>> getProductCategories(@PathVariable Long productId) {
        try {
            Set<Category> categories = productService.getProductCategories(productId);
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/categories/{categoryId}/products")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = productService.getProductsByCategory(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
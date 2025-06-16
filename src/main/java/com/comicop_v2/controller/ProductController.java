package com.comicop_v2.controller;

import com.comicop_v2.Service.ProductService;
import com.comicop_v2.entities.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Lấy tất cả sản phẩm
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Lấy thông tin chi tiết một sản phẩm
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Tìm kiếm sản phẩm theo tên
     */
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    /**
     * Lấy sản phẩm theo danh mục
     */
    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(
            @PathVariable Long categoryId) {
        List<Product> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    /**
     * Lấy sản phẩm nổi bật (có thể customize theo nhu cầu)
     */
    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeaturedProducts() {
        // Giả sử lấy 8 sản phẩm đầu tiên làm nổi bật
        List<Product> products = productService.getAllProducts().stream()
                .limit(8)
                .toList();
        return ResponseEntity.ok(products);
    }

    /**
     * Lấy sản phẩm mới nhất (có thể customize theo nhu cầu)
     */
    @GetMapping("/new-arrivals")
    public ResponseEntity<List<Product>> getNewArrivals() {
        // Giả sử sắp xếp theo ID giảm dần để lấy sản phẩm mới nhất
        List<Product> products = productService.getAllProducts().stream()
                .sorted((p1, p2) -> p2.getProductID().compareTo(p1.getProductID()))
                .limit(8)
                .toList();
        return ResponseEntity.ok(products);
    }
}
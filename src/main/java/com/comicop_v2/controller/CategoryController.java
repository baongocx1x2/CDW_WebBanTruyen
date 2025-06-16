package com.comicop_v2.controller;

import com.comicop_v2.Service.CategoryService;
import com.comicop_v2.entities.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Lấy tất cả danh mục
     */
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * Lấy thông tin chi tiết một danh mục
     */
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Tìm kiếm danh mục theo tên
     */
    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategories(
            @RequestParam String name) {
        List<Category> categories = categoryService.searchCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }

    /**
     * Lấy số lượng sản phẩm trong danh mục
     */
    @GetMapping("/{id}/product-count")
    public ResponseEntity<Integer> getProductCountInCategory(
            @PathVariable Long id) {
        int count = categoryService.countProductsInCategory(id);
        return ResponseEntity.ok(count);
    }

    /**
     * Kiểm tra danh mục có tồn tại không
     */
    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> categoryExists(@PathVariable Long id) {
        boolean exists = categoryService.existsById(id);
        return ResponseEntity.ok(exists);
    }
}
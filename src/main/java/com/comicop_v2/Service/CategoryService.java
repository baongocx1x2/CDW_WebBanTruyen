package com.comicop_v2.Service;

import com.comicop_v2.entities.Category;
import com.comicop_v2.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;


    public Category createCategory(String name, String description) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }

        if (categoryRepository.existsByCategoryNameIgnoreCase(name.trim())) {
            throw new IllegalArgumentException("Category name already exists: " + name);
        }

        Category category = new Category(name, description);
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Long id, String newName, String newDescription) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (newName != null && !newName.trim().isEmpty()) {
            if (!newName.equalsIgnoreCase(category.getCategoryName()) &&
                    categoryRepository.existsByCategoryNameIgnoreCase(newName.trim())) {
                throw new IllegalArgumentException("Category name already exists: " + newName);
            }
            category.setCategoryName(newName.trim());
        }

        if (newDescription != null) {
            category.setDescription(newDescription);
        }

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    // Product count by category
    public int countProductsInCategory(Long categoryId) {
        return categoryRepository.countProductsByCategoryId(categoryId);
    }

    // Search methods
    public List<Category> searchCategoriesByName(String name) {
        return categoryRepository.findByCategoryNameContainingIgnoreCase(name);
    }

    // Validation methods
    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    public boolean existsByName(String name) {
        return categoryRepository.existsByCategoryNameIgnoreCase(name);
    }
}
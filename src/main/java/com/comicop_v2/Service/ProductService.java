package com.comicop_v2.Service;

import com.comicop_v2.entities.Category;
import com.comicop_v2.entities.Product;
import com.comicop_v2.imgStorage.FileData;
import com.comicop_v2.imgStorage.StorageService;
import com.comicop_v2.repositories.CategoryRepository;
import com.comicop_v2.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupabaseStorageService supabaseStorageService;

    public Product createProduct(Product product, MultipartFile image, Set<Long> categoryIds) throws IOException {
        validateProduct(product);

        if (image != null && !image.isEmpty()) {
            // Upload ảnh lên Supabase
            String fileKey = "products/" + UUID.randomUUID() + "_" + image.getOriginalFilename();
            var uploadResult = supabaseStorageService.uploadImage(fileKey, image.getBytes());

            // Lưu thông tin ảnh vào product
            product.setImageUrl(uploadResult.imageUrl());
            product.setImageKey(uploadResult.imageKey());
        }

        Product savedProduct = productRepository.save(product);

        if (categoryIds != null && !categoryIds.isEmpty()) {
            addCategoriesToProduct(savedProduct, categoryIds);
        }

        return savedProduct;
    }

    public Product updateProduct(Long id, Product productDetails, MultipartFile newImage) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Cập nhật thông tin cơ bản
        if (productDetails.getProductName() != null) {
            product.setProductName(productDetails.getProductName());
        }
        if (productDetails.getPrice() >= 0) {
            product.setPrice(productDetails.getPrice());
        }
        if (productDetails.getQtyInStock() >= 0) {
            product.setQtyInStock(productDetails.getQtyInStock());
        }
        if (productDetails.getDescription() != null) {
            product.setDescription(productDetails.getDescription());
        }

        // Xử lý ảnh mới nếu có
        if (newImage != null && !newImage.isEmpty()) {
            // Xóa ảnh cũ nếu tồn tại
            if (product.getImageKey() != null) {
                supabaseStorageService.deleteImage(product.getImageKey());
            }

            // Upload ảnh mới
            String fileKey = "products/" + UUID.randomUUID() + "_" + newImage.getOriginalFilename();
            var uploadResult = supabaseStorageService.uploadImage(fileKey, newImage.getBytes());

            product.setImageUrl(uploadResult.imageUrl());
            product.setImageKey(uploadResult.imageKey());
        }

        return productRepository.save(product);
    }


    private void validateProduct(Product product) {
        if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên sản phẩm không được trống");
        }
        if (product.getPrice() <= 0) {
            throw new IllegalArgumentException("Giá sản phẩm phải lớn hơn 0");
        }
    }

    private void addCategoriesToProduct(Product product, Set<Long> categoryIds) {
        categoryIds.forEach(categoryId -> {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
            product.addCategory(category);
        });
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

//    public Product updateProduct(Long id, Product productDetails) throws IOException {
//        Product product = productRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
//
//        if (productDetails.getProductName() != null) {
//            product.setProductName(productDetails.getProductName());
//        }
//        if (productDetails.getPrice() >= 0) {
//            product.setPrice(productDetails.getPrice());
//        }
//        if (productDetails.getQtyInStock() >= 0) {
//            product.setQtyInStock(productDetails.getQtyInStock());
//        }
//        if (productDetails.getDescription() != null) {
//            product.setDescription(productDetails.getDescription());
//        }
//
//
//        return productRepository.save(product);
//    }

    public void deleteProduct(Long id) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Xóa ảnh từ Supabase nếu có
        if (product.getImageKey() != null) {
            supabaseStorageService.deleteImage(product.getImageKey());
        }

        productRepository.delete(product);
    }





    // Category related operations
    public Product addCategoryToProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.addCategory(category);
        return productRepository.save(product);
    }

    public Product removeCategoryFromProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.removeCategory(category);
        return productRepository.save(product);
    }

    public Set<Category> getProductCategories(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return product.getCategories();
    }

    // Search methods
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }




}
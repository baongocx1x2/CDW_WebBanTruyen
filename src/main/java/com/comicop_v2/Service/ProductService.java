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
    private final StorageService storageService;

    // Product CRUD operations
    public Product createProduct(Product product, MultipartFile image, Set<Long> categoryIds)
            throws IOException {

        // 1. Validate dữ liệu
        validateProduct(product);

        if (image != null && !image.isEmpty()) {
            // 1. Lưu ảnh vào thư mục
            String uploadDir = "/uploads/products/";
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            Files.createDirectories(filePath.getParent());
            image.transferTo(filePath);

            // 2. Lưu metadata vào DB
            FileData fileData = new FileData();
            fileData.setName(fileName);
            fileData.setFilePath(filePath.toString());
            fileData.setType(image.getContentType());
            product.setImage(fileData);
        }
        if (image != null && !image.isEmpty()) {
            FileData fileData = processImageUpload(image);
            product.setImage(fileData);
        }

        // 3. Lưu product vào database
        Product savedProduct = productRepository.save(product);

        // 4. Xử lý danh mục
        if (categoryIds != null && !categoryIds.isEmpty()) {
            addCategoriesToProduct(savedProduct, categoryIds);
        }

        return savedProduct;
    }

    private void validateProduct(Product product) {
        if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên sản phẩm không được trống");
        }
        if (product.getPrice() <= 0) {
            throw new IllegalArgumentException("Giá sản phẩm phải lớn hơn 0");
        }
    }

    private FileData processImageUpload(MultipartFile image) throws IOException {
        // Upload ảnh vào filesystem và lưu metadata vào database
        String filePath = storageService.uploadImageToFileSystem(image);

        return FileData.builder()
                .name(image.getOriginalFilename())
                .type(image.getContentType())
                .filePath(filePath)
                .fileSize(image.getSize())
                .build();
    }
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product productDetails, MultipartFile newImageFile) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

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
        if (newImageFile != null && !newImageFile.isEmpty()) {
            FileData newImage = uploadImage(newImageFile);
            product.setImage(newImage);
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
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



    private FileData uploadImage(MultipartFile imageFile) throws IOException {
        String uploadResult = storageService.uploadImageToFileSystem(imageFile);

        return FileData.builder()
                .name(imageFile.getOriginalFilename())
                .type(imageFile.getContentType())
                .filePath(uploadResult.replace("file uploaded successfully: ", ""))
                .fileSize(imageFile.getSize())
                .build();
    }

    private void addCategoriesToProduct(Product product, Set<Long> categoryIds) {
        categoryIds.forEach(categoryId -> {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
            product.addCategory(category);
        });
    }
}
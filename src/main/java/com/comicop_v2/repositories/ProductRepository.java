package com.comicop_v2.repositories;

import com.comicop_v2.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByProductID(Long productID);

    // Tìm products theo category
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryName = :categoryName")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);

    // Tìm products theo category ID
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryID = :categoryId")
    List<Product> findByCategoryId(@Param("categoryId") Long categoryId);

    // Tìm products có giá trong khoảng
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);


    // Tìm products theo tên chứa keyword (tìm kiếm)
    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findByNameContaining(@Param("keyword") String keyword);

    // Xóa product theo ID
    @Transactional
    @Modifying
    @Query("DELETE FROM Product p WHERE p.productID = :id")
    int deleteByProductId(@Param("id") Long productId);

    // Đếm số lượng products theo category
    @Query("SELECT COUNT(p) FROM Product p JOIN p.categories c WHERE c.categoryID = :categoryId")
    long countByCategoryId(@Param("categoryId") Long categoryId);



    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryID = :categoryId AND p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByCategoryAndPriceRange(
            @Param("categoryId") Long categoryId,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice);

    // 2. Tìm sản phẩm có số lượng tồn kho > 0
    @Query("SELECT p FROM Product p WHERE p.qtyInStock > 0")
    List<Product> findAvailableProducts();

    // 3. Tìm sản phẩm theo khoảng số lượng tồn kho
    @Query("SELECT p FROM Product p WHERE p.qtyInStock BETWEEN :minStock AND :maxStock")
    List<Product> findByStockRange(
            @Param("minStock") int minStock,
            @Param("maxStock") int maxStock);


    // 6. Kiểm tra tồn tại sản phẩm theo tên
    @Query("SELECT COUNT(p) > 0 FROM Product p WHERE LOWER(p.productName) = LOWER(:productName)")
    boolean existsByProductNameIgnoreCase(@Param("productName") String productName);

    // 7. Tìm sản phẩm theo nhiều danh mục
    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.categoryID IN :categoryIds")
    List<Product> findByMultipleCategories(@Param("categoryIds") List<Long> categoryIds);

    // 8. Cập nhật số lượng tồn kho
    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.qtyInStock = p.qtyInStock + :amount WHERE p.productID = :productId")
    int updateStockQuantity(
            @Param("productId") Long productId,
            @Param("amount") int amount);

    // 9. Tìm sản phẩm theo mô tả chứa keyword
    @Query("SELECT p FROM Product p WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findByDescriptionContaining(@Param("keyword") String keyword);


}

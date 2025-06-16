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
    // Tìm product theo tên
//    @Query("SELECT p FROM Product p WHERE p.productName = ?1")
//    Optional<Product> findByName(String name);





//
//    // Cập nhật thông tin cơ bản của product
//    @Transactional
//    @Modifying
//    @Query("UPDATE Product p SET p.productName = :name, p.price = :price, p.qtyInStock = :qty, p.img = :img, p.description = :desc WHERE p.productID = :id")
//    int updateProductBasicInfo(@Param("id") Long productId,
//                               @Param("name") String productName,
//                               @Param("price") BigDecimal price,
//                               @Param("qty") int qtyInStock,
//                               @Param("img") String img,
//                               @Param("desc") String description);
//
//    // Cập nhật tên product
//    @Transactional
//    @Modifying
//    @Query("UPDATE Product p SET p.productName = :name WHERE p.productID = :id")
//    int updateProductName(@Param("id") Long productId, @Param("name") String productName);
//
//    // Cập nhật giá product
//    @Transactional
//    @Modifying
//    @Query("UPDATE Product p SET p.price = :price WHERE p.productID = :id")
//    int updateProductPrice(@Param("id") Long productId, @Param("price") BigDecimal price);
//
//    // Cập nhật số lượng tồn kho
//    @Transactional
//    @Modifying
//    @Query("UPDATE Product p SET p.qtyInStock = :qty WHERE p.productID = :id")
//    int updateProductStock(@Param("id") Long productId, @Param("qty") int qtyInStock);

    // Tìm products theo category
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryName = :categoryName")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);

    // Tìm products theo category ID
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryID = :categoryId")
    List<Product> findByCategoryId(@Param("categoryId") Long categoryId);

    // Tìm products có giá trong khoảng
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    // Tìm products có số lượng tồn kho lớn hơn
//    @Query("SELECT p FROM Product p WHERE p.qtyInStock > :minStock")
//    List<Product> findByStockGreaterThan(@Param("minStock") int minStock);

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


}

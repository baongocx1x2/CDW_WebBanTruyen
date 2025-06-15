package com.comicop_v2.repositories;

import com.comicop_v2.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);

    List<Category> findByCategoryNameContainingIgnoreCase(String keyword);


    @Query("SELECT c FROM Category c WHERE LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Category> findByDescriptionContaining(@Param("keyword") String keyword);


    @Query("SELECT DISTINCT c FROM Category c JOIN c.products p")
    List<Category> findCategoriesWithProducts();


    @Query("SELECT c FROM Category c WHERE c.categoryID NOT IN (SELECT DISTINCT pc.categoryID FROM Product p JOIN p.categories pc)")
    List<Category> findEmptyCategories();


    @Query("SELECT COUNT(c) FROM Category c")
    long countAllCategories();

    @Query("SELECT c FROM Category c WHERE c.categoryID IN :categoryIds")
    List<Category> findByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

    /**
     * Kiểm tra category name có tồn tại không (case insensitive)
     */
    @Query("SELECT COUNT(c) > 0 FROM Category c WHERE LOWER(c.categoryName) = LOWER(:categoryName)")
    boolean existsByCategoryNameIgnoreCase(@Param("categoryName") String categoryName);

    /**
     * Tìm top categories có nhiều products nhất
     */
    @Query("SELECT c FROM Category c JOIN c.products p GROUP BY c ORDER BY COUNT(p) DESC")
    List<Category> findTopCategoriesByProductCount();

    /**
     * Lấy categories được tạo gần đây
     */
    @Query("SELECT c FROM Category c ORDER BY c.categoryID DESC")
    List<Category> findRecentCategories();

    @Query("SELECT COUNT(p) FROM Product p JOIN p.categories c WHERE c.categoryID = :categoryId")
    int countProductsByCategoryId(@Param("categoryId") Long categoryId);
}


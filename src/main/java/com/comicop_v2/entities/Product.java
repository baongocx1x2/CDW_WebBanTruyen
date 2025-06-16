package com.comicop_v2.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_gen")
    @SequenceGenerator(name = "product_id_gen", sequenceName = "product_id_seq")
    @Column(name = "product_id")
    private Long productID;

    @NotBlank(message = "Product name is required")
    @Column(name = "product_name")
    private String productName;

    private double price;

    @Column(name = "qty_in_stock")
    private int qtyInStock;

    @Column(name = "product_desc")
    private String description;

    @Column(name = "image_url")  // URL truy cập ảnh từ bucket `bookthumbnail`
    private String imageUrl;     // Ví dụ: https://xyz.supabase.co/storage/v1/object/public/bookthumbnail/product1.jpg

    @Column(name = "image_key")  // Key lưu trong bucket (đường dẫn file)
    private String imageKey;     // Ví dụ: "products/product1.jpg" hoặc "product1.jpg"

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public Product(String productName, double price, int qtyInStock, String description) {
        this.productName = productName;
        this.price = price;
        this.qtyInStock = qtyInStock;
        this.description = description;
    }

    public void addCategory(Category category) {
        this.categories.add(category);
        category.getProducts().add(this);
    }

    public void removeCategory(Category category) {
        this.categories.remove(category);
        category.getProducts().remove(this);
    }
}
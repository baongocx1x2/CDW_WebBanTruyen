package com.example.comicop.category;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    private String categoryID;
    private String categoryName;
    private String description;

    @OneToMany(mappedBy = "categoryRef")
    private List<Product> products;

    @OneToMany(mappedBy = "category")
    private List<Voucher> vouchers;
}

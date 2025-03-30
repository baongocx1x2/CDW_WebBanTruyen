package com.example.comicop.order;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String orderID;

    @ManyToOne
    @JoinColumn(name = "orderDetailID")
    private OrderDetail orderDetail;

    @ManyToOne
    @JoinColumn(name = "accountID")
    private Account account;

    @OneToMany(mappedBy = "order")
    private List<Review> reviews;
}

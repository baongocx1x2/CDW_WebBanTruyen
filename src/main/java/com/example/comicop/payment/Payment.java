package com.example.comicop.payment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String paymentID;
    private String paymentMethod;
    private double amount;
    private LocalDate payDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    @OneToMany(mappedBy = "payment")
    private List<OrderDetail> orderDetails;

    @OneToOne(mappedBy = "payment")
    private Voucher voucher;
}

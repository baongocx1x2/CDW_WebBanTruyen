package com.example.comicop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "approle")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleID;
    @Column(name = "role_name")
    private String roleName;
//    @OneToMany(mappedBy = "role")
//    @ToString.Exclude
//    @EqualsAndHashCode.Exclude
//    private Set<Account> accounts= new HashSet<Account>();

}
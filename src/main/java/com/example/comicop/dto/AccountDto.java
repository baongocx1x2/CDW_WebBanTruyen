package com.example.comicop.dto;

import com.example.comicop.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {

    private Long userID;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String gender;
    private String img;
    private Role role;
    private boolean activated = true;

}

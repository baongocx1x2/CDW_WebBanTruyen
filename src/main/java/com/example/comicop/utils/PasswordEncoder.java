package com.example.comicop.utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordEncoder {
    public String encode(String password) throws NoSuchAlgorithmException {
        MessageDigest md= MessageDigest.getInstance("SHA-256");
        byte[] bytes= password.getBytes();
        byte[] digest= md.digest(bytes);
        BigInteger result= new BigInteger(1, digest);
        return result.toString(16);
    }

//    public static void main(String[] args) throws NoSuchAlgorithmException {
//        PasswordEncoder encoder= new PasswordEncoder();
//        String txt= "hihih";
//        System.out.println(encoder.encode(txt));
//    }
}

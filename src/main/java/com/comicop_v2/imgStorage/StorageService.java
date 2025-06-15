package com.comicop_v2.imgStorage;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;



public interface StorageService {

    String uploadImageToFileSystem(MultipartFile file) throws IOException;
    byte[] downloadFileFromFileSystem(String fileName) throws IOException;






}

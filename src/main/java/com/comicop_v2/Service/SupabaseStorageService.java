package com.comicop_v2.Service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SupabaseStorageService {
    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    private final OkHttpClient httpClient = new OkHttpClient();

    public UploadResult uploadImage(String fileKey, byte[] fileData) throws IOException {
        String bucketName = "bookthumbnail";
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileKey;

        Request request = new Request.Builder()
                .url(uploadUrl)
                .addHeader("Authorization", "Bearer " + supabaseKey)
                .addHeader("Content-Type", "image/*")
                .post(RequestBody.create(fileData))
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Upload failed: " + response.body().string());
            }
            String publicUrl = supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileKey;
            return new UploadResult(publicUrl, fileKey);
        }
    }

    public void deleteImage(String fileKey) throws IOException {
        String bucketName = "bookthumbnail";
        String deleteUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileKey;

        Request request = new Request.Builder()
                .url(deleteUrl)
                .addHeader("Authorization", "Bearer " + supabaseKey)
                .delete()
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Delete failed: " + response.body().string());
            }
        }
    }

    public record UploadResult(String imageUrl, String imageKey) {}
}
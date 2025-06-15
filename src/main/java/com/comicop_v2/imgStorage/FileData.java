package com.comicop_v2.imgStorage;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "FILE_DATA")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String filePath;
    private Long fileSize;
}
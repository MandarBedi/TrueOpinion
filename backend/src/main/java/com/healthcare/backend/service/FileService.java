package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.ApplicationFile;
import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.ApplicationFileRepository;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private ApplicationFileRepository applicationFileRepository;

    @Autowired
    private UserRepository userRepository;

    public ApiResponse uploadFile(MultipartFile file, Long userId, String fileType, Long applicationId) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String originalFilename = file.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() + "-" + originalFilename;
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ApiResponse.error("User not found");
            }

            ApplicationFile applicationFile = new ApplicationFile();
            applicationFile.setFileName(fileName);
            applicationFile.setOriginalFileName(originalFilename);
            applicationFile.setFilePath(targetLocation.toString());
            applicationFile.setFileSize(file.getSize());
            applicationFile.setContentType(file.getContentType());
            applicationFile.setFileType(fileType);
            applicationFile.setUploadedAt(LocalDateTime.now());
            applicationFile.setUser(userOptional.get());
            // applicationId is set later if it's an application file
            // applicationFile.setApplication(application);

            applicationFileRepository.save(applicationFile);

            return ApiResponse.success("File uploaded successfully", applicationFile);
        } catch (IOException ex) {
            return ApiResponse.error("Could not store file. Please try again! " + ex.getMessage());
        }
    }

    public Resource downloadFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    public List<ApplicationFile> getFilesByApplicationId(Long applicationId) {
        return applicationFileRepository.findByApplicationId(applicationId);
    }

    public Optional<ApplicationFile> getFileById(Long fileId) {
        return applicationFileRepository.findById(fileId);
    }

    public ApiResponse deleteFile(Long fileId) {
        Optional<ApplicationFile> fileOptional = applicationFileRepository.findById(fileId);
        if (fileOptional.isEmpty()) {
            return ApiResponse.error("File not found");
        }

        ApplicationFile file = fileOptional.get();
        Path filePath = Paths.get(file.getFilePath());
        try {
            Files.deleteIfExists(filePath);
            applicationFileRepository.delete(file);
            return ApiResponse.success("File deleted successfully");
        } catch (IOException ex) {
            return ApiResponse.error("Could not delete file. " + ex.getMessage());
        }
    }
}


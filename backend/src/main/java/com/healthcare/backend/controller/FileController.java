package com.healthcare.backend.controller;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.ApplicationFile;
import com.healthcare.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam("fileType") String fileType,
            @RequestParam(value = "applicationId", required = false) Long applicationId) {
        ApiResponse response = fileService.uploadFile(file, userId, fileType, applicationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{fileId}")
    @PreAuthorize("hasRole(\'PATIENT\') or hasRole(\'DOCTOR\') or hasRole(\'ADMIN\')")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        try {
            Optional<ApplicationFile> fileInfo = fileService.getFileById(fileId);
            
            if (fileInfo.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Resource resource = fileService.downloadFile(fileInfo.get().getFileName());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileInfo.get().getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                           "attachment; filename=\"" + fileInfo.get().getOriginalFileName() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{fileId}")
    @PreAuthorize("hasRole(\'PATIENT\') or hasRole(\'DOCTOR\') or hasRole(\'ADMIN\')")
    public ResponseEntity<ApiResponse> getFileInfo(@PathVariable Long fileId) {
        Optional<ApplicationFile> fileInfo = fileService.getFileById(fileId);
        if (fileInfo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ApiResponse.success("File info retrieved successfully", fileInfo.get()));
    }

    @GetMapping("/preview/{fileId}")
    @PreAuthorize("hasRole(\'PATIENT\') or hasRole(\'DOCTOR\') or hasRole(\'ADMIN\')")
    public ResponseEntity<Resource> previewFile(@PathVariable Long fileId) {
        try {
            Optional<ApplicationFile> fileInfo = fileService.getFileById(fileId);
            
            if (fileInfo.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Resource resource = fileService.downloadFile(fileInfo.get().getFileName());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileInfo.get().getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasRole(\'PATIENT\') or hasRole(\'DOCTOR\') or hasRole(\'ADMIN\')")
    public ResponseEntity<ApiResponse> getFilesByApplication(@PathVariable Long applicationId) {
        List<ApplicationFile> files = fileService.getFilesByApplicationId(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Files retrieved successfully", files));
    }

    @DeleteMapping("/{fileId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteFile(@PathVariable Long fileId) {
        ApiResponse response = fileService.deleteFile(fileId);
        return ResponseEntity.ok(response);
    }
}


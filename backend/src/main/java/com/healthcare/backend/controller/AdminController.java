package com.healthcare.backend.controller;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.service.AdminService;
import com.healthcare.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = adminService.getAllUsers(pageable);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/users/type/{userType}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getUsersByType(@PathVariable UserType userType) {
        List<User> users = adminService.getUsersByType(userType);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/doctors/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getPendingDoctors() {
        List<Doctor> doctors = adminService.getPendingDoctors();
        return ResponseEntity.ok(ApiResponse.success("Pending doctors retrieved successfully", doctors));
    }

    @PostMapping("/doctors/{doctorId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> approveDoctor(@PathVariable Long doctorId) {
        ApiResponse response = adminService.approveDoctor(doctorId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/doctors/{doctorId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> rejectDoctor(@PathVariable Long doctorId, @RequestBody RejectRequest request) {
        ApiResponse response = adminService.rejectDoctor(doctorId, request.getReason());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/doctors/bulk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> bulkApproveRejectDoctors(@Valid @RequestBody BulkActionRequest request) {
        ApiResponse response = adminService.bulkApproveRejectDoctors(
                request.getDoctorIds(), 
                request.getAction(), 
                request.getReason()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{userId}/suspend")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> suspendUser(@PathVariable Long userId) {
        ApiResponse response = adminService.suspendUser(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{userId}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> activateUser(@PathVariable Long userId) {
        ApiResponse response = adminService.activateUser(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getAnalytics() {
        Map<String, Object> analytics = adminService.getAnalytics();
        return ResponseEntity.ok(ApiResponse.success("Analytics retrieved successfully", analytics));
    }

    @PostMapping("/notifications/bulk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> sendBulkNotification(@Valid @RequestBody BulkNotificationRequest request) {
        ApiResponse response = adminService.sendBulkNotification(
                request.getTitle(),
                request.getMessage(),
                request.getType(),
                request.getTargetUserType()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/notifications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getNotifications() {
        // This would need to be implemented to get admin-specific notifications
        return ResponseEntity.ok(ApiResponse.success("Admin notifications retrieved successfully"));
    }

    // Inner classes for request bodies
    public static class RejectRequest {
        private String reason;

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

    public static class BulkActionRequest {
        private List<Long> doctorIds;
        private String action; // "approve" or "reject"
        private String reason;

        public List<Long> getDoctorIds() { return doctorIds; }
        public void setDoctorIds(List<Long> doctorIds) { this.doctorIds = doctorIds; }
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

    public static class BulkNotificationRequest {
        private String title;
        private String message;
        private NotificationType type;
        private UserType targetUserType;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public NotificationType getType() { return type; }
        public void setType(NotificationType type) { this.type = type; }
        public UserType getTargetUserType() { return targetUserType; }
        public void setTargetUserType(UserType targetUserType) { this.targetUserType = targetUserType; }
    }
}


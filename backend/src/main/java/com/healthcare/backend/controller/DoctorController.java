package com.healthcare.backend.controller;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.dto.DoctorProfileUpdateRequest;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.security.JwtUtil;
import com.healthcare.backend.service.DoctorService;
import com.healthcare.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long getCurrentUserId(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        return jwtUtil.getUserIdFromToken(token);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getProfile(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        return doctorService.findById(userId)
                .map(doctor -> ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", doctor)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> updateProfile(@Valid @RequestBody DoctorProfileUpdateRequest doctor, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ApiResponse response = doctorService.updateProfile(userId, doctor);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getApplications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Application> applications = doctorService.getApplications(userId);
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @GetMapping("/applications/status/{status}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getApplicationsByStatus(@PathVariable ApplicationStatus status, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Application> applications = doctorService.getApplicationsByStatus(userId, status);
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @PostMapping("/applications/{applicationId}/review")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> reviewApplication(
            @PathVariable Long applicationId,
            @RequestBody ReviewRequest reviewRequest,
            HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ApiResponse response = doctorService.reviewApplication(
                userId, 
                applicationId, 
                reviewRequest.getNotes(), 
                reviewRequest.getRecommendation(), 
                reviewRequest.getStatus()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getAvailability(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<DoctorAvailability> availability = doctorService.getAvailability(userId);
        return ResponseEntity.ok(ApiResponse.success("Availability retrieved successfully", availability));
    }

    @PutMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> updateAvailability(@Valid @RequestBody List<DoctorAvailability> availabilities, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ApiResponse response = doctorService.updateAvailability(userId, availabilities);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/availability/status")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> updateAvailabilityStatus(@RequestBody AvailabilityStatusRequest request, HttpServletRequest httpRequest) {
        Long userId = getCurrentUserId(httpRequest);
        ApiResponse response = doctorService.updateAvailabilityStatus(userId, request.getIsAvailable());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/earnings")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getTotalEarnings(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        BigDecimal totalEarnings = doctorService.getTotalEarnings(userId);
        return ResponseEntity.ok(ApiResponse.success("Total earnings retrieved successfully", totalEarnings));
    }

    @GetMapping("/earnings/history")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getEarningsHistory(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Payment> earnings = doctorService.getEarningsHistory(userId);
        return ResponseEntity.ok(ApiResponse.success("Earnings history retrieved successfully", earnings));
    }

    @GetMapping("/notifications")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getNotifications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Notification> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(ApiResponse.success("Notifications retrieved successfully", notifications));
    }

    @GetMapping("/notifications/unread")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getUnreadNotifications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Notification> notifications = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(ApiResponse.success("Unread notifications retrieved successfully", notifications));
    }

    @GetMapping("/notifications/unread/count")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse> getUnreadNotificationCount(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        Long count = notificationService.getUnreadCount(userId);
        return ResponseEntity.ok(ApiResponse.success("Unread count retrieved successfully", count));
    }

    // Inner classes for request bodies
    public static class ReviewRequest {
        private String notes;
        private String recommendation;
        private ApplicationStatus status;

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
        public ApplicationStatus getStatus() { return status; }
        public void setStatus(ApplicationStatus status) { this.status = status; }
    }

    public static class AvailabilityStatusRequest {
        private Boolean isAvailable;

        public Boolean getIsAvailable() { return isAvailable; }
        public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
    }
}


package com.healthcare.backend.controller;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.dto.PatientProfileUpdateRequest;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.security.JwtUtil;
import com.healthcare.backend.service.NotificationService;
import com.healthcare.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long getCurrentUserId(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        return jwtUtil.getUserIdFromToken(token);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getProfile(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        return patientService.findById(userId)
                .map(patient -> ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", patient)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> updateProfile(@Valid @RequestBody PatientProfileUpdateRequest patientUpdateRequest, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ApiResponse response = patientService.updateProfile(userId, patientUpdateRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getApplications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Application> applications = patientService.getApplications(userId);
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @GetMapping("/applications/status/{status}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getApplicationsByStatus(@PathVariable ApplicationStatus status, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Application> applications = patientService.getApplicationsByStatus(userId, status);
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @PostMapping("/applications")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> submitApplication(@Valid @RequestBody Application application, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ApiResponse response = patientService.submitApplication(userId, application);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/doctors")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getAvailableDoctors() {
        List<Doctor> doctors = patientService.getAvailableDoctors();
        return ResponseEntity.ok(ApiResponse.success("Doctors retrieved successfully", doctors));
    }

    @GetMapping("/doctors/specialization/{specialization}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getDoctorsBySpecialization(@PathVariable String specialization) {
        List<Doctor> doctors = patientService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(ApiResponse.success("Doctors retrieved successfully", doctors));
    }

    @GetMapping("/payments")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getPaymentHistory(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Payment> payments = patientService.getPaymentHistory(userId);
        return ResponseEntity.ok(ApiResponse.success("Payment history retrieved successfully", payments));
    }

    @GetMapping("/notifications")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getNotifications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Notification> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(ApiResponse.success("Notifications retrieved successfully", notifications));
    }

    @GetMapping("/notifications/unread")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getUnreadNotifications(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        List<Notification> notifications = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(ApiResponse.success("Unread notifications retrieved successfully", notifications));
    }

    @GetMapping("/notifications/unread/count")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse> getUnreadNotificationCount(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        Long count = notificationService.getUnreadCount(userId);
        return ResponseEntity.ok(ApiResponse.success("Unread count retrieved successfully", count));
    }
}


package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationService notificationService;

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public List<User> getUsersByType(UserType userType) {
        return userRepository.findByUserType(userType);
    }

    public List<Doctor> getPendingDoctors() {
        return doctorRepository.findByIsVerified(false);
    }

    public ApiResponse approveDoctor(Long doctorId) {
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        if (doctorOpt.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        Doctor doctor = doctorOpt.get();
        doctor.setIsVerified(true);
        doctorRepository.save(doctor);

        // Send notification to doctor
        notificationService.createNotification(
            doctor,
            "Account Approved",
            "Congratulations! Your doctor account has been approved and verified.",
            NotificationType.DOCTOR_APPROVED
        );

        return ApiResponse.success("Doctor approved successfully");
    }

    public ApiResponse rejectDoctor(Long doctorId, String reason) {
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        if (doctorOpt.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        Doctor doctor = doctorOpt.get();
        doctor.setIsActive(false);
        doctorRepository.save(doctor);

        // Send notification to doctor
        notificationService.createNotification(
            doctor,
            "Account Rejected",
            "Your doctor account application has been rejected. Reason: " + reason,
            NotificationType.DOCTOR_REJECTED
        );

        return ApiResponse.success("Doctor rejected successfully");
    }

    public ApiResponse bulkApproveRejectDoctors(List<Long> doctorIds, String action, String reason) {
        int successCount = 0;
        int failureCount = 0;

        for (Long doctorId : doctorIds) {
            try {
                if ("approve".equals(action)) {
                    approveDoctor(doctorId);
                } else if ("reject".equals(action)) {
                    rejectDoctor(doctorId, reason);
                }
                successCount++;
            } catch (Exception e) {
                failureCount++;
            }
        }

        return ApiResponse.success(
            String.format("Bulk operation completed. Success: %d, Failed: %d", successCount, failureCount)
        );
    }

    public ApiResponse suspendUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ApiResponse.error("User not found");
        }

        User user = userOpt.get();
        user.setIsActive(false);
        userRepository.save(user);

        // Send notification to user
        notificationService.createNotification(
            user,
            "Account Suspended",
            "Your account has been suspended. Please contact support for more information.",
            NotificationType.WARNING
        );

        return ApiResponse.success("User suspended successfully");
    }

    public ApiResponse activateUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ApiResponse.error("User not found");
        }

        User user = userOpt.get();
        user.setIsActive(true);
        userRepository.save(user);

        // Send notification to user
        notificationService.createNotification(
            user,
            "Account Activated",
            "Your account has been activated successfully.",
            NotificationType.SUCCESS
        );

        return ApiResponse.success("User activated successfully");
    }

    public Map<String, Object> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        // User statistics
        long totalUsers = userRepository.count();
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long verifiedDoctors = doctorRepository.findByIsVerified(true).size();
        long pendingDoctors = doctorRepository.findByIsVerified(false).size();

        analytics.put("totalUsers", totalUsers);
        analytics.put("totalPatients", totalPatients);
        analytics.put("totalDoctors", totalDoctors);
        analytics.put("verifiedDoctors", verifiedDoctors);
        analytics.put("pendingDoctors", pendingDoctors);

        // Application statistics
        long totalApplications = applicationRepository.count();
        long pendingApplications = applicationRepository.findByStatus(ApplicationStatus.PENDING).size();
        long reviewedApplications = applicationRepository.findByStatus(ApplicationStatus.REVIEWED).size();

        analytics.put("totalApplications", totalApplications);
        analytics.put("pendingApplications", pendingApplications);
        analytics.put("reviewedApplications", reviewedApplications);

        // Payment statistics
        long totalPayments = paymentRepository.count();
        long successfulPayments = paymentRepository.findByStatus(PaymentStatus.SUCCESS).size();
        long failedPayments = paymentRepository.findByStatus(PaymentStatus.FAILED).size();

        analytics.put("totalPayments", totalPayments);
        analytics.put("successfulPayments", successfulPayments);
        analytics.put("failedPayments", failedPayments);

        return analytics;
    }

    public ApiResponse sendBulkNotification(String title, String message, NotificationType type, UserType targetUserType) {
        List<User> users;
        if (targetUserType != null) {
            users = userRepository.findByUserType(targetUserType);
        } else {
            users = userRepository.findAll();
        }

        for (User user : users) {
            notificationService.createNotification(user, title, message, type);
        }

        return ApiResponse.success("Bulk notification sent to " + users.size() + " users");
    }
}


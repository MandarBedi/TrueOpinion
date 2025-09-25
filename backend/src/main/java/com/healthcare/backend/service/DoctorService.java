package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.dto.DoctorProfileUpdateRequest;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationService notificationService;

    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public ApiResponse updateProfile(Long doctorId, DoctorProfileUpdateRequest updatedDoctor) {
        Optional<Doctor> existingDoctor = doctorRepository.findById(doctorId);
        if (existingDoctor.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        Doctor doctor = existingDoctor.get();
        if (updatedDoctor.getFirstName() != null) doctor.setFirstName(updatedDoctor.getFirstName());
        if (updatedDoctor.getLastName() != null) doctor.setLastName(updatedDoctor.getLastName());
        if (updatedDoctor.getPhoneNumber() != null) doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());
        if (updatedDoctor.getSpecialization() != null) doctor.setSpecialization(updatedDoctor.getSpecialization());
        if (updatedDoctor.getYearsOfExperience() != null) doctor.setYearsOfExperience(updatedDoctor.getYearsOfExperience());
        if (updatedDoctor.getQualification() != null) doctor.setQualification(updatedDoctor.getQualification());
        if (updatedDoctor.getHospitalAffiliation() != null) doctor.setHospitalAffiliation(updatedDoctor.getHospitalAffiliation());
        if (updatedDoctor.getConsultationFee() != null) doctor.setConsultationFee(updatedDoctor.getConsultationFee());
        if (updatedDoctor.getBio() != null) doctor.setBio(updatedDoctor.getBio());
        if (updatedDoctor.getProfileImageUrl() != null) doctor.setProfileImageUrl(updatedDoctor.getProfileImageUrl());

        doctorRepository.save(doctor);

        // Send notification
        notificationService.createNotification(
            doctor,
            "Profile Updated",
            "Your profile has been updated successfully.",
            NotificationType.PROFILE_UPDATED
        );

        return ApiResponse.success("Profile updated successfully");
    }

    public List<Application> getApplications(Long doctorId) {
        return applicationRepository.findByDoctorId(doctorId);
    }

    public List<Application> getApplicationsByStatus(Long doctorId, ApplicationStatus status) {
        return applicationRepository.findByDoctorIdAndStatus(doctorId, status);
    }

    public ApiResponse reviewApplication(Long doctorId, Long applicationId, String notes, String recommendation, ApplicationStatus status) {
        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
        if (applicationOpt.isEmpty()) {
            return ApiResponse.error("Application not found");
        }

        Application application = applicationOpt.get();
        if (!application.getDoctor().getId().equals(doctorId)) {
            return ApiResponse.error("Unauthorized to review this application");
        }

        application.setDoctorNotes(notes);
        application.setDoctorRecommendation(recommendation);
        application.setStatus(status);
        application.setReviewedAt(LocalDateTime.now());

        applicationRepository.save(application);

        // Send notification to patient
        notificationService.createNotification(
            application.getPatient(),
            "Application Reviewed",
            "Your application has been reviewed by Dr. " + application.getDoctor().getFirstName() + " " + application.getDoctor().getLastName(),
            NotificationType.APPLICATION_REVIEWED
        );

        return ApiResponse.success("Application reviewed successfully");
    }

    public List<DoctorAvailability> getAvailability(Long doctorId) {
        return availabilityRepository.findByDoctorId(doctorId);
    }

    public ApiResponse updateAvailability(Long doctorId, List<DoctorAvailability> availabilities) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        // Delete existing availability
        List<DoctorAvailability> existing = availabilityRepository.findByDoctorId(doctorId);
        availabilityRepository.deleteAll(existing);

        // Save new availability
        for (DoctorAvailability availability : availabilities) {
            availability.setDoctor(doctor.get());
            availabilityRepository.save(availability);
        }

        return ApiResponse.success("Availability updated successfully");
    }

    public ApiResponse updateAvailabilityStatus(Long doctorId, Boolean isAvailable) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        doctor.get().setIsAvailable(isAvailable);
        doctorRepository.save(doctor.get());

        return ApiResponse.success("Availability status updated successfully");
    }

    public BigDecimal getTotalEarnings(Long doctorId) {
        List<Payment> payments = paymentRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId);
        return payments.stream()
                .filter(payment -> payment.getStatus() == PaymentStatus.SUCCESS)
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<Payment> getEarningsHistory(Long doctorId) {
        return paymentRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId);
    }
}



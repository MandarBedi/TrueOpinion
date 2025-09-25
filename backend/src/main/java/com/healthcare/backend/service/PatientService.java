package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.dto.PatientProfileUpdateRequest;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationService notificationService;

    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    public ApiResponse updateProfile(Long patientId, PatientProfileUpdateRequest updatedPatient) {
        Optional<Patient> existingPatient = patientRepository.findById(patientId);
        if (existingPatient.isEmpty()) {
            return ApiResponse.error("Patient not found");
        }

        Patient patient = existingPatient.get();
        if (updatedPatient.getFirstName() != null) patient.setFirstName(updatedPatient.getFirstName());
        if (updatedPatient.getLastName() != null) patient.setLastName(updatedPatient.getLastName());
        if (updatedPatient.getPhoneNumber() != null) patient.setPhoneNumber(updatedPatient.getPhoneNumber());
        if (updatedPatient.getDateOfBirth() != null) patient.setDateOfBirth(updatedPatient.getDateOfBirth());
        if (updatedPatient.getGender() != null) patient.setGender(updatedPatient.getGender());
        if (updatedPatient.getEmergencyContact() != null) patient.setEmergencyContact(updatedPatient.getEmergencyContact());
        if (updatedPatient.getEmergencyContactPhone() != null) patient.setEmergencyContactPhone(updatedPatient.getEmergencyContactPhone());
        if (updatedPatient.getAddress() != null) patient.setAddress(updatedPatient.getAddress());
        if (updatedPatient.getMedicalHistory() != null) patient.setMedicalHistory(updatedPatient.getMedicalHistory());
        if (updatedPatient.getCurrentMedications() != null) patient.setCurrentMedications(updatedPatient.getCurrentMedications());
        if (updatedPatient.getAllergies() != null) patient.setAllergies(updatedPatient.getAllergies());

        patientRepository.save(patient);

        // Send notification
        notificationService.createNotification(
            patient,
            "Profile Updated",
            "Your profile has been updated successfully.",
            NotificationType.PROFILE_UPDATED
        );

        return ApiResponse.success("Profile updated successfully");
    }

    public List<Application> getApplications(Long patientId) {
        return applicationRepository.findByPatientId(patientId);
    }

    public List<Application> getApplicationsByStatus(Long patientId, ApplicationStatus status) {
        return applicationRepository.findByPatientIdAndStatus(patientId, status);
    }

    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findByIsVerifiedAndIsAvailable(true, true);
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public ApiResponse submitApplication(Long patientId, Application application) {
        Optional<Patient> patient = patientRepository.findById(patientId);
        if (patient.isEmpty()) {
            return ApiResponse.error("Patient not found");
        }

        Optional<Doctor> doctor = doctorRepository.findById(application.getDoctor().getId());
        if (doctor.isEmpty()) {
            return ApiResponse.error("Doctor not found");
        }

        if (!doctor.get().getIsVerified() || !doctor.get().getIsAvailable()) {
            return ApiResponse.error("Doctor is not available for consultations");
        }

        application.setPatient(patient.get());
        application.setDoctor(doctor.get());
        application.setConsultationFee(doctor.get().getConsultationFee());
        application.setStatus(ApplicationStatus.PENDING);

        Application savedApplication = applicationRepository.save(application);

        // Send notifications
        notificationService.createNotification(
            patient.get(),
            "Application Submitted",
            "Your application has been submitted successfully to Dr. " + doctor.get().getFirstName() + " " + doctor.get().getLastName(),
            NotificationType.APPLICATION_SUBMITTED
        );

        notificationService.createNotification(
            doctor.get(),
            "New Application Received",
            "You have received a new application from " + patient.get().getFirstName() + " " + patient.get().getLastName(),
            NotificationType.APPLICATION_SUBMITTED
        );

        return ApiResponse.success("Application submitted successfully", savedApplication);
    }

    public List<Payment> getPaymentHistory(Long patientId) {
        return paymentRepository.findByUserId(patientId);
    }

    public Page<Doctor> searchDoctors(String query, Pageable pageable) {
        // This would need a custom query implementation
        return doctorRepository.findAll(pageable);
    }
}



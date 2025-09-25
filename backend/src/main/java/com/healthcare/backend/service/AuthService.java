package com.healthcare.backend.service;

import com.healthcare.backend.dto.*;
import com.healthcare.backend.entity.*;
import com.healthcare.backend.repository.*;
import com.healthcare.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT token with user type
        Map<String, Object> claims = new HashMap<>();
        claims.put("userType", user.getUserType().name());
        claims.put("userId", user.getId());
        
        String token = jwtUtil.generateTokenWithClaims(userDetails, claims);

        return new LoginResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getUserType()
        );
    }

    public ApiResponse registerPatient(PatientRegistrationRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email is already registered");
        }

        // Create new patient
        Patient patient = new Patient();
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setPhoneNumber(request.getPhoneNumber());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setGender(request.getGender());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setEmergencyContactPhone(request.getEmergencyContactPhone());
        patient.setAddress(request.getAddress());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setCurrentMedications(request.getCurrentMedications());
        patient.setAllergies(request.getAllergies());

        patientRepository.save(patient);

        return ApiResponse.success("Patient registered successfully");
    }

    public ApiResponse registerDoctor(DoctorRegistrationRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email is already registered");
        }

        // Check if license number already exists
        if (doctorRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            return ApiResponse.error("License number is already registered");
        }

        // Create new doctor
        Doctor doctor = new Doctor();
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setPhoneNumber(request.getPhoneNumber());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setYearsOfExperience(request.getYearsOfExperience());
        doctor.setQualification(request.getQualification());
        doctor.setHospitalAffiliation(request.getHospitalAffiliation());
        doctor.setConsultationFee(request.getConsultationFee());
        doctor.setBio(request.getBio());

        doctorRepository.save(doctor);

        return ApiResponse.success("Doctor registered successfully. Account is pending verification.");
    }

    public ApiResponse createAdmin(String email, String password, String firstName, String lastName) {
        // Check if user already exists
        if (userRepository.existsByEmail(email)) {
            return ApiResponse.error("Email is already registered");
        }

        // Create new admin
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setFirstName(firstName);
        admin.setLastName(lastName);

        adminRepository.save(admin);

        return ApiResponse.success("Admin created successfully");
    }
}


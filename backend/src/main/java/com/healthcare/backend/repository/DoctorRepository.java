package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    Optional<Doctor> findByEmail(String email);
    
    Optional<Doctor> findByLicenseNumber(String licenseNumber);
    
    boolean existsByEmail(String email);
    
    boolean existsByLicenseNumber(String licenseNumber);
    
    List<Doctor> findBySpecialization(String specialization);
    
    List<Doctor> findByIsVerified(Boolean isVerified);
    
    List<Doctor> findByIsAvailable(Boolean isAvailable);
    
    @Query("SELECT d FROM Doctor d WHERE d.isVerified = :isVerified AND d.isAvailable = :isAvailable")
    List<Doctor> findByIsVerifiedAndIsAvailable(@Param("isVerified") Boolean isVerified, @Param("isAvailable") Boolean isAvailable);
}


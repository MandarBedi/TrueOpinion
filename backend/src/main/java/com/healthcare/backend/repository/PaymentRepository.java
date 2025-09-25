package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Payment;
import com.healthcare.backend.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
    List<Payment> findByDoctorId(Long doctorId);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.doctor.id = :doctorId AND p.status = 'COMPLETED'")
    BigDecimal findTotalAmountByDoctorId(@Param("doctorId") Long doctorId);

    Optional<Payment> findByApplicationId(Long applicationId);
    List<Payment> findByStatus(PaymentStatus status);
    
    @Query("SELECT p FROM Payment p WHERE p.application.patient.id = :patientId ORDER BY p.createdAt DESC")
    List<Payment> findByPatientIdOrderByCreatedAtDesc(@Param("patientId") Long patientId);
    
    @Query("SELECT p FROM Payment p WHERE p.application.doctor.id = :doctorId ORDER BY p.createdAt DESC")
    List<Payment> findByDoctorIdOrderByCreatedAtDesc(@Param("doctorId") Long doctorId);
}


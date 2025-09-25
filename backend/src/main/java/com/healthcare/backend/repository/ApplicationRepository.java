package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Application;
import com.healthcare.backend.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByPatientId(Long patientId);
    List<Application> findByDoctorId(Long doctorId);
    List<Application> findByStatus(ApplicationStatus status);
    List<Application> findByPatientIdAndStatus(Long patientId, ApplicationStatus status);
    List<Application> findByDoctorIdAndStatus(Long doctorId, ApplicationStatus status);
}


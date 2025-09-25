package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Admin;
import com.healthcare.backend.entity.AdminLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Optional<Admin> findByEmail(String email);
    
    Optional<Admin> findByEmployeeId(String employeeId);
    
    boolean existsByEmail(String email);
    
    boolean existsByEmployeeId(String employeeId);
    
    List<Admin> findByAdminLevel(AdminLevel adminLevel);
    
    List<Admin> findByDepartment(String department);
}


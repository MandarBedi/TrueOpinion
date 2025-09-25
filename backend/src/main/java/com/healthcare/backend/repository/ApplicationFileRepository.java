package com.healthcare.backend.repository;

import com.healthcare.backend.entity.ApplicationFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationFileRepository extends JpaRepository<ApplicationFile, Long> {
    List<ApplicationFile> findByApplicationId(Long applicationId);
}


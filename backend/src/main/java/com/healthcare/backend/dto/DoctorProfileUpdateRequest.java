package com.healthcare.backend.dto;

import com.healthcare.backend.entity.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class DoctorProfileUpdateRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String specialization;
    private Integer yearsOfExperience;
    private String qualification;
    private String hospitalAffiliation;
    private BigDecimal consultationFee;
    private String bio;
    private String profileImageUrl;
}


package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.Payment;
import com.healthcare.backend.entity.PaymentStatus;
import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.PaymentRepository;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    public ApiResponse recordPayment(Long userId, BigDecimal amount, String currency, String description) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ApiResponse.error("User not found");
        }

        Payment payment = new Payment();
        payment.setUser(userOptional.get());
        payment.setCurrency(currency);
        payment.setDescription(description);
        payment.setStatus(PaymentStatus.SUCCESS);

        paymentRepository.save(payment);
        return ApiResponse.success("Payment recorded successfully", payment);
    }

    public List<Payment> getPaymentsByUser(Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public ApiResponse updatePaymentStatus(Long paymentId, PaymentStatus newStatus) {
        Optional<Payment> paymentOptional = paymentRepository.findById(paymentId);
        if (paymentOptional.isEmpty()) {
            return ApiResponse.error("Payment not found");
        }

        Payment payment = paymentOptional.get();
        payment.setStatus(newStatus);
        paymentRepository.save(payment);
        return ApiResponse.success("Payment status updated successfully", payment);
    }

    public BigDecimal getTotalEarningsForDoctor(Long doctorId) {
        return paymentRepository.findTotalAmountByDoctorId(doctorId);
    }

    public List<Payment> getEarningsHistoryForDoctor(Long doctorId) {
        return paymentRepository.findByDoctorId(doctorId);
    }
}


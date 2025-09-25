package com.healthcare.backend.service;

import com.healthcare.backend.dto.ApiResponse;
import com.healthcare.backend.entity.Notification;
import com.healthcare.backend.entity.NotificationType;
import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = new Notification(user, title, message, type);
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadOrderByCreatedAtDesc(userId, false);
    }

    public Long getUnreadCount(Long userId) {
        return notificationRepository.countUnreadByUserId(userId);
    }

    public ApiResponse markAsRead(Long notificationId, Long userId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isEmpty()) {
            return ApiResponse.error("Notification not found");
        }

        Notification notification = notificationOpt.get();
        if (!notification.getUser().getId().equals(userId)) {
            return ApiResponse.error("Unauthorized to access this notification");
        }

        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);

        return ApiResponse.success("Notification marked as read");
    }

    public ApiResponse markAllAsRead(Long userId) {
        notificationRepository.markAllAsReadByUserId(userId);
        return ApiResponse.success("All notifications marked as read");
    }

    public ApiResponse deleteNotification(Long notificationId, Long userId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isEmpty()) {
            return ApiResponse.error("Notification not found");
        }

        Notification notification = notificationOpt.get();
        if (!notification.getUser().getId().equals(userId)) {
            return ApiResponse.error("Unauthorized to delete this notification");
        }

        notificationRepository.delete(notification);
        return ApiResponse.success("Notification deleted successfully");
    }
}


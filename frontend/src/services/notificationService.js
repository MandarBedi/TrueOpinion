import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Notification service for Spring Boot backend integration
 */
class NotificationService {
  /**
   * Get notifications for current user
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to notifications list
   */
  async getNotifications(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`/notifications?${params}`);
  }

  /**
   * Get notification by ID
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Promise resolving to notification details
   */
  async getNotification(notificationId) {
    return await apiClient.get(`/notifications/${notificationId}`);
  }

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Promise resolving to success message
   */
  async markAsRead(notificationId) {
    return await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId));
  }

  /**
   * Mark all notifications as read
   * @returns {Promise} - Promise resolving to success message
   */
  async markAllAsRead() {
    return await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  }

  /**
   * Delete notification
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Promise resolving to success message
   */
  async deleteNotification(notificationId) {
    return await apiClient.delete(`/notifications/${notificationId}`);
  }

  /**
   * Get unread notifications count
   * @returns {Promise} - Promise resolving to unread count
   */
  async getUnreadCount() {
    return await apiClient.get('/notifications/unread/count');
  }

  /**
   * Get notification preferences
   * @returns {Promise} - Promise resolving to notification preferences
   */
  async getPreferences() {
    return await apiClient.get('/notifications/preferences');
  }

  /**
   * Update notification preferences
   * @param {Object} preferences - Notification preferences
   * @returns {Promise} - Promise resolving to success message
   */
  async updatePreferences(preferences) {
    return await apiClient.put('/notifications/preferences', preferences);
  }

  /**
   * Subscribe to push notifications
   * @param {Object} subscriptionData - Push subscription data
   * @returns {Promise} - Promise resolving to success message
   */
  async subscribeToPush(subscriptionData) {
    return await apiClient.post('/notifications/push/subscribe', subscriptionData);
  }

  /**
   * Unsubscribe from push notifications
   * @returns {Promise} - Promise resolving to success message
   */
  async unsubscribeFromPush() {
    return await apiClient.post('/notifications/push/unsubscribe');
  }

  /**
   * Test push notification
   * @returns {Promise} - Promise resolving to success message
   */
  async testPushNotification() {
    return await apiClient.post('/notifications/push/test');
  }

  /**
   * Get notification templates
   * @returns {Promise} - Promise resolving to notification templates
   */
  async getTemplates() {
    return await apiClient.get('/notifications/templates');
  }

  /**
   * Send custom notification
   * @param {Object} notificationData - Notification data
   * @returns {Promise} - Promise resolving to success message
   */
  async sendCustomNotification(notificationData) {
    return await apiClient.post('/notifications/send', notificationData);
  }

  /**
   * Get notification history
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to notification history
   */
  async getHistory(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`/notifications/history?${params}`);
  }

  /**
   * Export notifications
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to exported data
   */
  async exportNotifications(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`/notifications/export?${params}`, {
      responseType: 'blob'
    });
  }

  /**
   * Clear old notifications
   * @param {number} daysOld - Number of days old to clear
   * @returns {Promise} - Promise resolving to success message
   */
  async clearOldNotifications(daysOld = 30) {
    return await apiClient.delete(`/notifications/clear?days=${daysOld}`);
  }
}

export default new NotificationService();
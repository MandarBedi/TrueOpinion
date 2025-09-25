import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Patient service for Spring Boot backend integration
 */
class PatientService {
  /**
   * Get patient profile
   * @returns {Promise} - Promise resolving to patient profile
   */
  async getProfile() {
    return await apiClient.get(API_ENDPOINTS.PATIENT.PROFILE);
  }

  /**
   * Update patient profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - Promise resolving to updated profile
   */
  async updateProfile(profileData) {
    return await apiClient.put(API_ENDPOINTS.PATIENT.PROFILE, profileData);
  }

  /**
   * Get patient applications
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to applications list
   */
  async getApplications(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.APPLICATIONS}?${params}`);
  }

  /**
   * Get application by ID
   * @param {string} applicationId - Application ID
   * @returns {Promise} - Promise resolving to application details
   */
  async getApplication(applicationId) {
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.APPLICATIONS}/${applicationId}`);
  }

  /**
   * Submit new application
   * @param {Object} applicationData - Application data
   * @returns {Promise} - Promise resolving to created application
   */
  async submitApplication(applicationData) {
    return await apiClient.post(API_ENDPOINTS.PATIENT.APPLICATIONS, applicationData);
  }

  /**
   * Cancel application
   * @param {string} applicationId - Application ID
   * @returns {Promise} - Promise resolving to success message
   */
  async cancelApplication(applicationId) {
    return await apiClient.delete(`${API_ENDPOINTS.PATIENT.APPLICATIONS}/${applicationId}`);
  }

  /**
   * Get available doctors
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to doctors list
   */
  async getDoctors(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.DOCTORS}?${params}`);
  }

  /**
   * Get doctor details
   * @param {string} doctorId - Doctor ID
   * @returns {Promise} - Promise resolving to doctor details
   */
  async getDoctor(doctorId) {
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.DOCTORS}/${doctorId}`);
  }

  /**
   * Get payment history
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to payment history
   */
  async getPaymentHistory(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.PAYMENTS}?${params}`);
  }

  /**
   * Get payment details
   * @param {string} paymentId - Payment ID
   * @returns {Promise} - Promise resolving to payment details
   */
  async getPayment(paymentId) {
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.PAYMENTS}/${paymentId}`);
  }

  /**
   * Get notifications
   * @param {Object} filters - Filter parameters
   * @returns {Promise} - Promise resolving to notifications list
   */
  async getNotifications(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiClient.get(`${API_ENDPOINTS.PATIENT.NOTIFICATIONS}?${params}`);
  }

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} - Promise resolving to success message
   */
  async markNotificationRead(notificationId) {
    return await apiClient.patch(`${API_ENDPOINTS.PATIENT.NOTIFICATIONS}/${notificationId}/read`);
  }

  /**
   * Mark all notifications as read
   * @returns {Promise} - Promise resolving to success message
   */
  async markAllNotificationsRead() {
    return await apiClient.patch(`${API_ENDPOINTS.PATIENT.NOTIFICATIONS}/mark-all-read`);
  }

  /**
   * Upload medical reports
   * @param {File} file - File to upload
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} - Promise resolving to uploaded file data
   */
  async uploadReport(file, onProgress) {
    return await apiClient.uploadFile('/files/upload', file, onProgress);
  }

  /**
   * Download medical report
   * @param {string} fileId - File ID
   * @param {string} filename - Filename for download
   * @returns {Promise} - Promise resolving to file download
   */
  async downloadReport(fileId, filename) {
    return await apiClient.get(`/files/download/${fileId}`, {
      responseType: 'blob'
    });
  }
}

export default new PatientService();
import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Authentication service for Spring Boot backend
 */
class AuthService {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise resolving to user data and token
   */
  async login(email, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password
    });
    
    return response;
  }
  
  /**
   * Register new user (patient or doctor)
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise resolving to success message
   */
  async register(userData,userRole) {
    if(userRole=='PATIENT'){
      console.log("url "+API_ENDPOINTS.AUTH.REGISTER_PATIENT);
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER_PATIENT, userData);
    }else{
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER_DOCTOR, userData);
    }
    return response;
  }
  
  /**
   * Handle forgot password request
   * @param {string} email - User email
   * @returns {Promise} - Promise resolving to success message
   */
  async forgotPassword(email) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response;
  }
  
  /**
   * Validate JWT token
   * @param {string} token - JWT token
   * @returns {Promise} - Promise resolving to user data
   */
  async validateToken(token) {
    const response = await apiClient.get('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  }

  /**
   * Refresh authentication token
   * @returns {Promise} - Promise resolving to new token
   */
  async refreshToken() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
    return response;
  }

  /**
   * Logout user
   * @returns {Promise} - Promise resolving to success message
   */
  async logout() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response;
  }
}

export default new AuthService();
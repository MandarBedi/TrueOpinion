import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/constants';
import { API_ENDPOINTS } from '../config/api';

/**
 * Enhanced API client with interceptors, error handling, and circuit breaker
 */
class ApiClient {
  failureCount = 0;
  circuitBreakerTimeout = null;
  circuitOpen = false;
  
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        ...API_CONFIG.headers,
        'X-App-Version': import.meta.env.VITE_APP_VERSION || '1.0.0',
      },
      withCredentials: false,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    // Circuit breaker implementation
    const checkCircuitBreaker = () => {
      if (this.failureCount >= API_CONFIG.retry.maxFailures) {
        this.circuitOpen = true;
        this.circuitBreakerTimeout = setTimeout(() => {
          this.circuitOpen = false;
          this.failureCount = 0;
        }, API_CONFIG.retry.resetTimeout);
        return true;
      }
      return false;
    };

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

        // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.client(originalRequest);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const { data } = await this.client.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
            localStorage.setItem('token', data.token);
            this.client.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            processQueue(null, data.token);
            return this.client(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        if (checkCircuitBreaker()) {
          return Promise.reject(new Error('Circuit breaker is open'));
        }

        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  handleError(error) {
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        this.failureCount++;
        toast.error('Request timeout. Please try again.');
      } else {
        this.failureCount++;
        toast.error('Network error. Please check your connection.');
      }
      return;
    }

    const { status, data } = error.response;
    const errorMessage = data?.message || data?.error || 'An unexpected error occurred.';
    
    switch (status) {
      case 401:
        this.handleUnauthorized();
        break;
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error('The requested resource was not found.');
        break;
      case 422:
        this.handleValidationError(data);
        break;
      case 429:
        this.failureCount++;
        toast.error('Too many requests. Please try again later.');
        break;
      case 500:
        this.failureCount++;
        toast.error('Server error. Please try again later.');
        break;
      default:
        this.failureCount++;
        toast.error(errorMessage);
    }
  }

  handleUnauthorized() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    toast.error('Session expired. Please login again.');
  }

  handleValidationError(data) {
    if (data.errors && Array.isArray(data.errors)) {
      data.errors.forEach(error => toast.error(error.message));
    } else {
      toast.error(data.message || 'Validation error.');
    }
  }

  // HTTP methods
  async get(url, config = {}) {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post(url, data = {}, config = {}) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put(url, data = {}, config = {}) {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch(url, data = {}, config = {}) {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  // File upload with progress
  async uploadFile(url, file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  }
}

export default new ApiClient();
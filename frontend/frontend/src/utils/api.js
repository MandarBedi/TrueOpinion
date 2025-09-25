import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG, ERROR_MESSAGES } from '../config/constants';

/**
 * Axios instance with default configuration for Spring Boot backend
 * @deprecated Use apiClient from services/apiClient.js instead
 */
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

/**
 * Request interceptor to add auth token
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common errors
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (!response) {
      // Network error
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      return Promise.reject(error);
    }

    const { status, data } = response;
    let errorMessage = data?.message || ERROR_MESSAGES.GENERIC_ERROR;

    switch (status) {
      case 400:
        errorMessage = data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case 401:
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        break;
      case 403:
        errorMessage = ERROR_MESSAGES.FORBIDDEN;
        break;
      case 404:
        errorMessage = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 429:
        errorMessage = 'Too many requests. Please try again later.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        errorMessage = data?.message || ERROR_MESSAGES.GENERIC_ERROR;
    }

    // Don't show toast for certain status codes that are handled elsewhere
    if (![401, 404].includes(status)) {
      toast.error(errorMessage);
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
      status
    });
  }
);

/**
 * Check if token is expired
 */
export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  const tokenExpiry = localStorage.getItem('token_expiry');
  
  if (!token || !tokenExpiry) {
    return true;
  }
  
  return Date.now() > parseInt(tokenExpiry);
};

/**
 * Set auth token with expiry
 */
export const setAuthToken = (token) => {
  const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  localStorage.setItem('token', token);
  localStorage.setItem('token_expiry', expiry.toString());
};

/**
 * Clear auth data
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('token_expiry');
  localStorage.removeItem('user');
};

/**
 * Retry failed requests with exponential backoff
 */
export const retryRequest = async (requestFn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Don't retry on certain status codes
      if (error.status && [400, 401, 403, 404, 422].includes(error.status)) {
        break;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Upload file with progress tracking
 */
export const uploadFile = (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
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
};

/**
 * Download file
 */
export const downloadFile = async (url, filename) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    toast.error('Failed to download file');
    throw error;
  }
};

export default api;
// Application constants
export const APP_NAME = 'True Opinion';
export const COPYRIGHT = '© 2025 True Opinion. All rights reserved.';

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  retry: {
    retries: 3,
    maxFailures: 5,
    initialDelayMs: 1000,
    maxDelayMs: 5000,
    resetTimeout: 30000,
    shouldRetry: (error) => {
      const { status } = error.response || {};
      return !status || status >= 500 || status === 429;
    },
  },
  timeouts: {
    DEFAULT: 30000,
    UPLOAD: 120000,
    DOWNLOAD: 60000,
  },
};

// Medical Specialties (consolidated from utils/constants.js)
export const MEDICAL_SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Oncology',
  'Gastroenterology',
  'Endocrinology',
  'Pulmonology',
  'Nephrology',
  'Hematology',
  'Rheumatology',
  'Infectious Disease',
  'Emergency Medicine',
  'Family Medicine',
  'Internal Medicine',
  'Ophthalmology',
  'ENT',
  'Urology',
  'Gynecology'
];

// Availability days
export const AVAILABILITY_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Time slots
export const TIME_SLOTS = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00'
];

// User status options
export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Application status options
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  CANCELLED: 'cancelled',
};

// Payment status options
export const PAYMENT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
  REFUNDED: 'refunded',
};

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
};

// File upload limits
export const FILE_UPLOAD_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB (reduced from 10MB for consistency)
  allowedTypes: ['application/pdf'],
  maxFiles: 5,
};

// Status options
export const STATUS_OPTIONS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  APPLICATION_SUBMITTED: 'application_submitted',
  APPLICATION_REVIEWED: 'application_reviewed',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  DOCTOR_APPROVED: 'doctor_approved',
  DOCTOR_REJECTED: 'doctor_rejected',
  PROFILE_UPDATED: 'profile_updated',
  SYSTEM_MAINTENANCE: 'system_maintenance',
  GENERAL: 'general'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size must be less than 5MB.',
  INVALID_FILE_TYPE: 'Only PDF files are allowed.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  DUPLICATE_APPLICATION: 'You already have a pending application with this doctor.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  REGISTRATION_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully.',
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  DOCTOR_APPROVED: 'Doctor approved successfully.',
  DOCTOR_REJECTED: 'Doctor rejected successfully.',
  NOTIFICATION_SENT: 'Notification sent successfully.',
  FILE_UPLOADED: 'File uploaded successfully.',
  AVAILABILITY_UPDATED: 'Availability updated successfully.'
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MIN_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  PHONE_MIN_LENGTH: 10,
  LICENSE_MIN_LENGTH: 5,
  EXPERIENCE_MIN: 0,
  EXPERIENCE_MAX: 50,
  FEE_MIN: 25,
  FEE_MAX: 500
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^\+?[\d\s-()]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^\d+$/
};

export const SPECIALTIES = MEDICAL_SPECIALTIES;

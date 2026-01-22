// API endpoints configuration for Spring Boot backend
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER_PATIENT: '/auth/register/patient',
    REGISTER_DOCTOR: '/auth/register/doctor',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate',
  },
  
  // Patient endpoints
  PATIENT: {
    PROFILE: '/patient/profile',
    APPLICATIONS: '/patient/applications',
    DOCTORS: '/patient/doctors',
    PAYMENTS: '/patient/payments',
    NOTIFICATIONS: '/patient/notifications',
  },
  
  // Doctor endpoints
  DOCTOR: {
    PROFILE: '/doctor/profile',
    APPLICATIONS: '/doctor/applications',
    AVAILABILITY: '/doctor/availability',
    EARNINGS: '/doctor/earnings',
    NOTIFICATIONS: '/doctor/notifications',
  },
  
  // Admin endpoints
  ADMIN: {
    USERS: '/admin/users',
    DOCTORS_PENDING: '/admin/doctors/pending',
    DOCTORS_APPROVE: '/admin/doctors/approve',
    DOCTORS_REJECT: '/admin/doctors/reject',
    DOCTORS_BULK: '/admin/doctors/bulk',
    NOTIFICATIONS: '/admin/notifications',
    ANALYTICS: '/admin/analytics',
  },
  
  // File upload
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (fileId) => `/files/download/${fileId}`,
    INFO: (fileId) => `/files/${fileId}`,
    DELETE: (fileId) => `/files/${fileId}`,
    PREVIEW: (fileId) => `/files/preview/${fileId}`,
    BY_APPLICATION: (applicationId) => `/files/application/${applicationId}`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
  },

  // Public endpoints
  PUBLIC: {
    STATS: '/public/stats',
    CONTACT: '/public/contact',
  },
};

export default { API_ENDPOINTS };
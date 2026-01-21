import * as Yup from 'yup';
import {
  VALIDATION_RULES,
  MEDICAL_SPECIALTIES,
  REGEX_PATTERNS,
} from '../config/constants';

// Email validation regex
const EMAIL_REGEX = REGEX_PATTERNS.EMAIL;

// Password validation regex
const PASSWORD_REGEX = REGEX_PATTERNS.PASSWORD;

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const patientRegistrationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
    )
    .matches(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms of service')
    .required('You must accept the terms of service'),
});

export const doctorRegistrationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
    )
    .matches(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  specialty: Yup.string()
    .oneOf(MEDICAL_SPECIALTIES, 'Please select a valid specialty')
    .required('Specialty is required'),
  licenseNumber: Yup.string()
    .min(5, 'License number must be at least 5 characters')
    .required('License number is required'),
  yearsExperience: Yup.number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50')
    .required('Years of experience is required'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms of service')
    .required('You must accept the terms of service'),
});

export const secondOpinionSchema = Yup.object({
  description: Yup.string()
    .min(
      VALIDATION_RULES.DESCRIPTION_MIN_LENGTH,
      `Description must be at least ${VALIDATION_RULES.DESCRIPTION_MIN_LENGTH} characters`
    )
    .max(
      VALIDATION_RULES.DESCRIPTION_MAX_LENGTH,
      `Description must be less than ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} characters`
    )
    .required('Case description is required'),
});

export const profileUpdateSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),
  address: Yup.string().max(200, 'Address must be less than 200 characters'),
  medicalHistory: Yup.string().max(
    1000,
    'Medical history must be less than 1000 characters'
  ),
});

export const doctorProfileSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  specialty: Yup.string()
    .oneOf(MEDICAL_SPECIALTIES, 'Please select a valid specialty')
    .required('Specialty is required'),
  qualifications: Yup.string()
    .min(10, 'Qualifications must be at least 10 characters')
    .max(200, 'Qualifications must be less than 200 characters')
    .required('Qualifications are required'),
  fee: Yup.number()
    .min(25, 'Minimum fee is $25')
    .max(500, 'Maximum fee is $500')
    .required('Fee is required'),
  yearsExperience: Yup.number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50')
    .required('Years of experience is required'),
});

export const notificationSchema = Yup.object({
  recipient: Yup.string().required('Recipient is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
    .required('Message is required'),
});

// File validation
export const validateFile = (file) => {
  const errors = [];

  if (!file) {
    errors.push('File is required');
    return errors;
  }

  if (file.size > 5 * 1024 * 1024) {
    errors.push('File size must be less than 5MB');
  }

  if (file.type !== 'application/pdf') {
    errors.push('Only PDF files are allowed');
  }

  return errors;
};

export const validateFiles = (files, maxFiles = 5) => {
  const errors = [];

  if (!files || files.length === 0) {
    errors.push('At least one file is required');
    return errors;
  }

  if (files.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed`);
  }

  files.forEach((file, index) => {
    const fileErrors = validateFile(file);
    if (fileErrors.length > 0) {
      errors.push(`File ${index + 1}: ${fileErrors.join(', ')}`);
    }
  });

  return errors;
};

// Additional validation schemas
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
    )
    .matches(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
    )
    .matches(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const contactSchema = Yup.object({
  name: Yup.string()
    .min(VALIDATION_RULES.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(
      VALIDATION_RULES.NAME_MAX_LENGTH,
      'Name must be less than 50 characters'
    )
    .required('Name is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

// Utility functions for validation
export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return (
    password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH &&
    PASSWORD_REGEX.test(password)
  );
};

export const validatePhone = (phone) => {
  return (
    REGEX_PATTERNS.PHONE.test(phone) &&
    phone.length >= VALIDATION_RULES.PHONE_MIN_LENGTH
  );
};

export const validateFileSize = (file, maxSize = 5 * 1024 * 1024) => {
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes = ['application/pdf']) => {
  return allowedTypes.includes(file.type);
};

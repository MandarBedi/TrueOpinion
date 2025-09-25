import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { patientRegistrationSchema } from '../utils/validation';
import authService from '../services/authService';
import Header from '../components/Layout/Header';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';

const PatientRegister = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Test function to check backend connectivity
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register/patient');
      const result = await response.text();
      console.log('Backend test result:', result);
      toast.success('Backend is reachable: ' + result);
    } catch (error) {
      console.error('Backend test failed:', error);
      toast.error('Backend test failed: ' + error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      termsAccepted: false,
    },
    validationSchema: patientRegistrationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Test backend first
        // await testBackend();
        
        // Remove extra fields and send only what backend expects
        const registrationData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          termsAccepted: values.termsAccepted,
          role: 'PATIENT'
        };
        await authService.register(registrationData,registrationData.role);

        setSuccess(true);
        toast.success('Registration successful!');
      } catch (error) {
        toast.error(error.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    },
  });

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-16 px-4">
          <div className="max-w-md w-full">
            <div className="card text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
                <p className="text-gray-600 mb-6">
                Your patient account has been created successfully. Please log
                in to continue.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary w-full"
                >
                Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Patient Registration</h2>
              <p className="text-gray-600 mt-2">Create your account to get started</p>
            </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${
                  formik.touched.name && formik.errors.name ? 'error' : ''
                }`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="form-error">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${
                  formik.touched.email && formik.errors.email ? 'error' : ''
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="form-error">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                  className={`form-input pr-10 ${
                  formik.touched.password && formik.errors.password
                    ? 'error'
                    : ''
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  placeholder="Create a strong password"
              />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="form-error">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'error'
                    : ''
                }`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="form-error">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${
                  formik.touched.phone && formik.errors.phone
                    ? 'error'
                    : ''
                }`}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="form-error">{formik.errors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <div className="flex items-start">
                <input
                  className="mt-1 mr-2"
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                />
                <label className="text-sm text-gray-600" htmlFor="termsAccepted">
                  I accept the{' '}
                  <a href="#terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                <div className="form-error">{formik.errors.termsAccepted}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-base font-semibold"
              disabled={loading || !formik.isValid}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={20} color="white" className="mr-2" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
              Login here
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;

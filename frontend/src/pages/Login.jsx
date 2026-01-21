import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { loginSchema } from '../utils/validation';
import authService from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';
import CookieConsent from '../components/Common/CookieConsent';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';
import { USER_ROLES } from '../config/constants';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authService.login(values.email, values.password);
        login(response.data.user, response.data.token);
        toast.success('Login successful!');
        if (response.data.user.role === USER_ROLES.ADMIN) navigate('/admin');
        else if (response.data.user.role === USER_ROLES.DOCTOR) navigate('/doctor');
        else navigate('/patient');
      } catch (error) {
        toast.error(error.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>
            
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="form-error">{formik.errors.email}</div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input pr-10 ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-base font-semibold"
              disabled={loading || !formik.isValid}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={20} color="white" className="mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register/patient" className="text-primary-600 hover:text-primary-500 font-medium">
                Register as Patient
              </Link>
              {' '}or{' '}
              <Link to="/register/doctor" className="text-primary-600 hover:text-primary-500 font-medium">
                Register as Doctor
              </Link>
            </p>
          </div>
          

          </div>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Login;
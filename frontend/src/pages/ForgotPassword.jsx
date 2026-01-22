import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { forgotPasswordSchema } from '../utils/validation';
import authService from '../services/authService';
import Header from '../components/Layout/Header';
import FormField from '../components/Common/FormField';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await authService.forgotPassword(values.email);
        setSuccess(true);
        toast.success('Password reset instructions sent to your email');
      } catch (error) {
        toast.error(error.message || 'Failed to send reset instructions');
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
            <Card className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the link to reset your password.
              </p>
              <div className="space-y-3">
                <Link to="/login" className="btn btn-primary w-full">
                  Back to Login
                </Link>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn btn-secondary w-full"
                >
                  Try Different Email
                </button>
              </div>
            </Card>
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
          <Card>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you instructions to reset your password
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!formik.isValid || !formik.values.email}
                className="mb-4"
              >
                Send Reset Instructions
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
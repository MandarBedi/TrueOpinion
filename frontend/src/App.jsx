import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_ROLES } from './config/constants';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const Contact = React.lazy(() => import('./pages/Contact'));
const PatientRegister = React.lazy(() => import('./pages/PatientRegister'));
const DoctorRegister = React.lazy(() => import('./pages/DoctorRegister'));

// Public pages
const About = React.lazy(() => import('./pages/About'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const Terms = React.lazy(() => import('./pages/Terms'));

// Admin Pages
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminNotifications = React.lazy(() =>
  import('./pages/Admin/AdminNotifications')
);
const UserManagement = React.lazy(() => import('./pages/Admin/UserManagement'));
const AdminProfile = React.lazy(() => import('./pages/Admin/AdminProfile'));

// Patient Pages
const PatientDashboard = React.lazy(() => import('./pages/Patient/PatientDashboard'));
const PatientApplications = React.lazy(() =>
  import('./pages/Patient/PatientApplications')
);
const PatientProfile = React.lazy(() => import('./pages/Patient/PatientProfile'));
const PatientNotifications = React.lazy(() =>
  import('./pages/Patient/PatientNotifications')
);
const PaymentHistory = React.lazy(() => import('./pages/Patient/PaymentHistory'));

// Doctor Pages
const DoctorDashboard = React.lazy(() => import('./pages/Doctor/DoctorDashboard'));
const DoctorProfile = React.lazy(() => import('./pages/Doctor/DoctorProfile'));
const DoctorAvailability = React.lazy(() =>
  import('./pages/Doctor/DoctorAvailability')
);
const DoctorEarnings = React.lazy(() => import('./pages/Doctor/DoctorEarnings'));
const DoctorNotifications = React.lazy(() =>
  import('./pages/Doctor/DoctorNotifications')
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register/patient" element={<PatientRegister />} />
              <Route path="/register/doctor" element={<DoctorRegister />} />

              {/* Public Information Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <AdminNotifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />

              {/* Patient Routes */}
              <Route
                path="/patient"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PATIENT]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/applications"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PATIENT]}>
                    <PatientApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/profile"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PATIENT]}>
                    <PatientProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/payments"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PATIENT]}>
                    <PaymentHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/notifications"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.PATIENT]}>
                    <PatientNotifications />
                  </ProtectedRoute>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/profile"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
                    <DoctorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/availability"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
                    <DoctorAvailability />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/earnings"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
                    <DoctorEarnings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/notifications"
                element={
                  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
                    <DoctorNotifications />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import NotificationsList from '../../components/Common/NotificationsList';
import apiClient from '../../services/apiClient';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get('/patient/notifications');
      setNotifications(response.data);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="patient-notifications">
        <h1>Notifications</h1>
        <NotificationsList notifications={notifications} loading={loading} />
      </div>
    </DashboardLayout>
  );
};

export default PatientNotifications;

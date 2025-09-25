import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import notificationService from '../services/notificationService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for managing notifications
 * @returns {Object} Notifications state and methods
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  /**
   * Fetch notifications from API
   */
  const fetchNotifications = useCallback(async (page = 1, limit = 10) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await notificationService.getNotifications({ page, limit });
      
      setNotifications(response.notifications || response.data || []);
      setUnreadCount(response.unreadCount || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(async (notificationId) => {
    if (!user) return;
    
    try {
      await notificationService.markAsRead(notificationId);
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast.error('Failed to update notification');
    }
  }, [user]);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    
    try {
      await notificationService.markAllAsRead();
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  }, [user]);

  /**
   * Add new notification (for real-time updates)
   */
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  // Fetch notifications on mount and user change
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  return {
    notifications,
    loading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};

export default useNotifications;
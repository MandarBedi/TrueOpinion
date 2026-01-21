import React from 'react';
import './NotificationsList.css';

const NotificationsList = ({ notifications, loading }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="card text-center">
        <p>No notifications found</p>
      </div>
    );
  }

  return (
    <div className="notifications-list">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification-item card ${!notification.read ? 'unread' : ''}`}
        >
          <div className="notification-content">
            <p className="notification-message">{notification.message}</p>
            <span className="notification-time">{formatDate(notification.timestamp)}</span>
          </div>
          {!notification.read && <div className="unread-indicator"></div>}
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
import BaseService from '../core/service';

class NotificationService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actGetNotifications = (params) => {
    return this.get('/notifications', params);
  };

  actGetNotification = (params) => {
    return this.get('/notifications/notification', params);
  };

  actGetNotificationById = (id) => {
    return this.get(`/notifications/${id}`);
  };

  actPostNotificationsStatus = (type) => {
    return this.post('/notifications/status', { type });
  };

  actPostNotificationPush = (params) => {
    return this.post('/notifications/push', params);
  };
}

export default NotificationService;

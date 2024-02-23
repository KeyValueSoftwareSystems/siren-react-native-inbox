import type { NotificationDataType } from 'bilta-sdk/dist/types';

import { useSirenContext } from '../components/sirenProvider';
import { sirenReducerTypes, updateNotificationsTypes } from './constants';

const useSiren = () => {
  const { sirenCore, notifications, dispatch } = useSirenContext();

  const markAsRead = async (id: string) => {
    if (sirenCore && id?.length > 0) {
      const response = await sirenCore?.markNotificationAsReadById(id);

      if (response.data) updateNotifications(updateNotificationsTypes.MARK_ITEM_AS_READ, id);

      return response;
    }
  };

  const markNotificationsAllAsRead = async () => {
    if (sirenCore) {
      const response = await sirenCore?.markAllNotificationsAsRead();

      if (response.data) updateNotifications(updateNotificationsTypes.MARK_ALL_AS_READ);

      return response;
    }
  };

  const deleteNotification = async (id: string) => {
    if (sirenCore && id?.length > 0) {
      const response = await sirenCore?.deleteNotificationById(id);

      if (response.data) updateNotifications(updateNotificationsTypes.DELETE_ITEM, id);

      return response;
    }
  };

  const clearAllNotification = async () => {
    if (sirenCore) {
      const response = await sirenCore.clearAllNotifications();

      if (response.data) updateNotifications(updateNotificationsTypes.DELETE_ALL_ITEM);

      return response;
    }
  };

  const markNotificationsAsViewed = () => {
    if (sirenCore) sirenCore?.markNotificationsAsViewed();
  };

  const updateNotifications = (type: updateNotificationsTypes, id?: string) => {
    let updatedNotifications: NotificationDataType[];

    switch (type) {
      case updateNotificationsTypes.MARK_ITEM_AS_READ:
        updatedNotifications = notifications.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        );
        dispatch({ type: sirenReducerTypes.SET_NOTIFICATIONS, payload: updatedNotifications });
        break;
      case updateNotificationsTypes.MARK_ALL_AS_READ:
        updatedNotifications = notifications.map((item) => ({ ...item, isRead: true }));
        dispatch({ type: sirenReducerTypes.SET_NOTIFICATIONS, payload: updatedNotifications });
        break;

      case updateNotificationsTypes.DELETE_ITEM:
        updatedNotifications = notifications.filter((item) => item.id != id);
        dispatch({ type: sirenReducerTypes.SET_NOTIFICATIONS, payload: updatedNotifications });
        break;

      case updateNotificationsTypes.DELETE_ALL_ITEM:
        updatedNotifications = [];
        dispatch({ type: sirenReducerTypes.SET_NOTIFICATIONS, payload: updatedNotifications });
        break;

      default:
        break;
    }
  };

  return {
    markNotificationsAllAsRead,
    markAsRead,
    deleteNotification,
    clearAllNotification,
    markNotificationsAsViewed
  };
};

export default useSiren;

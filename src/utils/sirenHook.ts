import type {
  NotificationDataType,
} from "test_notification/dist/types";

import { useSirenContext } from "../components/sirenProvider";
import { errorMap, sirenReducerTypes, updateNotificationsTypes } from "./constants";

const useSiren = () => {
  const { sirenCore, notifications, dispatch } = useSirenContext();

  const markAsRead = async (id: string) => {
    if (sirenCore) 
      if (id?.length > 0) {
        const response = await sirenCore?.markNotificationAsReadById(id);

        if (response.data)
          updateNotifications(updateNotificationsTypes.MARK_ITEM_AS_READ, id);

        return response;
      } else {
        return {error: errorMap.MISSING_PARAMETER};
      }
    
    return {error: errorMap.SIREN_OBJECT_NOT_FOUND};
  };

  const markNotificationsAsReadByDate = async (untilDate: string) => {
    if (sirenCore && untilDate) {
      const response = await sirenCore?.markNotificationsAsReadByDate(untilDate);

      if (response.data)
        updateNotifications(updateNotificationsTypes.MARK_ALL_AS_READ);

      return response;
    }

    return {error: errorMap.SIREN_OBJECT_NOT_FOUND};
  };

  const deleteNotification = async (id: string) => {
    if (sirenCore) 
      if (id?.length > 0) {
        const response = await sirenCore?.deleteNotificationById(id);

        if (response.data)
          updateNotifications(updateNotificationsTypes.DELETE_ITEM, id);

        return response;
      } else {
        return {error: errorMap.MISSING_PARAMETER};
      }
    
    return {error: errorMap.SIREN_OBJECT_NOT_FOUND};
  };

  const clearAllNotificationByDate = async (untilDate: string) => {
    if (sirenCore && untilDate) {
      const response = await sirenCore.clearNotificationsByDate(untilDate);

      if (response.data)
        updateNotifications(updateNotificationsTypes.DELETE_ALL_ITEM);

      return response;
    }

    return {error: errorMap.SIREN_OBJECT_NOT_FOUND};
  };

  const markNotificationsAsViewed = async (untilDate: string) => {
    if (sirenCore && untilDate) {
      const response = await sirenCore?.markNotificationsAsViewed(untilDate);

      if (response.data)
        updateNotifications(updateNotificationsTypes.MARK_ITEM_AS_VIEWED);

      return response;
    }

    return {error: errorMap.SIREN_OBJECT_NOT_FOUND};
  };

  const updateNotifications = (type: updateNotificationsTypes, id?: string) => {
    let updatedNotifications: NotificationDataType[];

    switch (type) {
      case updateNotificationsTypes.MARK_ITEM_AS_READ:
        updatedNotifications = notifications.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        );
        dispatch({
          type: sirenReducerTypes.SET_NOTIFICATIONS,
          payload: updatedNotifications,
        });
        break;
      case updateNotificationsTypes.MARK_ALL_AS_READ:
        updatedNotifications = notifications.map((item) => ({
          ...item,
          isRead: true,
        }));
        dispatch({
          type: sirenReducerTypes.SET_NOTIFICATIONS,
          payload: updatedNotifications,
        });
        break;

      case updateNotificationsTypes.DELETE_ITEM:
        updatedNotifications = notifications.filter((item) => item.id != id);
        dispatch({
          type: sirenReducerTypes.SET_NOTIFICATIONS,
          payload: updatedNotifications,
        });
        break;

      case updateNotificationsTypes.DELETE_ALL_ITEM:
        updatedNotifications = [];
        dispatch({
          type: sirenReducerTypes.SET_NOTIFICATIONS,
          payload: updatedNotifications,
        });
        break;

      case updateNotificationsTypes.MARK_ITEM_AS_VIEWED:
        dispatch({
          type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
          payload: 0,
        });
        break;

      default:
        break;
    }
  };

  return {
    markNotificationsAsReadByDate,
    markAsRead,
    deleteNotification,
    clearAllNotificationByDate,
    markNotificationsAsViewed,
  };
};

export default useSiren;
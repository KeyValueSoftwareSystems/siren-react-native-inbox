import PubSub from 'pubsub-js';

import { errorMap, events, eventTypes } from './constants';
import { useSirenContext } from '../components/sirenProvider';

const useSiren = () => {
  const { siren } = useSirenContext();

  const markAsRead = async (id: string) => {
    if (siren)
      if (id?.length > 0) {
        const response = await siren?.markNotificationAsReadById(id);

        if (response.data) {
          const payload = { id, action: eventTypes.MARK_ITEM_AS_READ };

          PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markNotificationsAsReadByDate = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren?.markNotificationsAsReadByDate(untilDate);

      if (response.data) {
        const payload = { action: eventTypes.MARK_ALL_AS_READ };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteNotification = async (id: string) => {
    if (siren)
      if (id?.length > 0) {
        const response = await siren?.deleteNotificationById(id);

        if (response.data) {
          const payload = { id, action: eventTypes.DELETE_ITEM };

          PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteNotificationsByDate = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren.deleteNotificationsByDate(untilDate);

      if (response.data) {
        const payload = { action: eventTypes.DELETE_ALL_ITEM };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markNotificationsAsViewed = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren?.markNotificationsAsViewed(untilDate);

      if (response.data) {
        const payload = { unviewedCount: 0, action: eventTypes.UPDATE_NOTIFICATIONS_COUNT };

        PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  return {
    markNotificationsAsReadByDate,
    markAsRead,
    deleteNotification,
    deleteNotificationsByDate,
    markNotificationsAsViewed
  };
};

export default useSiren;
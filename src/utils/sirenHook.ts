import PubSub from 'pubsub-js';

import { errorMap, events, eventTypes } from './constants';
import { useSirenContext } from '../components/sirenProvider';

const useSiren = () => {
  const { siren } = useSirenContext();

  const markAsReadById = async (id: string) => {
    if (siren)
      if (id?.length > 0) {
        const response = await siren?.markAsReadById(id);

        if (response?.data) {
          const payload = { id, action: eventTypes.MARK_ITEM_AS_READ };

          PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markAsReadByDate = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren?.markAsReadByDate(untilDate);

      if (response?.data) {
        const payload = { action: eventTypes.MARK_ALL_AS_READ };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteById = async (id: string, shouldUpdateList: boolean = true) => {
    if (siren)
      if (id?.length > 0) {
        const response = await siren?.deleteById(id);

        if (response?.data && shouldUpdateList) {
          const payload = { id, action: eventTypes.DELETE_ITEM };

          PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteByDate = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren.deleteByDate(untilDate);

      if (response?.data) {
        const payload = { action: eventTypes.DELETE_ALL_ITEM };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markAllAsViewed = async (untilDate: string) => {
    if (siren && untilDate) {
      const response = await siren?.markAllAsViewed(untilDate);

      if (response?.data) {
        const payload = { unviewedCount: 0, action: eventTypes.UPDATE_NOTIFICATIONS_COUNT };

        PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  return {
    markAsReadByDate,
    markAsReadById,
    deleteById,
    deleteByDate,
    markAllAsViewed
  };
};

export default useSiren;
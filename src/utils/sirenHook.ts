import { useSirenContext } from '../components/sirenProvider';

const useSiren = () => {
  const { sirenCore } = useSirenContext();

  const markAsRead = (id: string) => {
    if (sirenCore && id?.length > 0) sirenCore?.markNotificationAsReadById(id);
  };

  const markNotificationsAllAsRead = () => {
    if (sirenCore) sirenCore?.markAllNotificationsAsRead();
  };

  const deleteNotification = (id: string) => {
    if (sirenCore && id?.length > 0) sirenCore?.deleteNotificationById(id);
  };

  const clearAllNotification = async () => {
    // TODO: to refactor
    if (sirenCore) {
      const error = await sirenCore.clearAllNotifications();

      return { error };
    }

    return { error: new Error('SirenCore is not initialized') };
  };

  const markNotificationsAsViewed = () => {
    if (sirenCore) sirenCore?.markNotificationsAsViewed();
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

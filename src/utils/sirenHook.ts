import { useSirenContext } from '../components/sirenProvider';

const useSiren = () => {
  const { sirenCore } = useSirenContext();

  const markAsRead = (id: string) => {
    if (sirenCore && id?.length > 0) sirenCore?.markAsReadById(id);
  };

  const markNotificationsAllAsRead = () => {
    if (sirenCore) sirenCore?.markAllNotificationsAsRead();
  };

  const deleteNotification = (id: string) => {
    if (sirenCore && id?.length > 0) sirenCore?.deleteNotificationById(id);
  };

  const clearAllNotification = () => {
    if (sirenCore) sirenCore?.clearAllNotifications();
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

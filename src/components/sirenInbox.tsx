import type { ReactElement } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import type { Siren } from 'test_notification';
import type { NotificationDataType, SirenErrorType } from 'test_notification/dist/esm/types';
import PubSub from 'pubsub-js';

import { Constants, useSiren, CommonUtils } from '../utils';
import { useSirenContext } from './sirenProvider';
import type { SirenInboxProps } from '../types';
import LoadingWindow from './loadingWindow';
import EmptyWindow from './emptyWindow';
import ErrorWindow from './errorWindow';
import Header from './header';
import Card from './card';

const { DEFAULT_WINDOW_TITLE, ThemeMode, events } = Constants;
const { applyTheme, isNonEmptyArray, updateNotifications } = CommonUtils;

type fetchProps = {
  size: number;
  end?: string;
  start?: string;
};

/**
 * `SirenInbox` is a React component that displays a list of notifications fetched from the Siren SDK.
 *
 * @component
 * @example
 * const theme = {
 *   dark: { /* dark theme styles *\/ },
 *   light: { /* light theme styles *\/ }
 * };
 * <SirenInbox
 *   theme={theme}
 *   title="Notifications"
 *   hideHeader={false}
 *   darkMode={true}
 *   onError={(error) => console.log(error)}
 * />
 *
 * @param {Object} props - The props for the SirenInbox component.
 * @param {Object} [props.theme={}] - Theme object for custom styling.
 * @param {string} [props.title=DEFAULT_WINDOW_TITLE] - Title of the notification window.
 * @param {boolean} [props.hideHeader=false] - Flag to hide or show the header.
 * @param {boolean} [props.darkMode=false] - Flag to enable dark mode.
 * @param {Object} [props.cardProps={ hideAvatar: false, showMedia: true }] - Props for customizing the notification cards.
 * @param {JSX.Element} [props.listEmptyComponent=null] - Custom component to display when the notification list is empty.
 * @param {JSX.Element} [props.customHeader=null] - Custom header component.
 * @param {JSX.Element} [props.customFooter=null] - Custom footer component.
 * @param {Function} [props.customNotificationCard=null] - Custom function for rendering notification cards.
 * @param {Function} [props.onNotificationCardClick=() => null] - Callback for handling notification card clicks.
 * @param {Function} [props.onError] - Callback for handling errors.
 */
const SirenInbox = (props: SirenInboxProps): ReactElement => {
  const {
    theme = { dark: {}, light: {} },
    title = DEFAULT_WINDOW_TITLE,
    hideHeader = false,
    darkMode = false,
    cardProps = { hideAvatar: false, showMedia: true },
    listEmptyComponent = null,
    customHeader = null,
    customFooter = null,
    customNotificationCard = null,
    onNotificationCardClick = () => null,
    onError = () => {}
  } = props;

  const notificationsPerPage = 10;

  const { siren } = useSirenContext();

  const { deleteNotification, clearNotificationByDate, markNotificationsAsViewed } = useSiren();

  const [notifications, setNotifications] = useState<NotificationDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [eventListenerData, setEventListenerData] = useState<{
    id?: string;
    action: string;
    newNotifications?: NotificationDataType[];
    unreadCount?: number;
  } | null>(null);

  const handleMarkNotificationsAsViewed = async (newNotifications = notifications) => {
    if (isNonEmptyArray(newNotifications)) {
      const response = await markNotificationsAsViewed(newNotifications[0].createdAt);

      processError(response.error);
    }
  };

  const processError = (error?: SirenErrorType | null) => {
    if (error) {
      setIsError(true);
      if (onError) onError(error);
    }
  };

  // Clean up - stop polling when component unmounts
  const cleanUp = () => () => {
    siren?.stopRealTimeNotificationFetch();
    setNotifications([]);
    handleMarkNotificationsAsViewed();
  };

  const notificationSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    setEventListenerData(data);
  };

  useEffect(() => {
    PubSub.subscribe(events.NOTIFICATION_LIST_EVENT, notificationSubscriber);

    return cleanUp();
  }, []);

  useEffect(() => {
    // Initialize Siren SDK and start polling notifications
    initialize();
  }, [siren]);

  useEffect(() => {
    if (eventListenerData) {
      const updatedNotifications: NotificationDataType[] = updateNotifications(eventListenerData, notifications);

      setNotifications(updatedNotifications);
      setEventListenerData(null);
    }
  }, [eventListenerData]);

  // Initialize Siren SDK and fetch notifications
  const initialize = async (): Promise<void> => {
    const readyForInitialize = siren && !isError;

    if (readyForInitialize) {
      const allNotifications = await fetchNotifications(siren, true);
      const notificationParams: fetchProps = { size: notificationsPerPage };

      if (isNonEmptyArray(allNotifications))
        notificationParams.start = allNotifications[0].createdAt;
      siren?.startRealTimeNotificationFetch(notificationParams);
    }
  };

  const createFetchNotificationParams = (attachEndDate: boolean): fetchProps => {
    const notificationParams: fetchProps = { size: notificationsPerPage };

    if (attachEndDate) notificationParams.end = notifications[notifications.length - 1].createdAt;

    return notificationParams;
  };

  const processResponse = (
    nonEmptyResponse: boolean,
    isResetList: boolean,
    responseData: NotificationDataType[]
  ): void => {
    if (nonEmptyResponse) {
      const updatedNotifications = isResetList ? responseData : [...notifications, ...responseData];

      isResetList && handleMarkNotificationsAsViewed(updatedNotifications);
      setNotifications(updatedNotifications);
    } else {
      setEndReached(true);
    }
  };

  // Fetch notifications
  const fetchNotifications = async (
    siren: Siren,
    isResetList = false
  ): Promise<NotificationDataType[]> => {
    setIsError(false);
    setIsLoading(true);
    if (siren) {
      const notificationParams = createFetchNotificationParams(!isResetList);
      const response = await siren.fetchAllNotifications(notificationParams);
      const nonEmptyResponse = Boolean(isNonEmptyArray(response?.data));

      if (response?.data) processResponse(nonEmptyResponse, isResetList, response.data);
      if (response?.error) processError(response.error);

      setIsLoading(false);
    }

    return notifications;
  };

  // Apply theme styles
  const styles = useMemo(
    () =>
      applyTheme(
        darkMode ? theme?.dark : theme?.light,
        darkMode ? ThemeMode.DARK : ThemeMode.LIGHT
      ),
    [theme, darkMode]
  );

  // Refresh notifications
  const onRefresh = async (): Promise<void> => {
    if (siren) {
      setEndReached(false);
      setIsError(false);
      setNotifications([]);
      siren?.stopRealTimeNotificationFetch();
      const allNotifications = (await fetchNotifications(siren, true)) || [];
      const notificationParams: fetchProps = { size: notificationsPerPage };

      if (isNonEmptyArray(allNotifications))
        notificationParams.start = allNotifications[0].createdAt;

      siren?.startRealTimeNotificationFetch(notificationParams);
    }
  };

  // Load more notifications when reaching end of list
  const onEndReached = (): void => {
    const fetchMore = siren && !isLoading && !endReached && isNonEmptyArray(notifications);

    if (fetchMore) fetchNotifications(siren, false);
  };

  // Render empty window, error window, or custom empty component
  const renderListEmpty = (): JSX.Element | undefined => {
    if (!isLoading) {
      if (isError) return <ErrorWindow onRetry={onRefresh} styles={styles} />;

      return listEmptyComponent || <EmptyWindow styles={styles} />;
    }
  };

  const onDelete = async (id: string): Promise<void> => {
    const response = await deleteNotification(id);

    processError(response?.error);
  };

  const onPressClearAll = async (): Promise<void> => {
    if (isNonEmptyArray(notifications)) {
      const response = await clearNotificationByDate(notifications[0].createdAt);

      if (response?.error) {
        processError(response?.error);
      } else {
        setIsLoading(false);
        setNotifications([]);
        setEndReached(false);
      }
    }
  };

  const renderDefaultNotificationCard = (item: NotificationDataType) => {
    return (
      <Card
        onCardClick={onNotificationCardClick}
        notification={item}
        cardProps={cardProps}
        styles={styles}
        onDelete={onDelete}
      />
    );
  };

  // Render notification card
  const renderCard = ({ item }: { item: NotificationDataType }): JSX.Element => {
    if (customNotificationCard) return customNotificationCard(item);

    return renderDefaultNotificationCard(item);
  };

  // Render loading window
  const renderListFooter = (): JSX.Element | null => {
    if (isLoading)
      return (
        <LoadingWindow
          theme={darkMode ? theme?.dark : theme?.light}
          mode={darkMode ? ThemeMode.DARK : ThemeMode.LIGHT}
        />
      );

    return null;
  };

  const renderHeader = (): JSX.Element | null => {
    if (customHeader) return customHeader;
    if (!hideHeader)
      return (
        <Header
          title={title}
          styles={styles}
          onPressClearAll={onPressClearAll}
          clearAllDisabled={!isNonEmptyArray(notifications)}
        />
      );

    return null;
  };

  const renderList = (): JSX.Element => {
    return (
      <FlatList
        data={notifications}
        renderItem={renderCard}
        ListEmptyComponent={renderListEmpty}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={false}
        contentContainerStyle={styles.contentContainer}
        onEndReached={onEndReached}
        ListFooterComponent={renderListFooter}
      />
    );
  };

  return (
    <View style={[style.container, styles.container]}>
      {renderHeader()}
      {renderList()}
      {customFooter || null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minWidth: 300
  }
});

export default SirenInbox;

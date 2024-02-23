import type { ReactElement } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Siren } from 'bilta-sdk';
import type { NotificationDataType, SirenErrorType } from 'bilta-sdk/dist/types';

import { Constants, useSiren, CommonUtils } from '../utils';
import { useSirenContext } from './sirenProvider';
import type { SirenInboxProps } from '../types';
import LoadingWindow from './loadingWindow';
import EmptyWindow from './emptyWindow';
import ErrorWindow from './errorWindow';
import Header from './header';
import Card from './card';

const { DEFAULT_WINDOW_TITLE, ThemeMode } = Constants;
const { logger, applyTheme } = CommonUtils;

/**
 * `SirenWindow` is a React component that displays a list of notifications fetched from the Siren SDK.
 *
 * @component
 * @example
 * const theme = {
 *   dark: { /* dark theme styles *\/ },
 *   light: { /* light theme styles *\/ }
 * };
 * <SirenWindow
 *   theme={theme}
 *   title="Notifications"
 *   hideHeader={false}
 *   darkMode={true}
 *   notificationsPerPage={10}
 *   realTimeNotificationEnabled={true}
 *   onError={(error) => console.log(error)}
 * />
 *
 * @param {Object} props - The props for the SirenWindow component.
 * @param {Object} [props.theme={}] - Theme object for custom styling.
 * @param {string} [props.title=DEFAULT_WINDOW_TITLE] - Title of the notification window.
 * @param {boolean} [props.hideHeader=false] - Flag to hide or show the header.
 * @param {boolean} [props.darkMode=false] - Flag to enable dark mode.
 * @param {number} [props.notificationsPerPage=10] - Number of notifications to fetch per page.
 * @param {Object} [props.cardProps={ hideAvatar: false, showMedia: true }] - Props for customizing the notification cards.
 * @param {JSX.Element} [props.listEmptyComponent=null] - Custom component to display when the notification list is empty.
 * @param {JSX.Element} [props.customHeader=null] - Custom header component.
 * @param {JSX.Element} [props.customFooter=null] - Custom footer component.
 * @param {Function} [props.customNotificationCard=null] - Custom function for rendering notification cards.
 * @param {Function} [props.onNotificationCardClick=() => null] - Callback for handling notification card clicks.
 * @param {boolean} [props.realTimeNotificationEnabled=false] - Flag to enable real-time notification updates.
 * @param {Function} [props.onError] - Callback for handling errors.
 */
const SirenWindow = (props: SirenInboxProps): ReactElement => {
  const {
    theme = { dark: {}, light: {} },
    title = DEFAULT_WINDOW_TITLE,
    hideHeader = false,
    darkMode = false,
    notificationsPerPage = 10,
    cardProps = { hideAvatar: false, showMedia: true },
    listEmptyComponent = null,
    customHeader = null,
    customFooter = null,
    customNotificationCard = null,
    onNotificationCardClick = () => null,
    realTimeNotificationEnabled = false,
    onError
  } = props;

  const { sirenCore, error, clearError, newNotifications, clearNewNotifications } =
    useSirenContext();

  const { deleteNotification, clearAllNotification } = useSiren();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationDataType[]>([]);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setNotifications([...newNotifications, ...notifications]);
      clearNewNotifications();
    }
  }, [newNotifications.length]);

  useEffect(() => {
    if (error) {
      if (onError) onError(error);
      else defaultError(error);
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading) {
      const notificationParams: { size: number; start?: string } = {
        size: notificationsPerPage
      };

      if (notifications.length) notificationParams.start = notifications[0].createdAt;

      if (realTimeNotificationEnabled)
        sirenCore?.startRealTimeNotificationFetch(notificationParams);
      else sirenCore?.stopRealTimeNotificationFetch();
    }
  }, [realTimeNotificationEnabled]);

  const defaultError = (error: SirenErrorType): void => {
    logger.error(JSON.stringify({ error }));
    realTimeNotificationEnabled && sirenCore?.stopRealTimeNotificationFetch();
  };

  useEffect(() => {
    // Initialize Siren SDK and start polling notifications
    initialize();

    // Clean up - stop polling when component unmounts
    return () => {
      sirenCore?.stopRealTimeNotificationFetch();
    };
  }, [sirenCore]);

  // Initialize Siren SDK and fetch notifications
  const initialize = async (): Promise<void> => {
    setIsError(false);

    if (Siren && sirenCore && !isError) {
      const allNotifications = await fetchNotifications(sirenCore, true);

      if (realTimeNotificationEnabled) {
        const notificationParams: { size: number; start?: string } = {
          size: notificationsPerPage
        };

        if (allNotifications.length) notificationParams.start = allNotifications[0].createdAt;
        sirenCore?.startRealTimeNotificationFetch(notificationParams);
      }
    }
  };

  // Fetch notifications
  const fetchNotifications = async (
    sirenObject: Siren,
    isResetList = false
  ): Promise<NotificationDataType[]> => {
    setIsError(false);
    setIsLoading(true);
    if (sirenObject)
      try {
        const notificationParams: { size: number; end?: string } = {
          size: notificationsPerPage
        };

        if (!isResetList)
          notificationParams.end = notifications[notifications.length - 1].createdAt;

        const res = await sirenObject.fetchAllNotifications(notificationParams);

        if (res && res.data && res.data.length > 0) {
          const updatedNotifications = isResetList ? res.data : [...notifications, ...res.data];

          setNotifications(updatedNotifications);
        } else {
          setEndReached(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
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
    if (sirenCore) {
      setEndReached(false);
      setIsError(false);
      setNotifications([]);
      realTimeNotificationEnabled && sirenCore?.stopRealTimeNotificationFetch();
      const allNotifications = (await fetchNotifications(sirenCore, true)) || [];
      const notificationParams: { size: number; start?: string } = {
        size: notificationsPerPage
      };

      if (allNotifications?.length > 0) notificationParams.start = allNotifications[0].createdAt;

      realTimeNotificationEnabled && sirenCore?.startRealTimeNotificationFetch(notificationParams);
    }
  };

  // Load more notifications when reaching end of list
  const onEndReached = (): void => {
    if (sirenCore && !isLoading && !endReached && notifications?.length > 0)
      fetchNotifications(sirenCore, false);
  };

  // Render empty window, error window, or custom empty component
  const renderListEmpty = (): JSX.Element | undefined => {
    if (!isLoading) {
      if (isError) return <ErrorWindow onRetry={onRefresh} styles={styles} />;

      return listEmptyComponent || <EmptyWindow styles={styles} />;
    }
  };

  const onDelete = async (id: string): Promise<void> => {
    await deleteNotification(id);
    const updatedNotifications = [...notifications].filter((item) => item.id !== id);

    setNotifications(updatedNotifications);
  };

  const onPressClearAll = async (): Promise<void> => {
    const { error } = await clearAllNotification();

    // TODO: to refactor
    if (!error) {
      setIsLoading(false);
      setIsError(false);
      setNotifications([]);
      setEndReached(false);
    } else {
      setIsError(true);
    }
  };

  // Render notification card
  const renderCard = ({ item }: { item: NotificationDataType }): JSX.Element => {
    if (customNotificationCard) return customNotificationCard(item);

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

  // Render loading window
  const renderListFooter = () => {
    if (isLoading)
      return (
        <LoadingWindow
          styles={styles}
          theme={darkMode ? theme?.dark : theme?.light}
          mode={darkMode ? ThemeMode.DARK : ThemeMode.LIGHT}
        />
      );
  };

  return (
    <View style={styles.container}>
      {customHeader
        ? customHeader
        : !hideHeader && <Header title={title} styles={styles} onPressClearAll={onPressClearAll} />}
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
      {customFooter || null}
    </View>
  );
};

export default SirenWindow;

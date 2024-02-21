import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SirenWeb } from 'bilta-sdk';

import type { SirenProps } from '../utils';
import { Constants, useSiren } from '../utils';
import type { NotificationResponseDataItem } from '../utils/types';
import { useSirenContext } from './sirenProvider';
import { applyTheme, logger } from '../utils/commonUtils';
import EmptyWindow from './emptyWindow';
import ErrorWindow from './errorWindow';
import LoadingWindow from './loadingWindow';
import Header from './header';
import Card from './card';

const { DEFAULT_WINDOW_TITLE, ThemeMode } = Constants;

const SirenWindow = (props: SirenProps.SirenInboxProps) => {
  const {
    theme = {},
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

  const { sirenCore, sirenError, clearError, newNotifications, clearNewNotifications } =
    useSirenContext();

  const { deleteNotification } = useSiren();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SirenProps.NotificationResponseDataItem[]>([]);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setNotifications([...newNotifications, ...notifications]);
      clearNewNotifications();
      setIsLoading(false);
    }
  }, [newNotifications.length]);

  useEffect(() => {
    if (sirenError) {
      if (onError) onError(sirenError);
      else defaultError(sirenError);
      clearError();
    }
  }, [sirenError]);

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

  const defaultError = (error: Error) => {
    logger.error(JSON.stringify({ error }));
    realTimeNotificationEnabled && sirenCore?.stopRealTimeNotificationFetch();
  };

  useEffect(() => {
    // Initialize Siren SDK and start polling notifications
    (async () => {
      await initialize();
    })();

    // Clean up - stop polling when component unmounts
    return () => {
      sirenCore?.stopRealTimeNotificationFetch();
    };
  }, [sirenCore]);

  // Initialize Siren SDK and fetch notifications
  const initialize = async () => {
    setIsError(false);

    if (SirenWeb && sirenCore && !isError) {
      const allNotifications = await fetchNotifications(sirenCore, false);

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
  const fetchNotifications = async (sirenObject: SirenWeb, isResetList = false) => {
    setIsError(false);
    setIsLoading(true);
    let updatedNotifications = isResetList ? [] : [...notifications];

    if (sirenObject)
      try {
        const isNonEmptyList = updatedNotifications?.length > 0;
        const notificationParams: { size: number; end?: string } = {
          size: notificationsPerPage
        };

        if (isNonEmptyList)
          notificationParams.end = updatedNotifications[updatedNotifications.length - 1].createdAt;

        const res = await sirenObject.fetchAllNotifications(notificationParams);

        setIsLoading(false);
        if (res?.data?.length > 0)
          updatedNotifications = !isNonEmptyList ? res.data : [...notifications, ...res.data];
        else setEndReached(true);
        setNotifications(updatedNotifications);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }

    return updatedNotifications;
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
  const onRefresh = async () => {
    if (sirenCore) {
      setEndReached(false);
      setIsError(false);
      setIsLoading(true);
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
  const onEndReached = () => {
    if (sirenCore && !isLoading && !endReached && notifications?.length > 0)
      fetchNotifications(sirenCore, false);
  };

  // Render empty window, error window, or custom empty component
  const renderListEmpty = () => {
    if (!isLoading) {
      if (isError) return <ErrorWindow onRefresh={onRefresh} styles={styles} />;

      return listEmptyComponent || <EmptyWindow styles={styles} />;
    }
  };

  const onDelete = async (id: string) => {
    await deleteNotification(id);
    const updatedNotifications = [...notifications].filter((item) => item.id !== id);

    setNotifications(updatedNotifications);
  };

  const onClearAllNotifications = () => {
    setIsLoading(false);
    setIsError(false);
    setNotifications([]);
    setEndReached(false);
  };

  // Render notification card
  const renderCard = ({ item }: { item: NotificationResponseDataItem }) => {
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
        : !hideHeader && (
          <Header
            title={title}
            styles={styles}
            onClearAllNotifications={onClearAllNotifications}
          />
        )}
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

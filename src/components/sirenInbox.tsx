import React, { type ReactElement, useEffect, useMemo, useState, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import PubSub from 'pubsub-js';
import type { Siren } from '@sirenapp/js-sdk';
import type { NotificationDataType, SirenErrorType } from '@sirenapp/js-sdk/dist/esm/types';

import Card from './card';
import EmptyWindow from './emptyWindow';
import ErrorWindow from './errorWindow';
import Header from './header';
import LoadingWindow from './loadingWindow';
import Spinner from './spinner';
import { useSirenContext } from './sirenProvider';
import type { SirenInboxProps } from '../types';
import { CommonUtils, Constants, useSiren } from '../utils';

const {
  DEFAULT_WINDOW_TITLE,
  ThemeMode,
  events,
  TOKEN_VERIFICATION_PENDING,
  MAXIMUM_ITEMS_PER_FETCH,
  VerificationStatus
} = Constants;
const { applyTheme, isNonEmptyArray, updateNotifications } = CommonUtils;

type fetchProps = {
  size: number;
  end?: string;
  start?: string;
};

type NotificationFetchParams = {
  size: number;
  end?: string;
  start?: string;
  sort?: 'createdAt' | 'updatedAt';
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
 * @param {boolean} [props.darkMode=false] - Flag to enable dark mode.
 * @param {Object} [props.cardProps={ hideAvatar: false, showMedia: true }] - Props for customizing the notification cards.
 * @param {JSX.Element} [props.listEmptyComponent=null] - Custom component to display when the notification list is empty.
 * @param {CardProps} [props.inboxHeaderProps] - Object containing props related to the inbox header
 * @param {JSX.Element} [props.customFooter=null] - Custom footer component.
 * @param {JSX.Element} [props.customLoader=null] - Custom loader component.
 * @param {JSX.Element} [props.customErrorWindow=null] - Custom error component.
 * @param {Function} [props.customNotificationCard=null] - Custom function for rendering notification cards.
 * @param {Function} [props.onNotificationCardClick=() => null] - Callback for handling notification card clicks.
 * @param {Function} [props.onError] - Callback for handling errors.
 */
const SirenInbox = (props: SirenInboxProps): ReactElement => {
  const {
    theme = { dark: {}, light: {} },
    customStyles = {},
    title = DEFAULT_WINDOW_TITLE,
    darkMode = false,
    cardProps = { hideAvatar: false, showMedia: true },
    listEmptyComponent = null,
    inboxHeaderProps = {},
    customFooter = null,
    customLoader = null,
    customErrorWindow = null,
    customNotificationCard = null,
    onNotificationCardClick = () => null,
    onError = () => {},
    itemsPerFetch = 20
  } = props;

  const { hideHeader, hideClearAll, customHeader, showBackButton, backButton, onBackPress } =
    inboxHeaderProps;
  const notificationsPerPage = Math.max(
    0,
    itemsPerFetch > MAXIMUM_ITEMS_PER_FETCH ? MAXIMUM_ITEMS_PER_FETCH : itemsPerFetch
  );

  const { siren, verificationStatus } = useSirenContext();

  const { deleteNotification, deleteNotificationsByDate, markNotificationsAsViewed } = useSiren();

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

  const disableCardDelete = useRef(false);

  useEffect(() => {
    PubSub.subscribe(events.NOTIFICATION_LIST_EVENT, notificationSubscriber);

    return cleanUp();
  }, []);

  useEffect(() => {
    // Initialize Siren SDK and start polling notifications
    if (verificationStatus !== VerificationStatus.PENDING && siren) initialize();
  }, [siren, verificationStatus]);

  useEffect(() => {
    if (eventListenerData) {
      const updatedNotifications: NotificationDataType[] = updateNotifications(
        eventListenerData,
        notifications
      );

      setNotifications(updatedNotifications);
      setEventListenerData(null);
    }
  }, [eventListenerData]);

  const handleMarkNotificationsAsViewed = async (newNotifications = notifications) => {
    const currentTimestamp = new Date().getTime();
    const isoString = new Date(currentTimestamp).toISOString();
    const response = await markNotificationsAsViewed(
      isNonEmptyArray(newNotifications) ? newNotifications[0].createdAt : isoString
    );

    processError(response?.error);
  };

  const processError = (error?: SirenErrorType | null) => {
    if (error) {
      if (error?.Code !== TOKEN_VERIFICATION_PENDING) setIsError(true);
      if (onError) onError(error);
    }
  };

  // Clean up - stop polling when component unmounts
  const cleanUp = () => () => {
    siren?.stopRealTimeNotificationFetch();
    setNotifications([]);
    PubSub.unsubscribe(events.NOTIFICATION_LIST_EVENT);
    handleMarkNotificationsAsViewed();
  };

  const notificationSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    setEventListenerData(data);
  };

  // Initialize Siren SDK and fetch notifications
  const initialize = async (): Promise<void> => {
    if (siren) {
      siren?.stopRealTimeNotificationFetch();
      const allNotifications = await fetchNotifications(siren, true);
      const notificationParams: fetchProps = { size: notificationsPerPage };

      if (isNonEmptyArray(allNotifications))
        notificationParams.start = allNotifications[0].createdAt;

      if (verificationStatus === VerificationStatus.SUCCESS)
        siren?.startRealTimeNotificationFetch(notificationParams);
    }
  };

  const generateNotificationParams = (attachEndDate: boolean): fetchProps => {
    const notificationParams: NotificationFetchParams = {
      size: notificationsPerPage,
      sort: 'createdAt'
    };

    if (attachEndDate) notificationParams.end = notifications[notifications.length - 1].createdAt;

    return notificationParams;
  };

  const processResponse = (
    nonEmptyResponse: boolean,
    isResetList: boolean,
    responseData: NotificationDataType[]
  ): NotificationDataType[] => {
    if (nonEmptyResponse) {
      const updatedNotifications = isResetList ? responseData : [...notifications, ...responseData];

      isResetList && handleMarkNotificationsAsViewed(updatedNotifications);
      setNotifications(updatedNotifications);

      return updatedNotifications;
    } else {
      setEndReached(true);
    }

    return [];
  };

  // Fetch notifications
  const fetchNotifications = async (
    siren: Siren,
    isResetList = false
  ): Promise<NotificationDataType[]> => {
    setIsError(false);
    setIsLoading(true);
    let updatedNotifications = notifications;

    if (siren)
      try {
        const notificationParams = generateNotificationParams(!isResetList);
        const response = await siren.fetchAllNotifications(notificationParams);
        const nonEmptyResponse = Boolean(isNonEmptyArray(response?.data));

        if (response?.data)
          updatedNotifications = processResponse(nonEmptyResponse, isResetList, response.data);
        if (response?.error) processError(response.error);

        setIsLoading(false);
      } catch (err) {
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
        customStyles,
        darkMode ? ThemeMode.DARK : ThemeMode.LIGHT
      ),
    [theme, darkMode, customStyles]
  );

  // Refresh notifications
  const onRefresh = async (): Promise<void> => {
    if (siren)
      try {
        setEndReached(false);
        setIsError(false);
        setNotifications([]);
        setIsLoading(true);

        siren?.stopRealTimeNotificationFetch();
        const allNotifications = (await fetchNotifications(siren, true)) || [];
        const notificationParams: fetchProps = { size: notificationsPerPage };

        if (isNonEmptyArray(allNotifications))
          notificationParams.start = allNotifications[0].createdAt;

        if (verificationStatus === VerificationStatus.SUCCESS)
          siren?.startRealTimeNotificationFetch(notificationParams);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
  };

  // Load more notifications when reaching end of list
  const onEndReached = (): void => {
    const fetchMore = siren && !isLoading && !endReached && isNonEmptyArray(notifications);

    if (fetchMore) fetchNotifications(siren, false);
  };

  // Render empty window, error window, or custom empty component
  const renderListEmpty = (): JSX.Element | null => {
    if (!isLoading) {
      if (isError)
        return (
          <ErrorWindow styles={styles} darkMode={darkMode} customErrorWindow={customErrorWindow} />
        );

      return listEmptyComponent || <EmptyWindow styles={styles} darkMode={darkMode} />;
    }

    return <LoadingWindow styles={styles} customLoader={customLoader} />;
  };

  const onDelete = async (id: string): Promise<void> => {
    if (!disableCardDelete.current) {
      disableCardDelete.current = true;
      const response = await deleteNotification(id);

      processError(response?.error);
      disableCardDelete.current = false;
    }
  };

  const onPressClearAll = async (): Promise<void> => {
    if (isNonEmptyArray(notifications)) {
      const response = await deleteNotificationsByDate(notifications[0].createdAt);

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
        darkMode={darkMode}
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
    if (isLoading && isNonEmptyArray(notifications))
      return (
        <Spinner
          theme={darkMode ? theme?.dark : theme?.light}
          mode={darkMode ? ThemeMode.DARK : ThemeMode.LIGHT}
        />
      );

    return null;
  };

  const renderHeader = (): JSX.Element | null => {
    if (hideHeader) return null;
    if (customHeader) return customHeader;

    return (
      <Header
        title={title}
        styles={styles}
        onPressClearAll={onPressClearAll}
        hideClearAll={hideClearAll}
        clearAllDisabled={!isNonEmptyArray(notifications)}
        showBackButton={showBackButton}
        backButton={backButton}
        onBackPress={onBackPress}
      />
    );
  };

  const keyExtractor = (item: NotificationDataType) => item.id;

  const renderList = (): JSX.Element => {
    return (
      <FlatList
        data={notifications}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={false}
        contentContainerStyle={styles.contentContainer}
        onEndReached={onEndReached}
        ListFooterComponent={renderListFooter}
        removeClippedSubviews
        maxToRenderPerBatch={20}
        windowSize={3}
      />
    );
  };

  return (
    <View style={[style.container, styles.container]}>
      {renderHeader()}
      {isNonEmptyArray(notifications) ? renderList() : renderListEmpty()}
      {customFooter || null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minWidth: 300,
    flex: 1
  }
});

export default SirenInbox;

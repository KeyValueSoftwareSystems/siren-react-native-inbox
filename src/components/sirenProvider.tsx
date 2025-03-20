import React, { createContext, useContext, useEffect, useState } from 'react';

import PubSub from 'pubsub-js';
import { Siren } from '@sirenapp/js-sdk';
import type {
  InitConfigType,
  NotificationDataType,
  NotificationsApiResponse,
  UnviewedCountApiResponse
} from '@sirenapp/js-sdk/dist/esm/types';

import type { SirenProviderConfigProps } from '../types';
import { generateUniqueId, isNonEmptyArray, logger } from '../utils/commonUtils';
import {
  events,
  eventTypes,
  EventType
} from '../utils/constants';
import { useSiren } from '../utils';

type SirenContextProp = {
  siren: Siren | null;
  id: string;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  siren: null,
  id: ''
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * @example
 * const {
 *   siren,
 * } = useSirenContext();
 *
 * @returns {SirenContextProp} The Siren notifications context.
 */
export const useSirenContext = (): SirenContextProp => useContext(SirenContext);

/**
 * Provides a React context for Siren notifications, making Siren SDK functionality
 * available throughout your React application.
 *
 * `SirenProvider` initializes the Siren SDK with given configuration and manages the state for siren.
 *
 * @component
 * @example
 * const config = {
 *   userToken: "user_token_here",
 *   recipientId: "recipient_id_here"
 * };
 *
 * <SirenProvider config={config}>
 *   <YourComponent />
 * </SirenProvider>
 *
 * @param {Object} props - Props for configuring the SirenProvider.
 * @param {SirenProviderConfig} props.config - Configuration for initializing the Siren SDK.
 * @param {React.ReactNode} props.children - Child components that will have access to the Siren context.
 */
const SirenProvider: React.FC<SirenProvider> = ({ config, children }) => {

  const { markAllAsViewed } = useSiren();

  const [id] = useState(generateUniqueId());
  const [siren, setSiren] = useState<Siren | null>(null);

  useEffect(() => {
    if (config?.recipientId && config?.userToken) {
      stopRealTimeFetch();
      sendResetDataEvents();
      initialize();
    }
  }, [config]);

  const stopRealTimeFetch = (): void => {
    siren?.stopRealTimeFetch(EventType.NOTIFICATION);
    siren?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
  };

  const sendResetDataEvents = () => {
    const updateCountPayload = {
      action: eventTypes.RESET_NOTIFICATIONS_COUNT
    };
    const updateNotificationPayload = {
      action: eventTypes.RESET_NOTIFICATIONS
    };

    PubSub.publish(`${events.NOTIFICATION_COUNT_EVENT}${id}`, JSON.stringify(updateCountPayload));
    PubSub.publish(
      `${events.NOTIFICATION_LIST_EVENT}${id}`,
      JSON.stringify(updateNotificationPayload)
    );
  };

  const onNewNotificationEvent = (responseData: NotificationDataType[]) => {
    logger.info(`new notifications : ${JSON.stringify(responseData)}`);

    markAllAsViewed(responseData[0].createdAt);
    const payload = { newNotifications: responseData, action: eventTypes.NEW_NOTIFICATIONS };

    PubSub.publish(`${events.NOTIFICATION_LIST_EVENT}${id}`, JSON.stringify(payload));
  };

  const onTotalUnviewedCountEvent = (response: UnviewedCountApiResponse) => {
    const totalUnviewed = response.data?.totalUnviewed;
    const payload = {
      unviewedCount: totalUnviewed,
      action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
    };

    PubSub.publish(`${events.NOTIFICATION_COUNT_EVENT}${id}`, JSON.stringify(payload));
  };

  const handleNotificationEvent = (response: NotificationsApiResponse) => {
    const responseData = response?.data;

    if (Array.isArray(responseData) && isNonEmptyArray(responseData))
      onNewNotificationEvent(responseData);
  };
  const handleUnviewedCountEvent = (response: UnviewedCountApiResponse) => {
    const responseData = response?.data;

    if (responseData && 'totalUnviewed' in responseData) onTotalUnviewedCountEvent(response);
  };
  const onEventReceive = (
    response: NotificationsApiResponse | UnviewedCountApiResponse = {},
    eventType: EventType
  ) => {
    switch (eventType) {
      case EventType.NOTIFICATION:
        handleNotificationEvent(response as NotificationsApiResponse);
        break;
      case EventType.UNVIEWED_COUNT:
        handleUnviewedCountEvent(response as UnviewedCountApiResponse);
        break;
    }
  };

  const actionCallbacks = { onEventReceive };

  const getDataParams = () => {
    return {
      token: config.userToken,
      recipientId: config.recipientId,
      actionCallbacks: actionCallbacks
    };
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = (): void => {
    const dataParams: InitConfigType = getDataParams();
    const siren = new Siren(dataParams);

    setSiren(siren);
  };

  return (
    <SirenContext.Provider
      value={{
        id,
        siren
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;

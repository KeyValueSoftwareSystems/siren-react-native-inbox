import React, { createContext, useContext, useEffect, useState } from 'react';

import PubSub from 'pubsub-js';
import { Siren } from 'test_notification';
import type {
  InitConfigType,
  NotificationDataType,
  NotificationsApiResponse,
  SirenErrorType,
  UnviewedCountApiResponse
} from 'test_notification/dist/esm/types';

import type { SirenProviderConfigProps } from '../types';
import { isNonEmptyArray, logger } from '../utils/commonUtils';
import { events, eventTypes, IN_APP_RECIPIENT_UNAUTHENTICATED } from '../utils/constants';

type SirenContextProp = {
  siren: Siren | null;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  siren: null
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * @example
 * const {
 *   siren,
 *   unviewedCount,
 *   setUnviewedCount,
 *   dispatch
 * } = useSirenContext();
 *
 * @returns {SirenContextProp} The Siren notifications context.
 */
export const useSirenContext = (): SirenContextProp => useContext(SirenContext);

/**
 * Provides a React context for Siren notifications, making Siren SDK functionality
 * available throughout your React application.
 *
 * `SirenProvider` initializes the Siren SDK with given configuration and manages the state for
 * notifications, including fetching new notifications, handling errors, and tracking the count
 * of unviewed notifications.
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
  let retryCount = 0;

  const [siren, setSiren] = useState<Siren | null>(null);

  useEffect(() => {
    if (config?.recipientId && config?.userToken) {
      stopRealTimeFetch();
      sendResetDataEvents();
      initialize();
    }
  }, [config]);

  const stopRealTimeFetch = (): void => {
    siren?.stopRealTimeNotificationFetch();
    siren?.stopRealTimeUnviewedCountFetch();
  };

  const sendResetDataEvents = () => {
    const updateCountPayload = {
      action: eventTypes.RESET_NOTIFICATIONS_COUNT
    };
    const updateNotificationPayload = {
      action: eventTypes.RESET_NOTIFICATIONS
    };

    PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(updateCountPayload));
    PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(updateNotificationPayload));
  };

  const onUnViewedCountReceived = (response: UnviewedCountApiResponse): void => {
    const totalUnviewed = response?.data?.totalUnviewed;

    const payload = {
      unviewedCount: totalUnviewed,
      action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
    };

    PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
  };

  const onNotificationReceived = (response: NotificationsApiResponse): void => {
    const responseData: NotificationDataType[] = response?.data || [];

    if (isNonEmptyArray(responseData)) {
      logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
      const payload = { newNotifications: response?.data, action: eventTypes.NEW_NOTIFICATIONS };

      PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
    }
  };

  const actionCallbacks = { onUnViewedCountReceived, onNotificationReceived };

  const getDataParams = () => {
    return {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: retryVerification,
      actionCallbacks: actionCallbacks
    };
  };

  const retryVerification = (error: SirenErrorType) => {
    if (error.Code === IN_APP_RECIPIENT_UNAUTHENTICATED && retryCount < 3)
      setTimeout(() => {
        initialize();
        retryCount++;
      }, 5000);

    if(retryCount === 3)
      stopRealTimeFetch();
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
        siren
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;

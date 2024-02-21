import React, { createContext, useContext, useEffect, useState } from 'react';
import { SirenWeb } from 'bilta-sdk';
import type {
  NotificationsApiResponse,
  UnviewdCountApiResponse,
  InitConfigType,
  SirenErrorType,
  NotificationDataType
} from 'bilta-sdk/dist/types';

import type { SirenProps } from '../utils';
import { logger } from '../utils/commonUtils';

type SirenContextProp = {
  sirenCore?: SirenWeb | null;
  sirenError?: SirenErrorType | null;
  clearError: () => void;
  newNotifications: NotificationDataType[];
  clearNewNotifications: () => void;
  unviewedCount: number;
  setUnviewedCount: React.Dispatch<React.SetStateAction<number>>;
};

interface SirenProvider {
  config: SirenProps.SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  clearError: () => null,
  newNotifications: [],
  clearNewNotifications: () => null,
  unviewedCount: 0,
  setUnviewedCount: () => null
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * This hook provides access to the Siren SDK core functionalities, notification data,
 * error handling, and utility functions for managing notifications state.
 *
 * @example
 * const {
 *   sirenCore,
 *   sirenError,
 *   clearError,
 *   newNotifications,
 *   clearNewNotifications,
 *   unviewedCount,
 *   setUnviewedCount
 * } = useSirenContext();
 *
 * @returns {SirenContextProp} The Siren notifications context.
 */
export const useSirenContext = () => useContext(SirenContext);

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
  const [newNotifications, setNewNotifications] = useState<NotificationDataType[]>([]);
  const [sirenCore, setSirenCore] = useState<SirenWeb | null>(null);
  const [unviewedCount, setUnviewedCount] = useState<number>(0);
  const [sirenError, setSirenError] = useState<SirenErrorType | null>(null);

  useEffect(() => {
    (async () => {
      await initialize();
    })();
  }, []);

  useEffect(() => {
    logger.info(`unviewed notification count : ${unviewedCount}`);
  }, [unviewedCount]);

  const realTimeNotificationCallback = {
    onUnViewedCountReceived: (response: UnviewdCountApiResponse): void => {
      const totalUnviewed = response?.data?.totalUnviewed || 0;

      setUnviewedCount(totalUnviewed);
    },
    onNotificationReceived: (response: NotificationsApiResponse): void => {
      if (response?.data?.length) {
        logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
        setNewNotifications(response.data || []);
      }
    }
  };

  const clearError = (): void => {
    setSirenError(null);
  };

  const clearNewNotifications = (): void => {
    setNewNotifications([]);
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = async (): Promise<void> => {
    const dataParams: InitConfigType = {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: (error: SirenErrorType): void => setSirenError(error),
      actionCallbacks: realTimeNotificationCallback,
      dataFetchIntervalsInMilliSeconds: {
        notificationFetch: 200,
        unViewedCountFetch: 200
      }
    };
    const sirenObject = new SirenWeb(dataParams);

    setSirenCore(sirenObject);
  };

  return (
    <SirenContext.Provider
      value={{
        sirenCore,
        sirenError,
        clearError,
        newNotifications,
        clearNewNotifications,
        unviewedCount,
        setUnviewedCount
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;

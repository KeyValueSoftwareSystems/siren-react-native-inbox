import React, { createContext, useContext, useEffect, useState } from 'react';
import { Siren } from 'bilta-sdk';
import type {
  NotificationsApiResponse,
  UnviewedCountApiResponse,
  InitConfigType,
  SirenErrorType,
  NotificationDataType
} from 'bilta-sdk/dist/types';

import type { SirenProviderConfigProps } from '../types';
import { CommonUtils } from '../utils';

const { logger } = CommonUtils;

type SirenContextProp = {
  sirenCore?: Siren | null;
  error?: SirenErrorType | null;
  clearError: () => void;
  newNotifications: NotificationDataType[];
  clearNewNotifications: () => void;
  unviewedCount: number;
  setUnviewedCount: React.Dispatch<React.SetStateAction<number>>;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
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
 * @example
 * const {
 *   sirenCore,
 *   error,
 *   clearError,
 *   newNotifications,
 *   clearNewNotifications,
 *   unviewedCount,
 *   setUnviewedCount
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
  const [newNotifications, setNewNotifications] = useState<NotificationDataType[]>([]);
  const [sirenCore, setSirenCore] = useState<Siren | null>(null);
  const [unviewedCount, setUnviewedCount] = useState<number>(0);
  const [error, setSirenError] = useState<SirenErrorType | null>(null);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    logger.info(`unviewed notification count : ${unviewedCount}`);
  }, [unviewedCount]);

  const actionCallbacks = {
    onUnViewedCountReceived: (response: UnviewedCountApiResponse): void => {
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
  const initialize = (): void => {
    const dataParams: InitConfigType = {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: (error: SirenErrorType): void => setSirenError(error),
      actionCallbacks: actionCallbacks
    };
    const sirenObject = new Siren(dataParams);

    setSirenCore(sirenObject);
  };

  return (
    <SirenContext.Provider
      value={{
        sirenCore,
        error,
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

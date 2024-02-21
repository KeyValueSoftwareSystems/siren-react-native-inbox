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

export const useSirenContext = () => useContext(SirenContext);

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
    onUnViewedCountReceived: (response: UnviewdCountApiResponse) => {
      const totalUnviewed = response?.data?.totalUnviewed || 0;

      setUnviewedCount(totalUnviewed);
    },
    onNotificationReceived: (response: NotificationsApiResponse) => {
      if (response?.data?.length) {
        logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
        setNewNotifications(response.data || []);
      }
    }
  };

  const clearError = () => {
    setSirenError(null);
  };

  const clearNewNotifications = () => {
    setNewNotifications([]);
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = async () => {
    const dataParams: InitConfigType = {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: (error: SirenErrorType) => setSirenError(error),
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

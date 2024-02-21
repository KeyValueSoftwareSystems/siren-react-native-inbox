import React, { createContext, useContext, useEffect, useState } from 'react';
import { SirenWeb } from 'bilta-sdk';
import type { ApiResponse, InitConfigType, SirenErrorType } from 'bilta-sdk/dist/types';

import type { SirenProps } from '../utils';
import { logger } from '../utils/commonUtils';

type SirenContextProp = {
  sirenCore?: SirenWeb | null;
  sirenError?: SirenErrorType | null;
  clearError: () => void;
  newNotifications: SirenProps.NotificationResponseDataItem[];
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
  const [newNotifications, setNewNotifications] = useState<
    SirenProps.NotificationResponseDataItem[]
  >([]);
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
    onUnViewedCountReceived: (response: ApiResponse) => {
      const totalUnviewed = response?.data?.totalUnviewed || 0;

      setUnviewedCount(totalUnviewed);
    },
    onNotificationReceived: (response: ApiResponse) => {
      if (response?.data?.length > 0) {
        logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
        setNewNotifications(response.data);
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

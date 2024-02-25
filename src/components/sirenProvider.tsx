import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Siren } from 'test_notification';
import type {
  NotificationsApiResponse,
  UnviewedCountApiResponse,
  InitConfigType,
  SirenErrorType,
  NotificationDataType
} from 'test_notification/dist/types';

import type { SirenProviderConfigProps } from '../types';
import { initialState, sirenReducer } from '../utils/sirenReducer';
import { sirenReducerTypes } from '../utils/constants';
import { logger } from '../utils/commonUtils';


type ActionType =
  | { type: sirenReducerTypes.SET_NOTIFICATIONS; payload: NotificationDataType[] }
  | { type: sirenReducerTypes.SET_SIREN_CORE; payload: Siren | null }
  | { type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT; payload: number };

type SirenContextProp = {
  sirenCore: Siren | null;
  unviewedCount: number;
  notifications: NotificationDataType[];
  dispatch: (action: ActionType) => void;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  unviewedCount: 0,
  notifications: [],
  dispatch: () => null,
  sirenCore: null
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * @example
 * const {
 *   sirenCore,
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
  const [state, dispatch] = useReducer(sirenReducer, initialState);

  const { notifications, sirenCore, unviewedCount } = state;

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    logger.info(`unviewed notification count : ${unviewedCount}`);
  }, [unviewedCount]);

  const actionCallbacks = {
    onUnViewedCountReceived: (response: UnviewedCountApiResponse): void => {
      const totalUnviewed = response?.data?.totalUnviewed || unviewedCount;

      dispatch({
        type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
        payload: totalUnviewed
      });
    },
    onNotificationReceived: (response: NotificationsApiResponse): void => {
      if (response?.data?.length) {
        logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
        dispatch({
          type: sirenReducerTypes.NEW_NOTIFICATIONS,
          payload: response.data
        });
      }
    }
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = (): void => {
    const dataParams: InitConfigType = {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: (error: SirenErrorType): void => logger.info(`Error : ${JSON.stringify(error)}`),
      actionCallbacks: actionCallbacks
    };
    const sirenObject = new Siren(dataParams);

    dispatch({
      type: sirenReducerTypes.SET_SIREN_CORE,
      payload: sirenObject
    });
  };

  return (
    <SirenContext.Provider
      value={{
        sirenCore,
        unviewedCount,
        notifications,
        dispatch
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;

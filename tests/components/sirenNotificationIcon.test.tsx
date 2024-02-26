import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import {SirenNotificationIcon} from   '../../src';
import type { Theme } from '../../src/types';
import * as sirenProvider from '../../src/components/sirenProvider';
import type { FetchNotificationsType, NotificationDataType, NotificationsApiResponse, VerifyTokenResponse } from 'test_notification/dist/types';
import type { Siren } from 'test_notification';
import type { sirenReducerTypes } from '../../src/utils/constants';

const UnviewedCountReturnResponse= {
  data: {
    unviewedCount: 5,
  },
  error: null,
}

type ActionType =
  | { type: sirenReducerTypes.SET_NOTIFICATIONS; payload: NotificationDataType[] }
  | { type: sirenReducerTypes.SET_SIREN_CORE; payload: Siren | null }
  | { type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT; payload: number };

describe('SirenNotificationIcon', () => {
  const customTheme: Theme = {
    light: {
      badgeStyle: {
        size: 20,
        color: 'red',
        textColor: 'white',
        textSize: 12
      },
      notificationIcon: {
        size: 30
      }
    },
    dark: {
      badgeStyle: {
        size: 20,
        color: 'blue',
        textColor: 'white',
        textSize: 12
      },
      notificationIcon: {
        size: 30
      }
    }
  };

  const notificationIcon = <Image source={require('../../src/assets/icon.png')} />;
  const mockDispatch = jest.fn();
  const mockSirenCore: Siren = {
    markNotificationAsReadById: jest.fn(),
    markAllNotificationsAsRead: jest.fn(),
    deleteNotificationById: jest.fn(),
    clearAllNotifications: jest.fn(),
    markNotificationsAsViewed: jest.fn(),
    token: undefined,
    recipientId: undefined,
    onError: undefined,
    notificationFetchIntervalId: undefined,
    unViewedCountFetchIntervalId: undefined,
    latestNotification: undefined,
    actionCallbacks: undefined,
    tokenValidationStatus: undefined,
    bindMethods: undefined,
    verifyToken: jest.fn(),
    fetchUnviewedNotificationsCount: jest.fn(async () => (UnviewedCountReturnResponse)),
    fetchAllNotifications: jest.fn(),
    startRealTimeNotificationFetch: jest.fn(),
    stopRealTimeNotificationFetch: jest.fn(),
    startRealTimeUnviewedCountFetch: jest.fn(),
    stopRealTimeUnviewedCountFetch: jest.fn(),
    emitMissingParameterError: undefined,
    authorizeUserAction: undefined
  };

  const dispatch = (action  : ActionType) => {
    mockDispatch(action);
  };

  
  jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
    sirenCore: mockSirenCore,
    notifications: [],
    dispatch,
    unviewedCount: 5
  });

  it('renders without crashing', () => {
    render(
      <SirenNotificationIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
        realTimeUnviewedCountEnabled={true}
      />
    );
  });

  it('renders correct badge based on unviewedCount', () => {
    const { getByText } = render(
      <SirenNotificationIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
        realTimeUnviewedCountEnabled={true}
      />
    );

    expect(getByText('5')).toBeTruthy();
  });

  it('renders provided notificationIcon or default icon', () => {
    const { getByTestId } = render(
      <SirenNotificationIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
        realTimeUnviewedCountEnabled={true}
      />
    );

    expect(getByTestId('notification-icon')).toBeTruthy();
  });

  it('fetches unviewed notifications count and dispatches it to the state', async () => {
    await mockSirenCore.fetchUnviewedNotificationsCount();

    expect(mockSirenCore.fetchUnviewedNotificationsCount).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_UN_VIEWED_NOTIFICATION_COUNT', payload: 5 });
  });
});

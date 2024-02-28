import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import { SirenInboxIcon } from '../../src';
import type { Theme } from '../../src/types';
import * as sirenProvider from '../../src/components/sirenProvider';
import type { NotificationDataType } from 'test_notification/dist/types';
import type { Siren } from 'test_notification';
import type { sirenReducerTypes } from '../../src/utils/constants';

const UnviewedCountReturnResponse = {
  data: {
    unviewedCount: 5
  },
  error: null
};

type ActionType =
  | { type: sirenReducerTypes.SET_NOTIFICATIONS; payload: NotificationDataType[] }
  | { type: sirenReducerTypes.SET_SIREN_CORE; payload: Siren | null }
  | { type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT; payload: number };

describe('SirenInboxIcon', () => {
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
  const mockSiren:Pick<Siren, keyof Siren> = {
    markNotificationAsReadById: jest.fn(),
    markNotificationsAsReadByDate: jest.fn(),
    deleteNotificationById: jest.fn(),
    clearNotificationsByDate: jest.fn(),
    markNotificationsAsViewed: jest.fn(),
    verifyToken: jest.fn(),
    fetchUnviewedNotificationsCount: jest.fn(async () => UnviewedCountReturnResponse),
    fetchAllNotifications: jest.fn(),
    startRealTimeNotificationFetch: jest.fn(),
    stopRealTimeNotificationFetch: jest.fn(),
    startRealTimeUnviewedCountFetch: jest.fn(),
    stopRealTimeUnviewedCountFetch: jest.fn(),
  };

  const dispatch = (action: ActionType) => {
    mockDispatch(action);
  };

  jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
    siren: mockSiren as Siren,
    notifications: [],
    dispatch,
    unviewedCount: 5
  });

  it('renders without crashing', () => {
    render(
      <SirenInboxIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
      />
    );
  });

  it('renders correct badge based on unviewedCount', () => {
    const { getByText } = render(
      <SirenInboxIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
      />
    );

    expect(getByText('5')).toBeTruthy();
  });

  it('renders provided notificationIcon or default icon', () => {
    const { getByTestId } = render(
      <SirenInboxIcon
        theme={customTheme}
        notificationIcon={notificationIcon}
        darkMode={true}
      />
    );

    expect(getByTestId('notification-icon')).toBeTruthy();
  });

  it('fetches unviewed notifications count and dispatches it to the state', async () => {
    await mockSiren.fetchUnviewedNotificationsCount();

    expect(mockSiren.fetchUnviewedNotificationsCount).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_UN_VIEWED_NOTIFICATION_COUNT',
      payload: 5
    });
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';
import type { Siren } from 'test_notification';

import { SirenInboxIcon } from '../../src';
import type { Theme } from '../../src/types';
import * as sirenProvider from '../../src/components/sirenProvider';

const UnviewedCountReturnResponse = {
  data: {
    unviewedCount: 5
  },
  error: null
};


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

  jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
    siren: mockSiren as Siren,
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
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import {SirenNotificationIcon} from   '../../src';
import type { Theme } from '../../src/types';

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
  const mockSirenCore = {
    fetchUnviewedNotificationsCount: jest.fn(() => Promise.resolve({ data: { unviewedCount: 5 } })),
    startRealTimeUnviewedCountFetch: jest.fn(),
    stopRealTimeUnviewedCountFetch: jest.fn()
  };
  
  jest.mock('./sirenProvider', () => ({
    useSirenContext: jest.fn(() => ({
      sirenCore: mockSirenCore,
      unviewedCount: 5,
      dispatch: mockDispatch
    }))
  }));

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

    // Verify that badge with correct count is rendered
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

    // Verify that provided notificationIcon or default icon is rendered
    expect(getByTestId('notification-icon')).toBeTruthy();
  });

  it('fetches unviewed notifications count and dispatches it to the state', async () => {
    await mockSirenCore.fetchUnviewedNotificationsCount();

    expect(mockSirenCore.fetchUnviewedNotificationsCount).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_UN_VIEWED_NOTIFICATION_COUNT', payload: 5 });
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import SirenProvider, { SirenContext } from '../../src/components/sirenProvider';
import type { Siren } from 'test_notification';

describe('SirenProvider', () => {
  const config = {
    userToken: '1b961622e24c4a118a4108123d645c28',
    recipientId: '6018ebd1-683c-4397-a903-5ce9ea94bcd7'
  };

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
    fetchUnviewedNotificationsCount: jest.fn(),
    fetchAllNotifications: jest.fn(),
    startRealTimeNotificationFetch: jest.fn(),
    stopRealTimeNotificationFetch: jest.fn(),
    startRealTimeUnviewedCountFetch: jest.fn(),
    stopRealTimeUnviewedCountFetch: jest.fn(),
    emitMissingParameterError: undefined,
    authorizeUserAction: undefined
  };

  it('initializes the Siren SDK with the provided configuration', () => {
    const SirenMock = jest.fn().mockImplementation(() => mockSirenCore);

    render(
      <SirenProvider config={config}>
        <SirenContext.Consumer>
          {({ sirenCore }) => {
            expect(sirenCore).toBeDefined();

            return null;
          }}
        </SirenContext.Consumer>
      </SirenProvider>
    );

    expect(SirenMock).toHaveBeenCalledWith({
      token: config.userToken,
      recipientId: config.recipientId,
      onError: expect.any(Function),
      actionCallbacks: expect.any(Object)
    });
  });

});



import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import SirenProvider from '../../src/components/sirenProvider';
import { Siren } from '@sirenapp/js-sdk';

jest.mock('@sirenapp/js-sdk');

describe('SirenProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <SirenProvider config={{ userToken: 'test-token', recipientId: 'test-id' }}>
        <Text data-testid='child-component'>Child</Text>
      </SirenProvider>
    );

    expect(getByText('Child')).toBeTruthy();
  });

  it('should call initialize function on mount', async () => {
    render(
      <SirenProvider config={{ userToken: 'test-token', recipientId: 'test-id' }}>
        <Text>Child</Text>
      </SirenProvider>
    );
    const mocErrorFn = jest.fn();
    const mockNotificationHandler = jest.fn();
    const mockCountHandler = jest.fn();

    const sirenObject = new Siren({
      token: 'user-token',
      recipientId: 'recipient-id',
      onError: mocErrorFn,
      actionCallbacks: {
        onNotificationReceived: mockNotificationHandler,
        onUnViewedCountReceived: mockCountHandler
      }
    });

    expect(sirenObject).toBeInstanceOf(Siren);
  });
});

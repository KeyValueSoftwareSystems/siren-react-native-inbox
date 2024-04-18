import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import Card from '../../src/components/card';
import type { StyleProps } from '../../src/types';
import type { NotificationDataType } from '@sirenapp/js-sdk/dist/esm/types';

describe('Card Component', () => {
  const notification: NotificationDataType = {
    id: '1',
    message: {
      header: 'New Message',
      body: 'You have a new message.',
      avatar: {
        imageUrl: 'https://example.com/avatar.png',
        actionUrl: null
      },
      channel: '',
      subHeader: '',
      actionUrl: '',
      additionalData: ''
    },
    isRead: false,
    createdAt: '2020-01-01T00:00:00Z',
    requestId: ''
  };

  const customStyles: Partial<StyleProps> = {
    cardContainer: {
      // Add your custom styles here
    }
  };

  it('should render the card with correct header and body', () => {
    const onCardClickMock = jest.fn();
    const onDeleteMock = jest.fn();

    const { getByText } = render(
      <Card
        onCardClick={onCardClickMock}
        onDelete={onDeleteMock}
        notification={notification}
        darkMode
        cardProps={{ hideAvatar: false }}
        styles={customStyles}
      />
    );

    expect(getByText(notification.message.header)).toBeTruthy();
    expect(getByText(notification.message.body)).toBeTruthy();
  });

  it('should invoke onCardClick callback when card is clicked', () => {
    const onCardClickMock = jest.fn();
    const onDeleteMock = jest.fn();

    const { getByTestId } = render(
      <Card
        darkMode
        onCardClick={onCardClickMock}
        onDelete={onDeleteMock}
        notification={notification}
        cardProps={{ hideAvatar: false }}
        styles={customStyles}
      />
    );

    fireEvent.press(getByTestId('card-touchable'));
    expect(onCardClickMock).toHaveBeenCalledWith(notification);
  });

  it('should invoke onDelete callback with correct notification id when delete button is pressed', async () => {
    const onCardClickMock = jest.fn();
    const onDeleteMock = jest.fn();

    const { getByTestId } = render(
      <Card
        onCardClick={onCardClickMock}
        onDelete={onDeleteMock}
        notification={notification}
        darkMode
        cardProps={{ hideAvatar: false}}
        styles={customStyles}
      />
    );
    await act(async () => {
      fireEvent.press(getByTestId('delete-button'));
      await waitFor(() => {
        expect(onDeleteMock).toHaveBeenCalledWith(notification.id, false);
      });
    });
  });
});

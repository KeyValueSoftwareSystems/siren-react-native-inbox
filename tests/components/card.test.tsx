import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Card from '../../src/components/card';
import type { SirenStyleProps } from '../../src/types';
import type { NotificationDataType } from 'test_notification/dist/esm/types';

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

  const customStyles: Partial<SirenStyleProps> = {
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
        cardProps={{ hideAvatar: false, showMedia: true }}
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
        onCardClick={onCardClickMock}
        onDelete={onDeleteMock}
        notification={notification}
        cardProps={{ hideAvatar: false, showMedia: true }}
        styles={customStyles}
      />
    );

    fireEvent.press(getByTestId('card-touchable'));
    expect(onCardClickMock).toHaveBeenCalledWith(notification);
  });

  it('should invoke onDelete callback with correct notification id when delete button is pressed', () => {
    const onCardClickMock = jest.fn();
    const onDeleteMock = jest.fn();

    const { getByTestId } = render(
      <Card
        onCardClick={onCardClickMock}
        onDelete={onDeleteMock}
        notification={notification}
        cardProps={{ hideAvatar: false, showMedia: true }}
        styles={customStyles}
      />
    );

    fireEvent.press(getByTestId('delete-button'));
    expect(onDeleteMock).toHaveBeenCalledWith(notification.id);
  });
});

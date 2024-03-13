import React, { type ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { NotificationDataType } from 'test_notification/dist/esm/types';

import type { NotificationCardProps, SirenStyleProps } from '../types';
import { CommonUtils } from '../utils';

/**
 * `Card` component represents an individual notification card in the notification list.
 *
 * @component
 * @example
 * const notification = {
 *   id: "1",
 *   message: {
 *     header: "New Message",
 *     body: "You have a new message.",
 *     avatar: { imageUrl: "https://example.com/avatar.png" },
 *     media: { thumbnail: "https://example.com/media.png" }
 *   },
 *   isRead: false,
 *   createdAt: "2020-01-01T00:00:00Z"
 * };
 *
 * <Card
 *   onCardClick={() => console.log('Notification clicked')}
 *   onDelete={() => console.log('Notification deleted')}
 *   notification={notification}
 *   cardProps={{ hideAvatar: false, showMedia: true }}
 *   styles={customStyles}
 * />
 *
 * @param {NotificationCardProps} props - The properties passed to the Card component.
 * @param {Function} props.onCardClick - Callback function executed when the card is clicked.
 * @param {Object} props.notification - The notification data to display in the card.
 * @param {Object} props.cardProps - Optional properties to customize the appearance of the card.
 * @param {Object} props.styles - Custom styles applied to the card and its elements.
 * @param {Function} props.onDelete - Callback function executed when the delete action is triggered.
 */

const renderAvatar = (
  notification: NotificationDataType,
  styles: Partial<SirenStyleProps>
): JSX.Element => {
  return (
    <View style={style.cardIconContainer}>
      <View style={[style.cardIconRound, styles.cardIconRound]}>
        {Boolean(notification?.message?.avatar?.imageUrl) && (
          <Image
            source={{ uri: notification.message?.avatar?.imageUrl }}
            resizeMode='cover'
            style={style.cardAvatarStyle}
          />
        )}
      </View>
    </View>
  );
};

const renderCloseIcon = (
  onDelete: (id: string) => void,
  notification: NotificationDataType,
  styles: Partial<SirenStyleProps>
) => {
  const icon: JSX.Element[] = [];

  for (let i = 0; i < 2; i++)
    icon.push(
      <View
        key={i}
        style={[
          style.closeIconLine,
          styles.closeIcon,
          { transform: [{ rotate: `${45 + i * 90}deg` }] }
        ]}
      />
    );

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
      onPress={() => onDelete(notification.id)}
      style={style.deleteButton}
      testID='delete-button'
    >
      <>{icon}</>
    </TouchableOpacity>
  );
};

const renderTimerIcon = (styles: Partial<SirenStyleProps>) => {
  return (
    <View style={[style.timerIcon, styles.timerIcon]}>
      <View style={[style.timerIconLine1, styles.timerIconLine]} />
      <View style={[style.timerIconLine2, styles.timerIconLine]} />
    </View>
  );
};

const Card = (props: NotificationCardProps): ReactElement => {
  const { onCardClick, notification, cardProps, styles, onDelete } = props;

  return (
    <TouchableOpacity
      onPress={() => onCardClick(notification)}
      activeOpacity={0.6}
      testID='card-touchable'
      style={[style.cardWrapper, styles.cardWrapper]}
    >
      <View
        style={[
          style.activeCardMarker,
          styles.activeCardMarker,
          notification?.isRead && style.transparent
        ]}
      />
      <View
        style={[
          style.cardContainer,
          styles.cardContainer,
          notification?.isRead && style.transparent
        ]}
      >
        {!cardProps?.hideAvatar && renderAvatar(notification, styles)}
        <View style={style.cardContentContainer}>
          <View style={style.cardFooterRow}>
            <Text numberOfLines={1} style={[styles.cardTitle, style.cardTitle]}>
              {notification.message?.header}
            </Text>

            {renderCloseIcon(onDelete, notification, styles)}
          </View>
          {Boolean(notification.message?.subHeader) && (
            <Text numberOfLines={1} style={[style.cardDescription, styles.cardDescription]}>
              {notification.message?.subHeader}
            </Text>
          )}
          <Text numberOfLines={3} style={[style.cardDescription, styles.cardDescription]}>
            {notification.message?.body}
          </Text>
          <View style={style.dateContainer}>
            {renderTimerIcon(styles)}
            <Text style={[style.dateStyle, styles.dateStyle]}>
              {CommonUtils.generateElapsedTimeText(notification.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  cardIconContainer: {
    paddingHorizontal: 10,
    paddingTop: 4
  },
  cardTitle: {
    paddingBottom: 4
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  cardIconRound: {
    overflow: 'hidden'
  },
  cardAvatarStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  cardContentContainer: {
    flex: 1,
    width: '100%',
    paddingRight: 6
  },
  cardDescription: {
    fontWeight: '400',
    paddingBottom: 10
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    width: 14,
    height: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    opacity: 0.8
  },
  dateStyle: {
    paddingLeft: 3
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  closeIconLine: {
    height: 1.6,
    marginVertical: 2,
    width: '100%',
    borderRadius: 1,
    position: 'absolute'
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.8
  },
  timerIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerIconLine1: {
    height: 4,
    width: 1
  },
  timerIconLine2: {
    height: 4,
    marginLeft: 2,
    marginTop: -1,
    width: 1.1,
    transform: [{ rotate: '120deg' }]
  },
  activeCardMarker: {
    width: 6,
    height: '100%'
  }
});

export default Card;

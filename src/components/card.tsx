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

const Card = (props: NotificationCardProps): ReactElement => {
  const { onCardClick, notification, cardProps, styles, onDelete } = props;

  return (
    <TouchableOpacity
      onPress={() => onCardClick(notification)}
      activeOpacity={0.6}
      testID='card-touchable'
      style={[style.cardContainer, styles.cardContainer, notification?.isRead && style.transparent]}
    >
      {!cardProps?.hideAvatar && renderAvatar(notification, styles)}
      <View style={style.cardContentContainer}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {notification.message?.header}
        </Text>
        {Boolean(notification.message?.subHeader) && (
          <Text numberOfLines={1} style={[style.cardDescription, styles.cardDescription]}>
            {notification.message?.subHeader}
          </Text>
        )}
        <Text numberOfLines={3} style={[style.cardDescription, styles.cardDescription]}>
          {notification.message?.body}
        </Text>
        {/* {cardProps?.showMedia && Boolean(notification.message?.media?.thumbnail) && (
          <Image
            source={{ uri: notification.message?.media?.thumbnail }}
            resizeMode='cover'
            style={[style.cardImageStyle, styles.cardImageStyle]}
          />
        )} */}
        <View style={style.cardFooterRow}>
          <Text style={[style.dateStyle, styles.dateStyle]}>
            {CommonUtils.generateElapsedTimeText(notification.createdAt)}
          </Text>
          <TouchableOpacity
            hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
            onPress={() => onDelete(notification.id)}
            style={style.deleteButton}
            testID='delete-button'
          >
            <Image
              source={require('../assets/trash.png')}
              resizeMode='contain'
              style={style.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  cardIconContainer: {
    paddingHorizontal: 10,
    paddingTop: 4
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
    width: '100%'
  },
  cardDescription: {
    fontWeight: '400',
    paddingBottom: 10
  },
  cardImageStyle: {
    overflow: 'hidden',
    marginBottom: 10
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  deleteButton: {
    width: 15,
    height: 15,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  dateStyle: {
    opacity: 0.6
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});

export default Card;

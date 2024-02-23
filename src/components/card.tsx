import type { ReactElement } from 'react';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import type { NotificationCardProps } from '../types';
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
const Card = (props: NotificationCardProps): ReactElement => {
  const { onCardClick, notification, cardProps, styles, onDelete } = props;

  return (
    <TouchableOpacity
      onPress={() => onCardClick(notification)}
      activeOpacity={0.6}
      style={[styles.cardContainer, notification?.isRead && styles.transparent]}
    >
      {!cardProps?.hideAvatar && (
        <View style={styles.cardIconContainer}>
          <View style={styles.cardIconRound}>
            {Boolean(notification?.message?.avatar?.imageUrl) && (
              <Image
                source={{ uri: notification.message?.avatar?.imageUrl }}
                resizeMode='cover'
                style={styles.cardAvatarStyle}
              />
            )}
          </View>
        </View>
      )}
      <View style={styles.cardContentContainer}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {notification.message?.header}
        </Text>
        {Boolean(notification.message?.subHeader) && (
          <Text numberOfLines={1} style={styles.cardDescription}>{notification.message?.subHeader}</Text>
        )}
        <Text numberOfLines={3} style={styles.cardDescription}>{notification.message?.body}</Text>
        {/* {cardProps?.showMedia && Boolean(notification.message?.media?.thumbnail) && (
          <Image
            source={{ uri: notification.message?.media?.thumbnail }}
            resizeMode='cover'
            style={styles.cardImageStyle}
          />
        )} */}
        <View style={styles.cardFooterRow}>
          <Text style={styles.dateStyle}>{CommonUtils.generateElapsedTimeText(notification.createdAt)}</Text>
          <TouchableOpacity onPress={() => onDelete(notification.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

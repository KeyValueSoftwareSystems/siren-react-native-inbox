import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { generateElapsedTimeText } from '../utils/commonUtils';
import type { SirenProps } from '../utils';

const Card = (props: SirenProps.NotificationCardProps) => {
  const { onCardClick, notification, cardProps, styles, onDelete } = props;

  return (
    <TouchableOpacity
      onPress={() => onCardClick(notification)}
      activeOpacity={0.6}
      style={[styles.cardContainer, notification?.isRead && { backgroundColor: 'transparent' }]}
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
          <Text style={styles.cardDescription}>{notification.message?.subHeader}</Text>
        )}
        <Text style={styles.cardDescription}>{notification.message?.body}</Text>
        {/* {cardProps?.showMedia && Boolean(notification.message?.media?.thumbnail) && (
          <Image
            source={{ uri: notification.message?.media?.thumbnail }}
            resizeMode='cover'
            style={styles.cardImageStyle}
          />
        )} */}
        <View style={styles.cardFooterRow}>
          <Text style={styles.dateStyle}>{generateElapsedTimeText(notification.createdAt)}</Text>
          <TouchableOpacity onPress={() => onDelete(notification.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

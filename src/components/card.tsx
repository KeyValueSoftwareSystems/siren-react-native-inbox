import React, { useState, type ReactElement, useMemo, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { NotificationCardProps } from '../types';
import { CommonUtils, useSiren } from '../utils';
import { eventTypes, events } from '../utils/constants';
import CloseIcon from './closeIcon';
import TimerIcon from './timerIcon';

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
 *   cardProps={{ hideAvatar: false, disableAutoMarkAsRead: false }}
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
  const { onCardClick, notification, cardProps = {}, styles, onDelete, darkMode } = props;
  const { hideAvatar, disableAutoMarkAsRead, hideDelete = false } = cardProps;
  const { markAsRead } = useSiren();

  const opacity = useRef(new Animated.Value(1)).current;

  const emptyState = () => {
    return darkMode ? require('../assets/emptyDark.png') : require('../assets/emptyLight.png');
  };

  const [imageSource, setImageSource] = useState(
    notification?.message?.avatar?.imageUrl?.length > 0
      ? { uri: notification.message?.avatar?.imageUrl }
      : emptyState()
  );

  useEffect(() => {
    setImageSource(
      notification?.message?.avatar?.imageUrl?.length > 0
        ? { uri: notification.message?.avatar?.imageUrl }
        : emptyState()
    );
  }, [notification, darkMode]);

  const cardClick = (): void => {
    onCardClick(notification);
    if (!disableAutoMarkAsRead) markAsRead(notification.id);
  };

  const onError = (): void => {
    setImageSource(emptyState());
  };

  const renderAvatar = useMemo((): JSX.Element => {
    return (
      <View style={style.cardIconContainer}>
        <View style={[style.cardIconRound, styles.cardIconRound]}>
          <Image
            source={imageSource}
            resizeMode='cover'
            style={style.cardAvatarStyle}
            onError={onError}
          />
        </View>
      </View>
    );
  }, [styles, darkMode, imageSource]);

  const onDeleteItem = async (): Promise<void> => {
    
    const isSuccess = await onDelete(notification.id, false);

    if (isSuccess) 
      Animated.timing(opacity, {
        toValue: 0.1,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        const payload = { id: notification.id, action: eventTypes.DELETE_ITEM };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      });
  };

  return (
    <TouchableOpacity
      onPress={cardClick}
      activeOpacity={0.6}
      testID='card-touchable'
      style={[style.cardWrapper, styles.cardWrapper, !notification?.isRead && styles.highlighted]}
    >
      <View
        style={[
          style.activeCardMarker,
          styles.activeCardMarker,
          notification?.isRead && style.transparent
        ]}
      />
      <Animated.View style={[style.cardContainer, styles.cardContainer, { opacity }]}>
        {!hideAvatar && renderAvatar}
        <View style={style.cardContentContainer}>
          <View style={style.cardFooterRow}>
            <Text numberOfLines={2} style={[styles.cardTitle, style.cardTitle]}>
              {notification.message?.header}
            </Text>
            {!hideDelete && (
              <CloseIcon onDelete={onDeleteItem} notification={notification} styles={styles} />
            )}
          </View>
          {Boolean(notification.message?.subHeader) && (
            <Text numberOfLines={2} style={[style.cardDescription, styles.cardDescription]}>
              {notification.message?.subHeader}
            </Text>
          )}
          <Text numberOfLines={2} style={[style.cardDescription, styles.cardDescription]}>
            {notification.message?.body}
          </Text>
          <View style={style.dateContainer}>
            <TimerIcon styles={styles} />
            <Text style={[style.dateStyle, styles.dateStyle]}>
              {CommonUtils.generateElapsedTimeText(notification.createdAt)}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 2
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  cardIconContainer: {
    paddingLeft: 6,
    paddingRight: 12,
    paddingTop: 4
  },
  cardTitle: {
    paddingBottom: 4,
    paddingTop: 4
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  cardIconRound: {
    overflow: 'hidden',
    backgroundColor: '#D3D3D3'
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
  dateStyle: {
    paddingLeft: 3
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.8
  },
  activeCardMarker: {
    width: 4,
    height: '100%'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});

export default Card;

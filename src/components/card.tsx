import React, { useState, type ReactElement, useMemo, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { NotificationCardProps } from '../types';
import { CommonUtils, useSiren } from '../utils';
import { eventTypes, events } from '../utils/constants';
import { useSirenContext } from './sirenProvider';
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
  const {
    hideAvatar,
    disableAutoMarkAsRead,
    hideDelete = false,
    onAvatarClick,
    deleteIcon = null,
    hideMediaThumbnail = false,
    onMediaThumbnailClick
  } = cardProps;
  const { markAsReadById } = useSiren();
  const { id: providerId } = useSirenContext();

  const opacity = useRef(new Animated.Value(1)).current;

  const emptyState = () => {
    return darkMode ? require('../assets/emptyDark.png') : require('../assets/emptyLight.png');
  };

  const failedState = () => {
    return darkMode
      ? require('../assets/failedImageDark.png')
      : require('../assets/failedImageLight.png');
  };

  const avatarUrl = notification?.message?.avatar?.imageUrl || '';
  const thumbnailUrl = notification?.message?.thumbnailUrl || '';

  const [imageSource, setImageSource] = useState(
    avatarUrl?.length > 0 ? { uri: avatarUrl } : emptyState()
  );

  const [mediaSource, setMediaSource] = useState(
    thumbnailUrl?.length > 0 ? { uri: thumbnailUrl } : emptyState()
  );

  useEffect(() => {
    setImageSource(avatarUrl?.length > 0 ? { uri: avatarUrl } : emptyState());
    setMediaSource(thumbnailUrl?.length > 0 ? { uri: thumbnailUrl } : failedState());
  }, [notification, darkMode]);

  const cardClick = (): void => {
    onCardClick(notification);
    if (!disableAutoMarkAsRead) markAsReadById(notification.id);
  };

  const onError = (): void => {
    setImageSource(emptyState());
  };

  const onErrorMedia = (): void => {
    setMediaSource(failedState());
  };

  const avatarClick = () => {
    if (onAvatarClick) onAvatarClick(notification);
  };

  const mediaClick = () => {
    if (onMediaThumbnailClick) onMediaThumbnailClick(notification);
  };

  const renderAvatar = useMemo((): JSX.Element => {
    return (
      <View style={style.cardIconContainer}>
        <TouchableOpacity
          disabled={Boolean(!onAvatarClick)}
          accessibilityLabel={`siren-notification-avatar-${notification.id}`}
          onPress={avatarClick}
          style={[style.cardIconRound, styles.cardIconRound]}
        >
          <Image
            source={imageSource}
            resizeMode='cover'
            style={style.cardAvatarStyle}
            onError={onError}
          />
        </TouchableOpacity>
      </View>
    );
  }, [styles, darkMode, imageSource, onAvatarClick]);

  const renderMediaThumbnail = useMemo((): JSX.Element => {
    return (
      <TouchableOpacity
        style={[style.mediaContainer, styles.mediaContainer]}
        disabled={Boolean(!onMediaThumbnailClick)}
        onPress={mediaClick}
      >
        <Image source={mediaSource} resizeMode='cover' style={style.icon} onError={onErrorMedia} />
      </TouchableOpacity>
    );
  }, [darkMode, mediaSource, onMediaThumbnailClick]);

  const onDeleteItem = async (): Promise<void> => {
    const isSuccess = await onDelete(notification.id, false);

    if (isSuccess)
      Animated.timing(opacity, {
        toValue: 0.1,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        const payload = { id: notification.id, action: eventTypes.DELETE_ITEM };

        PubSub.publish(`${events.NOTIFICATION_LIST_EVENT}${providerId}`, JSON.stringify(payload));
      });
  };

  return (
    <TouchableOpacity
      onPress={cardClick}
      activeOpacity={0.6}
      testID='card-touchable'
      accessibilityLabel={`siren-notification-card-${notification.id}`}
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
            {!hideDelete &&
              (deleteIcon || (
                <CloseIcon onDelete={onDeleteItem} notification={notification} styles={styles} />
              ))}
          </View>
          {Boolean(notification.message?.subHeader) && (
            <Text numberOfLines={2} style={[style.cardSubTitle, styles.cardSubTitle]}>
              {notification.message?.subHeader}
            </Text>
          )}
          {Boolean(notification.message?.body) && (
            <Text numberOfLines={2} style={[style.cardDescription, styles.cardDescription]}>
              {notification.message?.body}
            </Text>
          )}
          {!hideMediaThumbnail &&
            Boolean(notification.message?.thumbnailUrl) &&
            renderMediaThumbnail}
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
    alignItems: 'center'
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  cardIconContainer: {
    paddingLeft: 6,
    paddingRight: 6
  },
  cardTitle: {
    paddingBottom: 4
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
    paddingRight: 6,
    paddingLeft: 6
  },
  cardDescription: {
    paddingBottom: 10
  },
  cardSubTitle: {
    paddingBottom: 6
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
    height: '100%',
    position: 'absolute',
    zIndex: 2
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  mediaContainer: {
    width: '100%',
    height: 130,
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#D3D3D3'
  }
});

export default Card;

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PubSub from 'pubsub-js';
import { Siren } from 'test_notification';
import type { UnviewedCountReturnResponse } from 'test_notification/dist/esm/types';

import { useSirenContext } from './sirenProvider';
import type { SirenInboxIconProps } from '../types';
import { CommonUtils, Constants, DefaultTheme } from '../utils';

const { ThemeMode, defaultBadgeStyle, eventTypes, events } = Constants;
const { logger } = CommonUtils;

/**
 * `SirenInboxIcon` displays an icon representing the entry point to view notifications.
 *
 * @component
 * @example
 * <SirenInboxIcon
 *   theme={customTheme}
 *   notificationIcon={<CustomIcon />}
 *   darkMode={true}
 *   onError={(error) => console.error(error)}
 * />
 *
 * @param {Object} props - Props for configuring the SirenInboxIcon component.
 * @param {Object} [props.theme={}] - Theme object for custom styling of the badge.
 * @param {JSX.Element} [props.notificationIcon] - Custom icon to be used as the notification indicator.
 * @param {boolean} [props.darkMode=false] - Enables dark mode for the badge.
 * @param {boolean} [props.onPress=() => null] - Function for handling press of icon.
 * @param {boolean} [props.disabled=false] - Disable click handler of icon.
 */
const SirenInboxIcon = (props: SirenInboxIconProps) => {
  const {
    theme = { dark: {}, light: {} },
    notificationIcon,
    darkMode = false,
    onPress = () => null,
    disabled = false
  } = props;

  const { siren } = useSirenContext();

  const [unviewedCount, seUnviewedCount] = useState<number>(0);

  const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
  const badgeStyle = theme[mode]?.badgeStyle || {};
  const size = theme[mode]?.notificationIcon?.size || DefaultTheme[mode]?.notificationIcon?.size;
  const container = { width: size, height: size };

  const badge = { ...defaultBadgeStyle, ...badgeStyle };

  // Clean up - stop polling when component unmounts
  const cleanUp = () => () => {
    siren?.stopRealTimeUnviewedCountFetch();
  };

  const notificationSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    if (data.action === eventTypes.UPDATE_NOTIFICATIONS_COUNT) seUnviewedCount(data.unviewedCount);
  };

  useEffect(() => {
    initialize();

    return cleanUp();
  }, [siren]);

  useEffect(() => {
    if(unviewedCount >0) logger.info(`unviewed notification count : ${unviewedCount}`);
  }, [unviewedCount])

  // Function to initialize the Siren SDK and fetch unviewed notifications count
  const initialize = async (): Promise<void> => {
    if (Siren && siren) {
      PubSub.subscribe(events.NOTIFICATION_COUNT_EVENT, notificationSubscriber);
      const unViewed: UnviewedCountReturnResponse = await siren.fetchUnviewedNotificationsCount();

      siren.startRealTimeUnviewedCountFetch();
      if (unViewed?.data) seUnviewedCount(unViewed.data?.unviewedCount || 0);
    }
  };

  const renderBadge = (): JSX.Element | null => {
    const defaultBadgeStyle = {
      minWidth: badge.size,
      height: badge.size,
      borderRadius: badge.size * 0.5,
      backgroundColor: badge.color
    };
    const defaultBadgeText = {
      color: badge.textColor,
      fontSize: badge.textSize
    };
    const countLimit = 99;
    const reachCountLimit = unviewedCount >= countLimit;

    const defaultBadge = (
      <View style={[defaultBadgeStyle, styles.badge]}>
        <Text style={[defaultBadgeText, styles.badgeText]}>
          {reachCountLimit ? '99+' : unviewedCount}
        </Text>
      </View>
    );

    return defaultBadge;
  };

  const renderNotificationIcon = (): JSX.Element | null => {
    /* Render provided notification icon or default icon */
    if (notificationIcon) return notificationIcon;

    return (
      <Image source={require('../assets/notificationIcon.png')} resizeMode='contain' style={styles.iconStyle} />
    );
  };

  /* Render badge with unviewed count if count is greater than 0 */
  const showBadge = unviewedCount > 0;

  return (
    <TouchableOpacity
      testID='notification-icon'
      disabled={disabled}
      onPress={onPress}
      style={[container, styles.iconContainer]}
    >
      {showBadge && renderBadge()}

      {renderNotificationIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  iconStyle: {
    width: '100%',
    height: '100%'
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  badgeText: {
    fontWeight: '600',
    textAlign: 'center'
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden'
  }
});

export default SirenInboxIcon;

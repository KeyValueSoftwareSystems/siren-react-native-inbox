import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PubSub from 'pubsub-js';
import type { UnviewedCountReturnResponse } from '@sirenapp/js-sdk/dist/esm/types';

import { useSirenContext } from './sirenProvider';
import type { SirenInboxIconProps } from '../types';
import { CommonUtils, Constants } from '../utils';

const { ThemeMode, defaultBadgeStyle, eventTypes, events, defaultStyles } = Constants;
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
    customStyles = {},
    notificationIcon,
    darkMode = false,
    hideBadge = false,
    onPress = () => null,
    disabled = false,
    onError = () => null
  } = props;

  const { siren } = useSirenContext();

  const [unviewedCount, seUnviewedCount] = useState<number>(0);

  const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
  const bellIconSource = darkMode
    ? require('../assets/bellDark.png')
    : require('../assets/bellLight.png');
  const badgeTheme = theme[mode]?.badgeStyle || {};
  const badgeStyle = customStyles?.badgeStyle || {};
  const size = customStyles?.notificationIcon?.size || defaultStyles?.notificationIcon?.size;
  const container = { width: size, height: size };

  const badge = { ...defaultBadgeStyle, ...badgeStyle, ...badgeTheme };

  // Clean up - stop polling when component unmounts
  const cleanUp = () => () => {
    siren?.stopRealTimeUnviewedCountFetch();
    PubSub.unsubscribe(events.NOTIFICATION_COUNT_EVENT);
    seUnviewedCount(0);
  };

  const notificationSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    if (data.action === eventTypes.RESET_NOTIFICATIONS_COUNT) seUnviewedCount(0);
    else if (data.action === eventTypes.UPDATE_NOTIFICATIONS_COUNT)
      seUnviewedCount(data.unviewedCount);
  };

  useEffect(() => {
    PubSub.subscribe(events.NOTIFICATION_COUNT_EVENT, notificationSubscriber);

    return cleanUp();
  }, []);

  useEffect(() => {
    initialize();
  }, [siren]);

  useEffect(() => {
    if (unviewedCount > 0) logger.info(`unviewed notification count : ${unviewedCount}`);
  }, [unviewedCount]);

  // Function to initialize the Siren SDK and fetch unviewed notifications count
  const initialize = async (): Promise<void> => {
    if (siren) {
      const unViewed: UnviewedCountReturnResponse | null =
        await siren.fetchUnviewedNotificationsCount();

      siren.startRealTimeUnviewedCountFetch();
      if (unViewed?.data) seUnviewedCount(unViewed.data?.unviewedCount || 0);
      if (unViewed?.error) onError(unViewed?.error);
    }
  };

  const renderBadge = (): JSX.Element | null => {
    const defaultBadgeStyle: {
      minWidth?: number;
      height?: number;
      borderRadius?: number;
      backgroundColor?: string;
      top?: number;
      right?: number;
    } = {};
    const defaultBadgeText: {
      color?: string;
      fontSize?: number;
    } = {};

    if (badge.size) {
      defaultBadgeStyle.minWidth = badge.size;
      defaultBadgeStyle.height = badge.size;
      defaultBadgeStyle.borderRadius = badge.size;
    }
    if (badge.color) defaultBadgeStyle.backgroundColor = badge.color;
    if (badge.top) defaultBadgeStyle.top = badge.top;
    if (badge.right) defaultBadgeStyle.right = badge.right;
    if (badge.textColor) {
      defaultBadgeText.color = badge.textColor;
      defaultBadgeText.fontSize = badge.textSize;
    }
    const countLimit = 99;
    const reachCountLimit = unviewedCount >= countLimit;

    const defaultBadge = (
      <View style={[styles.badge, defaultBadgeStyle]}>
        <Text style={[styles.badgeText, defaultBadgeText]}>
          {reachCountLimit ? '99+' : unviewedCount}
        </Text>
      </View>
    );

    return defaultBadge;
  };

  const renderNotificationIcon = (): JSX.Element | null => {
    /* Render provided notification icon or default icon */
    if (notificationIcon) return notificationIcon;

    return <Image source={bellIconSource} resizeMode='contain' style={styles.iconStyle} />;
  };

  /* Render badge with unviewed count if count is greater than 0 */
  const showBadge = unviewedCount > 0 && !hideBadge;

  return (
    <TouchableOpacity
      testID='notification-icon'
      disabled={disabled}
      onPress={onPress}
      style={[styles.iconContainer, container]}
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

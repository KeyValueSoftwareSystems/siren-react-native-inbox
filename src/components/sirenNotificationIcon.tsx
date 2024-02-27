import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Siren } from 'test_notification';
import type { UnviewedCountReturnResponse } from 'test_notification/dist/types';

import type { SirenNotificationIconProps } from '../types';
import { Constants, DefaultTheme } from '../utils';
import { useSirenContext } from './sirenProvider';
import { defaultBadgeStyle } from '../utils/constants';

const { ThemeMode, sirenReducerTypes } = Constants;

/**
 * `SirenNotificationIcon` displays an icon representing the entry point to view notifications.
 *
 * @component
 * @example
 * <SirenNotificationIcon
 *   theme={customTheme}
 *   notificationIcon={<CustomIcon />}
 *   darkMode={true}
 *   realTimeUnviewedCountEnabled={true}
 *   onError={(error) => console.error(error)}
 * />
 *
 * @param {Object} props - Props for configuring the SirenNotificationIcon component.
 * @param {Object} [props.theme={}] - Theme object for custom styling of the badge.
 * @param {JSX.Element} [props.notificationIcon] - Custom icon to be used as the notification indicator.
 * @param {boolean} [props.darkMode=false] - Enables dark mode for the badge.
 * @param {boolean} [props.realTimeUnviewedCountEnabled=true] - Enables real-time fetching of the unviewed notifications count.
 * @param {boolean} [props.onPress=() => null] - Function for handling press of icon.
 * @param {boolean} [props.disabled=false] - Disable click handler of icon.
 */
const SirenNotificationIcon = (props: SirenNotificationIconProps) => {
  const {
    theme = { dark: {}, light: {} },
    notificationIcon,
    darkMode = false,
    realTimeUnviewedCountEnabled = true,
    onPress = () => null,
    disabled = false
  } = props;

  const { siren, unviewedCount, dispatch } = useSirenContext();

  const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
  const badgeStyle = theme[mode]?.badgeStyle || {};
  const size = theme[mode]?.notificationIcon?.size || DefaultTheme[mode]?.notificationIcon?.size;
  const container = { width: size, height: size };

  const badge = { ...defaultBadgeStyle, ...badgeStyle };

  // Clean up - stop polling when component unmounts
  const cleanUp = () => () => {
    siren?.stopRealTimeUnviewedCountFetch();
  };

  useEffect(() => {
    initialize();

    return cleanUp();
  }, [siren]);

  useEffect(() => {
    if (realTimeUnviewedCountEnabled) siren?.startRealTimeUnviewedCountFetch();
    else siren?.stopRealTimeUnviewedCountFetch();
  }, [realTimeUnviewedCountEnabled]);

  // Function to initialize the Siren SDK and fetch unviewed notifications count
  const initialize = async (): Promise<void> => {
    if (Siren && siren) {
      const unViewed: UnviewedCountReturnResponse = await siren.fetchUnviewedNotificationsCount();

      if (realTimeUnviewedCountEnabled) siren?.startRealTimeUnviewedCountFetch();
      if (unViewed?.data)
        dispatch({
          type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
          payload: unViewed.data?.unviewedCount || 0
        });
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
      <Image source={require('../assets/icon.png')} resizeMode='contain' style={styles.iconStyle} />
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

export default SirenNotificationIcon;

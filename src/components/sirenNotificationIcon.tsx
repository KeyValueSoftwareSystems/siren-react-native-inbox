import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Siren } from 'bilta-sdk';
import type { SirenErrorType } from 'bilta-sdk/dist/types';

import type { SirenNotificationIconProps, UnviewedType } from '../types';
import { Constants, CommonUtils } from '../utils';
import { useSirenContext } from './sirenProvider';
import { defaultBadgeStyle } from '../utils/constants';

const { ThemeMode } = Constants;
const { logger } = CommonUtils;

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
 * @param {Function} [props.onError] - Callback function to handle errors.
 */
const SirenNotificationIcon = (props: SirenNotificationIconProps) => {
  const {
    theme = { dark: {}, light: {} },
    notificationIcon,
    darkMode = false,
    realTimeUnviewedCountEnabled = true,
    onError
  } = props;

  const { sirenCore, error, clearError, unviewedCount, setUnviewedCount } = useSirenContext();

  const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
  const badgeStyle = theme[mode]?.badgeStyle || {};

  const badge = { ...defaultBadgeStyle, ...badgeStyle };

  useEffect(() => {
    initialize();

    // Clean up - stop polling when component unmounts
    return () => {
      if (realTimeUnviewedCountEnabled) sirenCore?.stopRealTimeUnviewedCountFetch();
    };
  }, [sirenCore]);

  useEffect(() => {
    if (error) {
      if (onError) onError(error);
      else defaultError(error);
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (realTimeUnviewedCountEnabled) sirenCore?.startRealTimeUnviewedCountFetch();
    else sirenCore?.stopRealTimeUnviewedCountFetch();
  }, [realTimeUnviewedCountEnabled]);

  const defaultError = (error: SirenErrorType) => {
    logger.error(JSON.stringify({ error }));
  };

  // Function to initialize the Siren SDK and fetch unviewed notifications count
  const initialize = async (): Promise<void> => {
    if (Siren && sirenCore) {
      const unViewed: UnviewedType = await sirenCore.fetchUnviewedNotificationsCount();

      if (realTimeUnviewedCountEnabled) sirenCore?.startRealTimeUnviewedCountFetch();
      if (unViewed) setUnviewedCount(unViewed.unviewedCount);
    }
  };

  const renderBadge = (): JSX.Element | null => {
    const defaultBadge = (
      <View
        style={[
          {
            minWidth: badge.size,
            height: badge.size,
            borderRadius: badge.size * 0.5,
            backgroundColor: badge.color
          },
          styles.badge
        ]}
      >
        <Text
          style={[
            {
              color: badge.textColor,
              fontSize: badge.textSize
            },
            styles.badgeText
          ]}
        >
          {unviewedCount > 99 ? '99+' : unviewedCount}
        </Text>
      </View>
    );

    return defaultBadge;
  };

  return (
    <TouchableOpacity disabled style={styles.container}>
      {/* Render badge with unviewed count if count is greater than 0 */}
      {unviewedCount > 0 && renderBadge()}
      {/* Render provided notification icon or default icon */}
      {notificationIcon || (
        <Image
          source={require('../assets/icon.png')}
          resizeMode='contain'
          style={styles.iconStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50
  },
  iconStyle: {
    width: 50,
    height: 50
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

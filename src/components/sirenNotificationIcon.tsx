import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SirenWeb } from 'bilta-sdk';
import type { SirenErrorType } from 'bilta-sdk/dist/types';

import type { SirenProps } from '../utils';
import { BadgeType, ThemeMode } from '../utils/constants';
import { useSirenContext } from './sirenProvider';
import { logger } from '../utils/commonUtils';

const SirenNotificationIcon = (props: SirenProps.SirenNotificationIconProps) => {
  const {
    theme = {},
    notificationIcon,
    darkMode = false,
    badgeType = BadgeType.DEFAULT,
    realTimeUnviewedCountEnabled = true,
    onError
  } = props;

  const { sirenCore, sirenError, clearError, unviewedCount, setUnviewedCount } = useSirenContext();

  const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
  const badgeStyle = theme[mode]?.badgeStyle || {};
  const defaultBadgeStyle = {
    size: 20,
    color: '#FF0000',
    textColor: '#FFFFFF',
    textSize: 10
  };
  const badge = {...defaultBadgeStyle,...badgeStyle };

  useEffect(() => {
    (async () => {
      await initialize();
    })();

    // Clean up - stop polling when component unmounts
    return () => {
      if (realTimeUnviewedCountEnabled) sirenCore?.stopRealTimeUnviewedCountFetch();
    };
  }, [sirenCore]);

  useEffect(() => {
    if (sirenError) {
      if (onError) onError(sirenError);
      else defaultError(sirenError);
      clearError();
    }
  }, [sirenError]);

  useEffect(() => {
    if (realTimeUnviewedCountEnabled) sirenCore?.startRealTimeUnviewedCountFetch();
    else sirenCore?.stopRealTimeUnviewedCountFetch();
  }, [realTimeUnviewedCountEnabled]);

  const defaultError = (error: SirenErrorType) => {
    logger.error(JSON.stringify({ error }));
  };

  // Function to initialize the Siren SDK and fetch unviewed notifications count
  const initialize = async () => {
    if (SirenWeb && sirenCore) {
      const unViewed: SirenProps.UnviewedType = await sirenCore.fetchUnviewedNotificationsCount();

      if (realTimeUnviewedCountEnabled) sirenCore?.startRealTimeUnviewedCountFetch();
      if (unViewed) setUnviewedCount(unViewed.unviewedCount);
    }
  };

  const renderBadge = () => {
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

    const dot = <View style={[styles.dot, { backgroundColor: badge.color }]} />;

    switch (badgeType) {
      case BadgeType.DEFAULT:
        return defaultBadge;
      case BadgeType.NONE:
        return null;
      case BadgeType.DOT:
        return dot;
      default:
        return defaultBadge;
    }
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

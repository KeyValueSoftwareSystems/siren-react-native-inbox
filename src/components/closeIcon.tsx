import React, { type ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import type { NotificationDataType } from '@sirenapp/js-sdk/dist/esm/types';

import type { StyleProps } from '../types';

const CloseIcon = ({
  notification,
  styles,
  onDelete
}: {
  notification: NotificationDataType;
  styles: Partial<StyleProps>;
  onDelete: (id: string) => void;
}): ReactElement => {
  const icon: JSX.Element[] = [];

  for (let i = 0; i < 2; i++)
    icon.push(
      <View
        key={i}
        style={[
          style.closeIconLine,
          styles.closeIcon,
          { transform: [{ rotate: `${45 + i * 90}deg` }] }
        ]}
      />
    );

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
      onPress={() => onDelete(notification.id)}
      style={[style.closeButton, styles.closeButton]}
      testID='delete-button'
      accessibilityLabel={`siren-notification-delete${notification.id}`}
    >
      <>{icon}</>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  closeIconLine: {
    marginVertical: 2,
    width: '100%',
    borderRadius: 1,
    position: 'absolute',
  },
  closeButton: {
    overflow: 'hidden',
    justifyContent: 'center',
    opacity: 0.8,
  }
});

export default CloseIcon;

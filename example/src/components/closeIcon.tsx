import React, { type ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import type { NotificationDataType } from 'test_notification/dist/esm/types';


const CloseIcon = ({
  notification,
  onDelete
}: {
  notification: NotificationDataType;
  onDelete: (id: string) => void;
}): ReactElement => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
      onPress={() => onDelete(notification.id)}
      style={style.closeButton}
      testID='delete-button'
    >
      <Image
        source={require('../assets/closeIcon.png')}
        resizeMode='contain'
        style={style.iconStyle}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  closeIconLine: {
    height: 1.6,
    marginVertical: 2,
    width: '100%',
    borderRadius: 1,
    position: 'absolute'
  },
  closeButton: {
    width: 12,
    height: 12
  },
  iconStyle: {
    width: '100%',
    height: '100%'
  }
});

export default CloseIcon;

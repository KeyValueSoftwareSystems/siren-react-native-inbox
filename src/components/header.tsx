import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import useSiren from '../utils/sirenHook';
import type { SirenProps } from '../utils';

const Header = (props: {
  title: string;
  styles: SirenProps.SirenStyleProps;
  onClearAllNotifications: () => void;
}) => {
  const { title = '', styles, onClearAllNotifications } = props;
  const { clearAllNotification } = useSiren();

  const onPressClearAll = () => {
    clearAllNotification();
    onClearAllNotifications();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onPressClearAll}>
        <Text style={styles.headerAction}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

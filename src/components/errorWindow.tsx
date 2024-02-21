import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Constants } from '../utils';
import type { SirenProps } from '../utils';

const { ERROR_TEXT, RETRY_BUTTON_LABEL } = Constants;

const ErrorWindow = (props: { styles: SirenProps.SirenStyleProps; onRefresh: () => void }) => {
  const { styles, onRefresh } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.errorText}>{ERROR_TEXT}</Text>
      <TouchableOpacity onPress={onRefresh} style={styles.errorButton}>
        <Text style={styles.errorButtonText}>{RETRY_BUTTON_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorWindow;

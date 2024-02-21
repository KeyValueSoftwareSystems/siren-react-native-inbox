import React from 'react';
import { Text, View } from 'react-native';

import { Constants } from '../utils';
import type { SirenProps } from '../utils';

const { LIST_EMPTY_TEXT } = Constants;

const EmptyWindow = (props: { styles: SirenProps.SirenStyleProps }) => {
  const { styles } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{LIST_EMPTY_TEXT}</Text>
    </View>
  );
};

export default EmptyWindow;

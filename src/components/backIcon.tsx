import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { StyleProps } from '../types';

const BackIcon = ({ styles }: { styles: Partial<StyleProps> }): ReactElement => {
  return (
    <View style={style.backIconContainer}>
      <View style={[style.backIconLine1, styles.backIcon]} />
      <View style={[style.backIconLine2, styles.backIcon]} />
    </View>
  );
};

const style = StyleSheet.create({
  backIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 30,
    width: 20,
  },
  backIconLine1: {
    width: 12,
    height: 2,
    backgroundColor: 'red',
    transform: [{
      rotate: '130deg'
    }]
  },
  backIconLine2: {
    marginTop: 6,
    width: 12,
    height: 2,
    backgroundColor: 'red',
    transform: [{
      rotate: '230deg'
    }]
  }
});

export default BackIcon;

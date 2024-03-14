import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

const TimerIcon = ({ styles }: { styles: Partial<SirenStyleProps> }): ReactElement => {
  return (
    <View style={[style.timerIcon, styles.timerIcon]}>
      <View style={[style.timerIconLine1, styles.timerIconLine]} />
      <View style={[style.timerIconLine2, styles.timerIconLine]} />
    </View>
  );
};

const style = StyleSheet.create({
  timerIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerIconLine1: {
    height: 4,
    width: 1
  },
  timerIconLine2: {
    height: 4,
    marginLeft: 2,
    marginTop: -1,
    width: 1.1,
    transform: [{ rotate: '120deg' }]
  }
});

export default TimerIcon;

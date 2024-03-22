import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

const TimerIcon = ({ styles }: { styles: Partial<SirenStyleProps> }): ReactElement => {
  return (
    <View style={[style.timerIcon, styles.timerIcon]}>
      <View style={styles.timerIconLine} />
      <View style={[style.timerIconLine, styles.timerIconLine2]} />
    </View>
  );
};

const style = StyleSheet.create({
  timerIcon: {
    overflow: 'hidden',
    alignItems: 'center'
  },
  timerIconLine: {
    transform: [{ rotate: '120deg' }]
  }
});

export default TimerIcon;

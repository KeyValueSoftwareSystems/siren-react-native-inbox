import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

const ClearIcon = ({ styles }: { styles: Partial<SirenStyleProps> }): ReactElement => {
  const icon: JSX.Element[] = [];

  for (let i = 0; i < 3; i++)
    icon.push(
      <View key={i} style={[style.clearIcon, styles.clearIcon, { marginLeft: (2 - i) * 5 }]} />
    );

  return <View style={[style.clearIconContainer, styles.clearIconContainer]}>{icon}</View>;
};

const style = StyleSheet.create({
  clearIcon: {
    width: '100%'
  },
  clearIconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ClearIcon;

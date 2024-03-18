import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

const ClearIcon = ({ styles }: { styles: Partial<SirenStyleProps> }): ReactElement => {
  const icon: JSX.Element[] = [];

  for (let i = 0; i < 3; i++)
    icon.push(
      <View key={i} style={[style.clearIcon, styles.clearIcon, { marginLeft: (3 - i) * 2 }]} />
    );

  return <View style={[style.clearIconContainer, styles.clearIconContainer]}>{icon}</View>;
};

const style = StyleSheet.create({
  clearIcon: {
    height: 2,
    width: '100%',
    borderRadius: 1.2,
    marginTop: 1.5,
    marginBottom: 0.5,
    marginRight: 5
  },
  clearIconContainer: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ClearIcon;

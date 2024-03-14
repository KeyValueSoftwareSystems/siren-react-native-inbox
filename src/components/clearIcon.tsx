import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

const ClearIcon = ({ styles }: { styles: Partial<SirenStyleProps> }): ReactElement => {
  const icon: JSX.Element[] = [];

  for (let i = 0; i < 3; i++)
    icon.push(
      <View key={i} style={[style.clearIcon, styles.clearIcon, { marginLeft: (3 - i) * 2 }]} />
    );

  return <View>{icon}</View>;
};

const style = StyleSheet.create({
  clearIcon: {
    height: 2.4,
    width: 14,
    borderRadius: 1.2,
    margin: 1,
    marginRight: 5
  },
});

export default ClearIcon;

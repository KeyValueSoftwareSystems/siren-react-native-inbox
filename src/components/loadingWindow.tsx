import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import type { SirenProps } from '../utils';
import { DefaultTheme } from '../utils';
import type { ThemeMode } from '../utils/constants';

type LoadingWindowProps = {
  styles: SirenProps.SirenStyleProps;
  mode: ThemeMode;
  theme: SirenProps.ThemeProps | undefined;
};

const LoadingWindow = (props: LoadingWindowProps) => {
  const { styles, mode, theme } = props;

  return (
    <View style={styles.emptyContainer}>
      <ActivityIndicator
        color={theme?.colors?.textColor || DefaultTheme[mode].colors.primaryColor}
        size={'large'}
      />
    </View>
  );
};

export default LoadingWindow;

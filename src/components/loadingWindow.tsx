import type { ReactElement } from 'react';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import type { SirenStyleProps, ThemeProps } from '../types';
import { DefaultTheme, type Constants } from '../utils';

type LoadingWindowProps = {
  styles: Partial<SirenStyleProps>;
  mode: Constants.ThemeMode;
  theme: ThemeProps;
};
/**
 * Displays a loading indicator within a window,
 *
 * @component
 * @example
 * <LoadingWindow
 *   styles={customStyles}
 *   mode="light"
 *   theme={customThemeProps}
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.styles - Custom styles applied to the loading window container.
 * @param {ThemeMode} props.mode - The theme mode: 'light' or 'dark' mode
 * @param {ThemeProps} [props.theme] - Optional theme properties to customize the appearance.
 */
const LoadingWindow = (props: LoadingWindowProps): ReactElement => {
  const { styles, mode, theme } = props;

  return (
    <View style={styles.emptyContainer}>
      <ActivityIndicator
        color={theme?.colors?.textColor || DefaultTheme[mode].colors.primaryColor}
        size='large'
      />
    </View>
  );
};

export default LoadingWindow;

import React, { type ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import type { ThemeProps } from '../types';
import { type Constants, DefaultTheme } from '../utils';

type SpinnerProps = {
  mode: Constants.ThemeMode;
  theme: ThemeProps;
};
/**
 * Displays a loading indicator in list footer,
 *
 * @component
 * @example
 * <Spinner
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
const Spinner = (props: SpinnerProps): ReactElement => {
  const { mode, theme } = props;

  return (
    <View style={style.container}>
      <ActivityIndicator
        testID='activity-indicator'
        color={theme?.colors?.infiniteLoader || DefaultTheme[mode].colors.infiniteLoader}
        size='small'
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minHeight: 50,
    width: '100%'
  }
});

export default Spinner;

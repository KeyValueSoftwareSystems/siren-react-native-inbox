import React, { type ReactElement } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import type { StyleProps } from '../types';
import { Constants } from '../utils';
import { ERROR_DESCRIPTION } from '../utils/constants';

const { ERROR_TEXT } = Constants;

/**
 * `ErrorWindow` is a React component that displays an error message and provides a retry button.
 *
 * @component
 * @example
 * <ErrorWindow
 *   styles={customErrorStyles}
 *   onRetry={() => console.log('Retry action triggered')}
 * />
 *
 * @param {Object} props.styles - Custom styles applied to the error window
 * @param {Function} props.onRetry - A callback function that is invoked when the user presses the refresh button.
 */
const ErrorWindow = (props: {
  styles: Partial<StyleProps>;
  darkMode: boolean;
  customErrorWindow?: JSX.Element | null;
}): ReactElement => {
  const { styles, darkMode, customErrorWindow } = props;

  const containerStyle = { backgroundColor: darkMode ? '#38383D' : '#F7F9FC' };
  const iconStyle = { opacity: darkMode ? 0.6 : 1 };

  return (
    <View accessibilityLabel='siren-error-state' style={[style.container, styles.container]}>
      {customErrorWindow || (
        <>
          <View style={[style.iconContainer, containerStyle]}>
            <Image
              source={require('../assets/errorIcon.png')}
              resizeMode='contain'
              style={[style.iconStyle, iconStyle]}
            />
          </View>
          <Text style={[style.errorText, styles.errorText]}>{ERROR_TEXT}</Text>
          <Text style={[style.errorDescription, styles.errorText]}>{ERROR_DESCRIPTION}</Text>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minHeight: 400,
    width: '100%'
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 5,
    textAlign: 'center',
    paddingTop: 20
  },
  errorDescription: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.8
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    width: 62,
    height: 62
  }
});

export default ErrorWindow;

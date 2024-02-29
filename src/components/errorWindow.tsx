import type { ReactElement } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';

const { ERROR_TEXT, RETRY_BUTTON_LABEL } = Constants;

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
  styles: Partial<SirenStyleProps>;
  onRetry: () => void;
}): ReactElement => {
  const { styles, onRetry } = props;

  return (
    <View style={style.container}>
      <Text style={[style.errorText, styles.errorText]}>{ERROR_TEXT}</Text>
      <TouchableOpacity onPress={onRetry} style={[style.errorButton, styles.errorButton]}>
        <Text style={[style.errorButtonText, styles.errorButtonText]}>{RETRY_BUTTON_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minHeight: 100,
    width: '100%'
  },
  errorText: {
    fontSize: 18,
    fontWeight: '400',
    padding: 20
  },
  errorButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: '500'
  }
});

export default ErrorWindow;

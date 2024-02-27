import type { ReactElement } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
const ErrorWindow = (props: { styles: Partial<SirenStyleProps>; onRetry: () => void }): ReactElement => {
  const { styles, onRetry } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.errorText}>{ERROR_TEXT}</Text>
      <TouchableOpacity onPress={onRetry} style={styles.errorButton}>
        <Text style={styles.errorButtonText}>{RETRY_BUTTON_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorWindow;

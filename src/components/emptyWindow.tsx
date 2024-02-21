import type { ReactElement } from 'react';
import React from 'react';
import { Text, View } from 'react-native';

import { Constants } from '../utils';
import type { SirenProps } from '../utils';

const { LIST_EMPTY_TEXT } = Constants;

/**
 * `EmptyWindow` is a React component designed to display a message indicating that a list is currently empty.
 *
 * @component
 * @example
 * <EmptyWindow
 *   styles={customStyles}
 * />
 *
 * @param {Object} props.styles - Custom styles applied to the empty window.
 */
const EmptyWindow = (props: { styles: SirenProps.SirenStyleProps }): ReactElement => {
  const { styles } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{LIST_EMPTY_TEXT}</Text>
    </View>
  );
};

export default EmptyWindow;

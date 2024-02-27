import type { ReactElement } from 'react';
import React from 'react';
import { Text, View } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';

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
const EmptyWindow = (props: { styles: Partial<SirenStyleProps> }): ReactElement => {
  const { styles } = props;

  return (
    <View style={styles.emptyContainer}>
      <Text numberOfLines={1} style={styles.emptyText}>{LIST_EMPTY_TEXT}</Text>
    </View>
  );
};

export default EmptyWindow;

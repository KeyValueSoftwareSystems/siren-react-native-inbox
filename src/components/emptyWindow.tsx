import type { ReactElement } from 'react';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
    <View style={style.container}>
      <Text numberOfLines={1} style={[style.emptyText, styles.emptyText]}>
        {LIST_EMPTY_TEXT}
      </Text>
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
  emptyText: {
    fontSize: 18,
    fontWeight: '400',
    padding: 20
  }
});

export default EmptyWindow;

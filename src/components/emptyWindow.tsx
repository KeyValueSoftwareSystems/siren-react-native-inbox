import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';

const { LIST_EMPTY_TEXT, LIST_EMPTY_DESCRIPTION } = Constants;

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
const EmptyWindow = (props: {
  styles: Partial<SirenStyleProps>;
  darkMode: boolean;
}): ReactElement => {
  const { styles, darkMode } = props;

  const containerStyle = { backgroundColor: darkMode ? '#38383D' : '#F7F9FC' };
  const iconStyle = { opacity: darkMode ? 0.6 : 1 };

  return (
    <View style={[style.container, styles.container]}>
      <View style={[style.iconContainer, containerStyle]}>
        <Image
          source={require('../assets/emptyNotificationIcon.png')}
          resizeMode='contain'
          style={[style.iconStyle, iconStyle]}
        />
      </View>
      <Text style={[style.emptyText, styles.errorText]}>{LIST_EMPTY_TEXT}</Text>
      <Text style={[style.emptyDescription, styles.errorText]}>{LIST_EMPTY_DESCRIPTION}</Text>
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
  emptyText: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 5,
    textAlign: 'center',
    paddingTop: 20
  },
  emptyDescription: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.8
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    width: 62,
    height: 62
  }
});

export default EmptyWindow;

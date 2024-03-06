import React, { type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';

/**
 * Renders a header component with a title and a "Clear All" (deletes all the notifications till date) action.
 *
 * @component
 * @example
 * <Header
 *   title="Notification Center"
 *   styles={customStyles}
 *   onClearAllNotifications={() => console.log('All notifications cleared')}
 *   clearAllDisabled={false}
 * />
 *
 * @param {Object} props - The properties passed to the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {Object} props.styles - Custom styles to apply to the header component.
 * @param {Function} props.onClearAllNotifications - A callback function that is called when the "Clear All" action is triggered.
 * @param {boolean} props.clearAllDisabled - Disables the clear all button.
 */
const Header = (props: {
  title: string;
  styles: Partial<SirenStyleProps>;
  onPressClearAll: () => void;
  clearAllDisabled: boolean;
}): ReactElement => {
  const { title = '', styles, onPressClearAll, clearAllDisabled = false } = props;

  return (
    <View style={[style.headerContainer, styles.headerContainer]}>
      <Text numberOfLines={1} style={[style.headerTitle, styles.headerTitle]}>
        {title}
      </Text>
      <TouchableOpacity disabled={clearAllDisabled} onPress={onPressClearAll}>
        <Text style={styles.headerAction}>{Constants.CLEAR_ALL_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  headerTitle: {
    width: '70%'
  }
});

export default Header;

import type { ReactElement } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';

/**
 * Renders a header component with a title and a "Clear All" (deletes all the notifications till date) action.
 *
 *
 * @component
 * @example
 * <Header
 *   title="Notification Center"
 *   styles={customStyles}
 *   onClearAllNotifications={() => console.log('All notifications cleared')}
 * />
 *
 * @param {Object} props - The properties passed to the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {Object} props.styles - Custom styles to apply to the header component.
 * @param {Function} props.onClearAllNotifications - A callback function that is called when the "Clear All" action is triggered.
 */
const Header = (props: {
  title: string;
  styles: SirenStyleProps;
  onPressClearAll: () => void;
}): ReactElement => {
  const { title = '', styles, onPressClearAll } = props;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onPressClearAll}>
        <Text style={styles.headerAction}>{Constants.CLEAR_ALL_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

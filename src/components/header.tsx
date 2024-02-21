import type { ReactElement } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import useSiren from '../utils/sirenHook';
import type { SirenProps } from '../utils';

/**
 * Renders a header component with a title and a "Clear All" action.
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
  styles: SirenProps.SirenStyleProps;
  onClearAllNotifications: () => void;
}): ReactElement => {
  const { title = '', styles, onClearAllNotifications } = props;
  const { clearAllNotification } = useSiren();

  const onPressClearAll = () => {
    clearAllNotification();
    onClearAllNotifications();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onPressClearAll}>
        <Text style={styles.headerAction}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

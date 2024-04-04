import React, { type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { SirenStyleProps } from '../types';
import { Constants } from '../utils';
import ClearIcon from './clearIcon';
import BackIcon from './backIcon';

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
 * @param {boolean} props.showBackButton - Toggle for show back button in header.
 * @param {boolean} props.backButton - Custom back button.
 * @param {boolean} props.onBackPress - A callback function that is called when back button is pressed.
 */

type HeaderProps = {
  title: string;
  styles: Partial<SirenStyleProps>;
  onPressClearAll: () => void;
  clearAllDisabled: boolean;
  hideClearAll?: boolean;
  showBackButton?: boolean;
  backButton?: JSX.Element;
  onBackPress?: () => void;
};

const Header = (props: HeaderProps): ReactElement => {
  const {
    title = '',
    styles,
    onPressClearAll,
    clearAllDisabled = false,
    hideClearAll,
    showBackButton = false,
    backButton,
    onBackPress = () => null
  } = props;

  const renderBackButton = () => {
    if (showBackButton)
      return (
        <TouchableOpacity onPress={onBackPress}>
          {backButton || <BackIcon styles={styles} />}
        </TouchableOpacity>
      );
    
    return null;
  };

  return (
    <View style={[style.headerContainer, styles.headerContainer]}>
      {renderBackButton()}
      <Text numberOfLines={1} style={[style.headerTitle, styles.headerTitle]}>
        {title}
      </Text>
      {!hideClearAll && (
        <TouchableOpacity
          disabled={clearAllDisabled}
          onPress={onPressClearAll}
          style={style.clearIconContainer}
        >
          <ClearIcon styles={styles} />
          <Text style={styles.headerAction}>{Constants.CLEAR_ALL_LABEL}</Text>
        </TouchableOpacity>
      )}
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
  clearIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    width: '70%'
  }
});

export default Header;

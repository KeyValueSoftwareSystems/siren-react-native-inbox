import React, { useState, type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { StyleProps } from '../types';

/**
 *
 * @component
 * @example
 * <Tabs
 *   activeIndex={0}
 *   tabs={[{ key: 'All', title: 'All' }, { key: 'Unread', title: 'Unread ' }]}
 * />
 *
 * @param {Object} props - The properties passed to the Tab component.
 * @param {number} props.activeIndex - activeIndex control the tab selection.
 * @param {Object} props.styles - Custom styles to apply to the header component.
 * @param {Array} props.tabs - List of tab items to be renderd.
 */

type TabProps = {
  activeIndex?: number;
  tabs: Array<{ key: string; title: string }>;
  styles: Partial<StyleProps>;
  onPressTab?: (index: number, key: string) => void;
};

const Tabs = (props: TabProps): ReactElement => {
  const { tabs, activeIndex = 0, styles, onPressTab = () => null } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);

  const onPressTabItem = (index: number, key: string) => {
    setActiveTabIndex(index);
    onPressTab(index, key);
  };

  return (
    <View style={[style.tabContainer, styles.tabContainer]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab?.key}
          activeOpacity={0.8}
          style={[style.tab, activeTabIndex === index ? styles.activeTab : styles.inActiveTab]}
          onPress={() => onPressTabItem(index, tab?.key)}
        >
          <Text
            style={[
              style.tabText,
              activeTabIndex === index ? styles.activeTabText : styles.inActiveTabText
            ]}
          >
            {tab.title}
          </Text>
          {activeTabIndex === index && (
            <View style={[style.activeIndicator, styles.activeIndicator]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 46,
    paddingHorizontal: 10,
    borderBottomWidth: 0.6
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 30,
    marginHorizontal: 5
  },
  tabText: {
    color: '#000',
    fontWeight: '600',
    paddingHorizontal: 14,
    fontSize: 14
  },
  activeIndicator: {
    width: '100%',
    height: 3,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0
  }
});

export default Tabs;

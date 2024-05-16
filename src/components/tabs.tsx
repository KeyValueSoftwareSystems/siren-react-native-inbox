import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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
  const translateX = useRef(new Animated.Value(0)).current;

  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);
  const [tabTitleWidths, setTabTitleWidths] = useState<number[]>([]);

  useEffect(() => {
    moveIndicator();
  }, [activeTabIndex]);

  useEffect(() => {
    setActiveTabIndex(activeIndex);
  },[activeIndex]);

  const onPressTabItem = (index: number, key: string) => {
    setActiveTabIndex(index);
    onPressTab(index, key);
  };

  const getIndicatorPosition = () => {
    let position = 5;

    for (let i = 0; i < activeTabIndex; i++)
      position += tabTitleWidths[i] + 10;

    return position;
  };

  const moveIndicator = () => {
    Animated.timing(translateX, {
      toValue: getIndicatorPosition(),
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const onTabTitleLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    const updatedWidths = [...tabTitleWidths];
    
    updatedWidths[index] = width;
    setTabTitleWidths(updatedWidths);
  };

  return (
    <View style={[style.tabContainer, styles.tabContainer]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab?.key}
            activeOpacity={0.8}
            style={[style.tab, activeTabIndex === index ? styles.activeTab : styles.inActiveTab]}
            onPress={() => onPressTabItem(index, tab?.key)}
            onLayout={(event) => onTabTitleLayout(index, event)}
          >
            <Text
              style={[
                style.tabText,
                activeTabIndex === index ? styles.activeTabText : styles.inActiveTabText
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            style.activeIndicator,
            styles.activeIndicator,
            { transform: [{ translateX }], width: tabTitleWidths[activeTabIndex] }
          ]}
        />
      </ScrollView>
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
    height: 3,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0
  }
});

export default Tabs;

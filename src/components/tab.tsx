import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent
} from 'react-native';

import type { StyleProps } from '../types';

const { width } = Dimensions.get('window');

/**
 *
 * @component
 * @example
 * <Tabs
 *   activeIndex={0}
 *   tabs={[{ key: 'All', title: 'All' }, { key: 'Unread', title: 'Unread ' }]}
 *   onChangeTabItem={(index, key) => console.log(index, key)}
 * />
 *
 * @param {Object} props - The properties passed to the Tab component.
 * @param {number} props.activeIndex - activeIndex control the tab selection.
 * @param {Object} props.styles - Custom styles to apply to the header component.
 * @param {Array} props.tabs - List of tab items to be rendered.
 * @param {Function} props.onChangeTabItem - Callback function to handle tab item change.
 * @param {Array} props.screens - List of screens to be rendered.
 */

type TabProps = {
  activeIndex?: number;
  tabs: Array<{ key: string; title: string }>;
  styles: Partial<StyleProps>;
  onChangeTabItem?: (key: string) => void;
  screens?: ReactElement[];
};

const defaultScreensColors = ['#b91919', '#2E8B57', '#0047AB'];
const defaultWidth = '100%';

const defaultScreens = defaultScreensColors.map((color, index) => (
  <View key={index} style={{ backgroundColor: color, width: defaultWidth, height: defaultWidth }} />
));

const Tabs = (props: TabProps): ReactElement => {
  const {
    tabs,
    activeIndex = 0,
    styles,
    onChangeTabItem = () => null,
    screens = defaultScreens
  } = props;
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleWidth = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);
  const [tabTitleWidths, setTabTitleWidths] = useState<number[]>([]);

  useEffect(() => {
    if (tabTitleWidths.length > 0) 
      moveIndicator();
  }, [tabTitleWidths, activeTabIndex]);

  useEffect(() => {
    setActiveTabIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollTo({ x: activeTabIndex * width, animated: true });
  }, [activeTabIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);

    if (index !== activeTabIndex) onChangeTab(index);
  };

  const onChangeTab = (index: number) => {
    setActiveTabIndex(index);
    onChangeTabItem(tabs[index].key);
  };

  const getIndicatorPosition = () => {
    let position = 0;

    for (let i = 0; i < activeTabIndex; i++) position += tabTitleWidths[i];
    position += (tabTitleWidths[activeTabIndex] || 0) / 2;

    return position;
  };

  const moveIndicator = () => {
    const position = getIndicatorPosition();
    const width = tabTitleWidths[activeTabIndex] || 0;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: position,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(scaleWidth, {
        toValue: width * 0.85,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  const onTabTitleLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    const updatedWidths = [...tabTitleWidths];

    updatedWidths[index] = width;
    setTabTitleWidths(updatedWidths);
  };

  const renderTabHeader = () => {
    return (
      <View style={[style.tabContainer, styles.tabContainer]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab?.key}
              activeOpacity={0.8}
              style={[
                style.tab,
                styles.tab,
                activeTabIndex === index ? styles.activeTab : styles.inActiveTab
              ]}
              onPress={() => onChangeTab(index)}
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
              { transform: [{ translateX }, { scaleX: scaleWidth }] }
            ]}
          />
        </ScrollView>
      </View>
    );
  };

  const renderTabContainer = () => {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
        >
          {screens.map((screen, index) => (
            <View key={index} style={style.tabScreen}>
              {screen}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={style.container}>
      {renderTabHeader()}
      {renderTabContainer()}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
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
  },
  tabText: {
    color: '#000',
    fontWeight: '600',
    paddingHorizontal: 14,
    fontSize: 14
  },
  activeIndicator: {
    width: 1,
    height: 3,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0
  },
  tabScreen: {
    width,
    overflow: 'hidden'
  }
});

export default Tabs;

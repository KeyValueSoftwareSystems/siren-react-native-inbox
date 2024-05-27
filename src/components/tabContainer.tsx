import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

const { width } = Dimensions.get('window');

const TabContainer = ({
  screens = [<View />],
  activeScreenIndex,
  onChangeTab
}: {
  screens?: React.ReactNode[];
  activeScreenIndex: number;
  onChangeTab: (index: number) => void;
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollTo({ x: activeScreenIndex * width, animated: true });
  }, [activeScreenIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);

    if (index !== activeScreenIndex)
      onChangeTab(index);
  };

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
          <View key={index} style={styles.tabScreen}>
            {screen}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  tabScreen: {
    width,
    overflow: 'hidden'
  }
});

export default TabContainer;

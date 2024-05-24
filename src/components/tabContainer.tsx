import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Animated, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');

const getClosestSnapPoint = (value: number, points: number[]) => {
  const point = points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );

  return point;
};

const TabContainer = ({
  screens = [<View />],
  activeScreenIndex,
  onChangeTab
}: {
  screens?: React.ReactNode[];
  activeScreenIndex: number;
  onChangeTab: (index: number) => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const offsetX = useRef(0);
  const index = useRef(0);

  useEffect(() => {
    translateX.setValue(-activeScreenIndex * width);
    offsetX.current = -activeScreenIndex * width;
    index.current = activeScreenIndex;
  }, [activeScreenIndex]);

  const snapPoints = screens.map((_, i) => i * -width);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (index.current === 0 && gestureState.dx > 0)
          return;

        if (index.current === screens.length - 1 && gestureState.dx < 0)
          return;

        translateX.setValue(offsetX.current + gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentTranslateX = offsetX.current + gestureState.dx;
        const toValue = getClosestSnapPoint(currentTranslateX, snapPoints);
        
        Animated.timing(translateX, {
          toValue,
          duration: 200,
          useNativeDriver: false
        }).start(() => {
          offsetX.current = toValue;
          index.current = Math.floor(-toValue / width);
          onChangeTab(index.current);
          translateX.setValue(toValue);
        });
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }}
      >
        <Animated.View style={[styles.tabScreens, { width: width * screens.length }]}>
          {screens.map((screen, index) => (
            <View key={index} style={styles.tabScreen}>
              {screen}
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  tabScreens: {
    flexDirection: 'row'
  },
  tabScreen: {
    width,
    overflow: 'hidden'
  }
});

export default TabContainer;

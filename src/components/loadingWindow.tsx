import React, { useEffect, type ReactElement, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { SirenStyleProps } from '../types';

type LoadingWindowProps = {
  styles: Partial<SirenStyleProps>;
  customLoader?: JSX.Element | null;
};
/**
 * Displays a loading indicator within a window,
 *
 * @component
 * @example
 * <LoadingWindow
 *   styles={customStyles}
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.styles - Custom styles applied to the loading window container.
 * @param {Object} props.customLoader - Custom loader to be displayed within the loading window container.
 */
const LoadingWindow = (props: LoadingWindowProps): ReactElement => {
  const { styles, customLoader } = props;

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true
    };
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease)
        })
      ])
    ).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15]
  });

  const renderSkeltonCard = () => {
    return (
      <View style={[styles.cardContainer, style.cardContainer]}>
        <Animated.View
          style={[styles.skeltonLoaderColor, style.loadingCircle, { opacity: opacityAnim }]}
        />
        <View style={style.rectangleContainer}>
          <Animated.View
            style={[styles.skeltonLoaderColor, style.loadingRectangle1, { opacity: opacityAnim }]}
          />
          <Animated.View
            style={[styles.skeltonLoaderColor, style.loadingRectangle1, { opacity: opacityAnim }]}
          />
          <Animated.View
            style={[styles.skeltonLoaderColor, style.loadingRectangle2, { opacity: opacityAnim }]}
          />
          <View style={style.rectangleCircleContainer}>
            <Animated.View
              style={[
                styles.skeltonLoaderColor,
                style.loadingCircleSmall,
                { opacity: opacityAnim }
              ]}
            />
            <Animated.View
              style={[styles.skeltonLoaderColor, style.loadingRectangle3, { opacity: opacityAnim }]}
            />
          </View>
        </View>
        <Animated.View
          style={[styles.skeltonLoaderColor, style.loadingSquire, { opacity: opacityAnim }]}
        />
      </View>
    );
  };

  return (
    <View style={style.container}>
      {customLoader || renderSkeltonCard()}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#98A2B3',
    borderBottomWidth: 0.4,
    height: 160
  },
  rectangleContainer: {
    flex: 1
  },
  loadingRectangle1: {
    marginHorizontal: 16,
    flex: 1,
    height: 20,
    borderRadius: 5,
    marginBottom: 5
  },
  loadingRectangle2: {
    marginHorizontal: 16,
    flex: 1,
    height: 40,
    borderRadius: 5
  },
  loadingRectangle3: {
    marginRight: 16,
    marginLeft: 6,
    flex: 1,
    height: 15,
    borderRadius: 6
  },
  loadingCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden'
  },
  loadingCircleSmall: {
    width: 15,
    height: 15,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 16
  },
  loadingSquire: {
    width: 20,
    height: 20,
    borderRadius: 4
  },
  rectangleCircleContainer: {
    flexDirection: 'row',
    marginTop: 10
  }
});

export default LoadingWindow;

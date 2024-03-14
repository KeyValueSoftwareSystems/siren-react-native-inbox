import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  StyleSheet,
  Image
} from 'react-native';
import { SirenInboxIcon } from '@siren/react-native-inbox';
import { useNavigation } from '@react-navigation/native';

import NetworkLogDebugModal from './networkLogDebugModal';

const badgeThemes = [
  undefined,
  {
    light: {
      badgeStyle: {
        color: 'black',
        size: 24,
        textSize: 12
      }
    },
    dark: {
      badgeStyle: {
        color: 'green',
        size: 24,
        textSize: 12
      }
    }
  },
  {
    light: {
      badgeStyle: {
        color: 'blue',
        size: 22,
        textSize: 11
      }
    },
    dark: {
      badgeStyle: {
        color: 'pink',
        size: 22,
        textSize: 11
      }
    }
  }
];

function Home(): React.JSX.Element {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [showTestingWindow, setShowTestingWindow] = useState(false);
  const [showCustomNotification, setShowCustomNotification] = useState(false);
  const [badgeThemeIndex, setBadgeThemeIndex] = useState(0);
  const [showNetwork, setShowNetwork] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#FFF'
  };

  const renderButton = (label: string, onPress: () => void, color?: string) => {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: color || '#5783db' }]}
        onPress={onPress}
      >
        <Text style={styles.whiteLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const testingWindow = () => {
    return (
      <View style={styles.testingWindow}>
        <View style={styles.testingWindowHeader}>
          <Text style={styles.testingWindowTitle}>Testing Window</Text>
          <Text
            style={{ color: '#FFF', marginBottom: 6 }}
            onPress={() => setShowTestingWindow((showTestingWindow) => !showTestingWindow)}
          >
            {showTestingWindow ? 'Close' : 'Open'}
          </Text>
        </View>
        {showTestingWindow && (
          <View style={styles.testingWindowInnerContainer}>
            {renderButton(
              `${showNetwork ? 'hide' : 'show'} network`,
              () => {
                setShowNetwork((showNetwork) => !showNetwork);
              }
            )}
            {renderButton(`${showCustomNotification ? 'Default' : 'Custom'}-N-Icon`, () =>
              setShowCustomNotification((showCustomNotification) => !showCustomNotification)
            )}
            {renderButton('N-Badge-Themes', () => {
              setBadgeThemeIndex((badgeThemeIndex) =>
                badgeThemeIndex < badgeThemes?.length - 1 ? badgeThemeIndex + 1 : 0
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderNotificationIcon = () => {
    return (
      <View>
        <Image
          source={{
            uri: 'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg'
          }}
          resizeMode='contain'
          style={styles.icon}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.contentContainer}>
        <SirenInboxIcon
          theme={badgeThemes[badgeThemeIndex]}
          notificationIcon={showCustomNotification ? renderNotificationIcon() : undefined}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Text>Siren Notification Icon Theme Testing</Text>
        {showNetwork && <NetworkLogDebugModal />}
      </View>
      {testingWindow()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  testingWindow: {
    width: '100%',
    backgroundColor: '#36454f',
    padding: 10
  },
  testingWindowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  testingWindowTitle: {
    color: '#FFF',
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600'
  },
  icon: {
    width: 50,
    height: 50
  },
  testingWindowInnerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  whiteLabel: {
    color: '#fff',
    fontWeight: '600'
  },
  buttonContainer: {
    padding: 4,
    backgroundColor: '#5783db',
    maxWidth: 150,
    minWidth: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    borderRadius: 4,
    height: 30
  }
});

export default Home;

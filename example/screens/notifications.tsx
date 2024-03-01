import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  StyleSheet
} from 'react-native';

import { SirenInbox, useSiren } from '@siren/react-native-inbox';
import type { NotificationDataType, SirenErrorType } from 'test_notification/dist/esm/types';
import { useNavigation } from '@react-navigation/native';
import NetworkLogDebugModal from './networkLogDebugModal';

const windowThemes = [
  undefined,
  {
    dark: {
      colors: {
        primaryColor: 'blue'
      }
    },
    light: {
      colors: {
        primaryColor: '#800000',
        activeCardColor: '#FFDADA',
        primaryTextColor: '#FFFFFF',
        textColor: '#000000',
        neutralColor: '#FFFFFF',
        borderColor: '#560000'
      }
    }
  }
];

function Notifications(): React.JSX.Element {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [showTestingWindow, setShowTestingWindow] = useState(false);
  const [sdkDarkModeEnabled, setSdkDarkModeEnabled] = useState(false);
  const [showCustomHeader, setShowCustomHeader] = useState(false);
  const [showCustomFooter, setShowCustomFooter] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideAvatar, setHideAvatar] = useState(false);
  const [showNetwork, setShowNetwork] = useState(true);
  const [windowThemeIndex, setWindowThemeIndex] = useState(0);
  const [showCustomEmptyComponent, setShowCustomEmptyComponent] = useState(false);
  const [showCustomNotificationCard, setShowCustomNotificationCard] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#FFF'
  };

  const { markNotificationsAsReadByDate, markAsRead } = useSiren();

  const renderListEmpty = () => {
    return (
      <View style={styles.listEmptyContainer}>
        <Text style={styles.textStyle}>Custom Notification list is empty</Text>
      </View>
    );
  };

  const renderCustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Custom Header</Text>
      </View>
    );
  };

  const renderCustomFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.whiteLabel}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => markNotificationsAsReadByDate(String(new Date().getTime()))}>
          <Text style={styles.whiteLabel}>Mark allAsRead</Text>
        </TouchableOpacity>
      </View>
    );
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
            {renderButton('Theme-Mode', () =>
              setSdkDarkModeEnabled((sdkDarkModeEnabled) => !sdkDarkModeEnabled)
            )}
            {renderButton(`${showCustomHeader ? 'Hide' : 'Show'}-Header`, () =>
              setHideHeader((hideHeader) => !hideHeader)
            )}
            {renderButton(`${showCustomHeader ? 'Default' : 'Custom'}-Header`, () =>
              setShowCustomHeader((showCustomHeader) => !showCustomHeader)
            )}
            {renderButton(`${showCustomFooter ? 'Hide' : 'Show'}-Footer`, () =>
              setShowCustomFooter((showCustomFooter) => !showCustomFooter)
            )}
            {renderButton(`${hideAvatar ? 'Show' : 'Hide'}-Avatar`, () =>
              setHideAvatar((hideAvatar) => !hideAvatar)
            )}
            {renderButton(`${showCustomEmptyComponent ? 'Default' : 'Custom'}-Empty`, () =>
              setShowCustomEmptyComponent((showCustomEmptyComponent) => !showCustomEmptyComponent)
            )}
            {renderButton(`${showCustomNotificationCard ? 'Default' : 'Custom'}-N-Card`, () =>
              setShowCustomNotificationCard(
                (showCustomNotificationCard) => !showCustomNotificationCard
              )
            )}
            {renderButton('N-W-Theme', () => {
              setWindowThemeIndex((windowThemeIndex) =>
                windowThemeIndex < windowThemes?.length - 1 ? windowThemeIndex + 1 : 0
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderCustomNotificationCard = (notification: NotificationDataType) => (
    <View style={styles.notificationCard}>
      <Text style={styles.textStyle}>{`${notification?.message?.header}`}</Text>
      <Text style={styles.textStyle}>{`${notification?.message?.body}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.contentContainer}>
        <SirenInbox
          title='Siren Notifications'
          hideHeader={hideHeader}
          darkMode={sdkDarkModeEnabled}
          cardProps={{ hideAvatar: hideAvatar, showMedia: true }}
          theme={windowThemes[windowThemeIndex]}
          customFooter={showCustomFooter ? renderCustomFooter() : undefined}
          listEmptyComponent={showCustomEmptyComponent ? renderListEmpty() : undefined}
          customHeader={showCustomHeader ? renderCustomHeader() : undefined}
          customNotificationCard={
            showCustomNotificationCard
              ? (notification: NotificationDataType) => renderCustomNotificationCard(notification)
              : undefined
          }
          onNotificationCardClick={(notification: NotificationDataType) => {
            console.log('click on notification');
            markAsRead(notification.id);
          }}
          onError={(error: SirenErrorType) => {
            console.log(`error: ${error}`);
          }}
        />
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
  footer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  buttonStyle: {
    width: 'auto'
  },
  listEmptyContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#000'
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#5dbea3',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  },
  footerContainer: {
    height: 40,
    backgroundColor: '#5dbea3',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
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
    borderRadius: 4
  },
  notificationCard: {
    minHeight: 100,
    width: '100%',
    padding: 14,
    borderBottomWidth: 0.4,
    borderColor: '#000'
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
  testingWindowInnerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 125
  }
});

export default Notifications;

import React from 'react';
import { SirenNotificationIcon, SirenProvider } from '@siren/react-native-inbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/home';
import Notifications from './screens/notifications';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: () => (
            <SirenNotificationIcon
              realTimeUnviewedCountEnabled={true}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SirenProvider
        config={{
          userToken: '1b961622e24c4a118a4108123d645c28',
          recipientId: '6018ebd1-683c-4397-a903-5ce9ea94bcd7'
        }}
      >
        {MyTabs()}
      </SirenProvider>
    </NavigationContainer>
  );
}
export default App;

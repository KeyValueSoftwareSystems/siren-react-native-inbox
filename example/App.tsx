import React from 'react';
import { Image } from 'react-native';
import { SirenInboxIcon, SirenProvider } from '@siren/react-native-inbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/home';
import Notifications from './screens/notifications';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/icon.png')}
              resizeMode='contain'
              style={{ width: 30, height: 30 }}
            />
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <SirenInboxIcon disabled />
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
          userToken: '227047349b3044fbac7c24fdf5537c44',
          recipientId: '551cd601-65b3-41b2-bbce-bbd15908992f'
        }}
      >
        {MyTabs()}
      </SirenProvider>
    </NavigationContainer>
  );
}
export default App;

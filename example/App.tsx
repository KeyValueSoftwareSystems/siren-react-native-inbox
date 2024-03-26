import React from 'react';
import { SirenProvider } from '@sirenapp/react-native-inbox';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import Notifications from './screens/notifications';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='Notifications'
        options={{
          headerShown: false
        }}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const config = {
    userToken: 'YOUR_USER_TOKEN',
    recipientId: 'YOUR_RECIPIENT_ID',
  };

  return (
    <NavigationContainer>
      <SirenProvider
        config={config}
      >
        {MyStack()}
      </SirenProvider>
    </NavigationContainer>
  );
}

export default App;

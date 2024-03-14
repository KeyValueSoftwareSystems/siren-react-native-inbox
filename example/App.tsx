import React from 'react';
import { SirenProvider } from '@siren/react-native-inbox';
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
  const [config, setConfig] = React.useState({
    userToken: 'fb928b226c5b47b7810171acbe2dbad2',
    recipientId: '6b6027be-7882-4eca-9cc7-080a06798c71'
  });

  return (
    <NavigationContainer>
      <SirenProvider config={config}>{MyStack()}</SirenProvider>
    </NavigationContainer>
  );
}

export default App;

import React, { useEffect } from 'react';
import { SirenProvider } from './src';
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

  useEffect(() => {
    setTimeout(() => {
      setConfig({
        userToken: '227047349b3044fbac7c24fdf5537c44',
        recipientId: '551cd601-65b3-41b2-bbce-bbd15908992f'
      })
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <SirenProvider config={config}>{MyStack()}</SirenProvider>
    </NavigationContainer>
  );
}

export default App;

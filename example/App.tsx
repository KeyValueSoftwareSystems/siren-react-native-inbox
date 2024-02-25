import React from 'react';
import { SirenProvider } from '@siren/react-native-inbox';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import Notifications from './screens/notifications';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SirenProvider
        config={{
          userToken: '1b961622e24c4a118a4108123d645c28',
          recipientId: '6018ebd1-683c-4397-a903-5ce9ea94bcd7'
        }}
      >
        <Stack.Navigator >
          <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
          <Stack.Screen name="Notifications" options={{headerShown: false}} component={Notifications} />
        </Stack.Navigator>
      </SirenProvider>
    </NavigationContainer>
  );
}
export default App;

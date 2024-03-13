import React, { useEffect } from 'react';
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

//   const [config, setConfig] = React.useState({
//     userToken: 'fb928b226c5b47b7810171acbe2dbad2',
//     recipientId: '6b6027be-7882-4eca-9cc7-080a06798c71'
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       setConfig({
//         userToken: '227047349b3044fbac7c24fdf5537c44',
//         recipientId: '551cd601-65b3-41b2-bbce-bbd15908992f'
//       })
//     }, 3000);
//   }, [])

//   return (
//     <NavigationContainer>
//       <SirenProvider
//         config={config}
//       >
//         {MyTabs()}
//       </SirenProvider>
//     </NavigationContainer>
//   );
// }

  const [userToken, setUserToken] = React.useState<string>('fb928b226c5b47b7810171acbe2dbad2');
  const [recipientId, setRecipientId] = React.useState<string>('6b6027be-7882-4eca-9cc7-080a06798c71');

  useEffect(() => {
    setTimeout(() => {
      setUserToken('227047349b3044fbac7c24fdf5537c44');
      setRecipientId('551cd601-65b3-41b2-bbce-bbd15908992f');
    }, 3000);
  }, [])

  return (
    <NavigationContainer>
      <SirenProvider
        config={{
          userToken: userToken,
          recipientId: recipientId,
        }}
      >
        {MyTabs()}
      </SirenProvider>
    </NavigationContainer>
  );
}
export default App;

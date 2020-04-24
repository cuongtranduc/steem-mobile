import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home';
import PostDetail from './src/screens/PostDetail';

import WalletScreen from './src/screens/Wallet';
import AccountScreen from './src/screens/Account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#e3e3e3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          },
        }}
        name="Home" 
        component={HomeScreen} 
      />
      <Stack.Screen 
        name="PostDetail"
        component={PostDetail}
      />
    </Stack.Navigator>
  );
}

const navigationRef = React.createRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default App;

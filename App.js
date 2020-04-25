import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/screens/Home';
import PostDetailScreen from './src/screens/PostDetail';
import ProfileScreen from './src/screens/Profile';

import WalletScreen from './src/screens/Wallet';
import AccountScreen from './src/screens/Account';

import { Provider } from 'react-redux';
import store from './src/redux';

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
        component={PostDetailScreen}
      />
      <Stack.Screen 
        name="Profile"
        options={{
          headerShown: false
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

const navigationRef = React.createRef();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen 
            name="Wallet" 
            component={WalletScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="wallet" color={color} size={26} />
              ),
              showLabel: false
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="account" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default App;

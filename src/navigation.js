import React from 'react';
import {Platform, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/Home';
import PostDetailScreen from './screens/PostDetail';
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';

import WalletScreen from './screens/Wallet';
import AccountScreen from './screens/Account';

import {colors} from './utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationRef = React.createRef();
const iconSize = Platform.OS === 'ios' ? 30 : 24;

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.black,
          },
          headerTintColor: '#e3e3e3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Icon
                style={{marginLeft: 15}}
                name="account-circle"
                size={iconSize}
                color="#e3e3e3"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="bell"
                size={iconSize}
                color="#e3e3e3"
                style={{marginRight: 15}}
              />
              {/* <Icon style={{marginRight: 15, marginLeft: 25}} name="magnify" size={25} color="#666" /> */}
            </View>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

const BottomStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.black,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: iconSize * 2.2,
                width: iconSize * 2.2,
                borderRadius: iconSize * 1.1,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
                bottom: iconSize / 4,
                // borderColor: colors.light_gray,
                // borderWidth: 5,
                // borderRightColor: colors.light_gray,
                // borderRightWidth: 5,
                borderColor: colors.white,
                borderWidth: 5,
                backgroundColor: colors.primary
              }}>
              <Icon name="pencil-outline" color={colors.white} size={iconSize} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="wallet" color={color} size={iconSize} />
          ),
          showLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="BottomStack" mode="modal">
        <Drawer.Screen name="BottomStack" component={BottomStack} />
        <Drawer.Screen name="Login" component={LoginStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export default RootNavigator;

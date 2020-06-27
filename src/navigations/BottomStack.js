import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import WalletScreen from '../screens/Wallet';
import AccountScreen from '../screens/Account';

import {colors, iconSize} from '../utils/theme';

const Tab = createBottomTabNavigator();

const BottomStack = ({navigation}) => {
  const {account} = useSelector((state) => state.storageReducer);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-heart" color={color} size={iconSize} />
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
                height: iconSize * 2,
                width: iconSize * 2,
                borderRadius: iconSize * 1,
                justifyContent: 'center',
                alignItems: 'center',
                bottom: iconSize / 4,
                borderColor: colors.white,
                borderWidth: 5,
                backgroundColor: colors.primary,
              }}>
              <Icon
                name="pencil-outline"
                color={colors.white}
                size={iconSize}
              />
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
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                isEmpty(account)
                  ? navigation.navigate('Login')
                  : navigation.navigate('Wallet');
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../components/Avatar';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import PostDetailScreen from '../screens/PostDetail';
import VotersScreen from '../screens/Voters';

import {iconSize, colors} from '../utils/theme';
import styles from './styles';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const {account} = useSelector((state) => state.storageReducer);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerTintColor: '#333',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerLeft: () => {
            return isEmpty(account) ? (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Icon
                  style={{marginLeft: 15}}
                  name="account-circle"
                  size={iconSize}
                  color={'#333'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Avatar
                  style={{
                    marginLeft: 15,
                    height: iconSize + 1,
                    width: iconSize + 1,
                    borderRadius: (iconSize + 1) / 2,
                    borderWidth: 1,
                    borderColor: '#FFF',
                  }}
                  uri={account.avatar}
                />
              </TouchableOpacity>
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({route}) => ({
          title: `in ${route.params.post.category}`,
          headerBackTitle: 'Home',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.black,
        })}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Voters"
        options={({route}) => ({
          title: `Voters (${route.params.voters.length})`,
          headerStyle: styles.headerStyle,
          headerBackTitle: '',
          headerTintColor: colors.black,
        })}
        component={VotersScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

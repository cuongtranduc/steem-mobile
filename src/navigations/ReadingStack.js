import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../components/Avatar';
import ReadingListScreen from '../screens/ReadingList';

import {iconSize, colors} from '../utils/theme';

const Stack = createStackNavigator();

const ReadingListStack = ({navigation}) => {
  const {account} = useSelector((state) => state.storageReducer);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Reading List',
          headerStyle: {
            shadowOffset: {height: 0, width: 0},
          },
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
                  color={colors.white}
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
        name="ReadingList"
        component={ReadingListScreen}
      />
    </Stack.Navigator>
  );
};

export default ReadingListStack;

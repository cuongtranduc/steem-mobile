import React from 'react';
import {Platform, View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

import HomeScreen from './screens/Home';
import PostDetailScreen from './screens/PostDetail';
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';
import ReadingListScreen from './screens/ReadingList';
import WalletScreen from './screens/Wallet';
import AccountScreen from './screens/Account';
import VotersScreen from './screens/Voters';
import PublishScreen from './screens/Publish';

import CustomDrawerContent from './components/CustomDrawerContent';
import Avatar from './components/Avatar';
import {colors} from './utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationRef = React.createRef();
const iconSize = Platform.OS === 'ios' ? 30 : 24;

const headerStyle = {
  backgroundColor: colors.white,
  shadowColor: '#000',
  shadowOpacity: 0.5,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 0,
  },
  elevation: 5,
};

const HomeStack = ({navigation}) => {
  const {account} = useSelector((state) => state.storageReducer);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle,
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
    </Stack.Navigator>
  );
};

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
              <TouchableOpacity onPress={() => navigate('Login')}>
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

const PublishStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          ...TransitionPresets.ModalTransition,
        }}
        name="Publish"
        component={PublishScreen}
      />
    </Stack.Navigator>
  );
};

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

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({route}) => ({
          // headerTitle: (props) => {
          //   console.log(props);
          //   return (
          //     <View style={{flexDirection: 'row'}}>
          //       <Text style={{color: '#333', fontSize: 15}}>Published in</Text>
          //       <Text style={{color: colors.black, fontSize: 15}}>
          //         {route.params.post.category}
          //       </Text>
          //     </View>
          //   );
          // },
          title: `in ${route.params.post.category}`,
          headerBackTitle: 'Home',
          headerStyle,
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
          headerStyle,
          headerBackTitle: '',
          headerTintColor: colors.black,
        })}
        component={VotersScreen}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
          ...TransitionPresets.ModalTransition,
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

// Gets the current screen from navigation state
const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const RootNavigator = () => {
  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const currentRouteName = getActiveRouteName(state);
        routeNameRef.current = currentRouteName;
      }}>
      <Drawer.Navigator
        drawerStyle={{width: '75%'}}
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            currentRouteName={routeNameRef.current}
          />
        )}
        initialRouteName="MainStack">
        <Drawer.Screen name="MainStack" component={MainStack} />
        <Drawer.Screen name="ReadingList" component={ReadingListStack} />
        <Drawer.Screen name="Publish" component={PublishStack} />
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

export function getRootState() {
  return navigationRef.current?.getRootState();
}

export default RootNavigator;

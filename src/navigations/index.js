import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import LoginScreen from '../screens/Login';
import HomeStack from './HomeStack';
import ReadingListStack from './ReadingStack';
import PublishStack from './PublishStack';

import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationRef = React.createRef();

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
  const {account} = useSelector((state) => state.storageReducer);
  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  const MainStack = () => (
    <Drawer.Navigator
      drawerStyle={{width: '75%'}}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          currentRouteName={routeNameRef.current}
        />
      )}
      screenOptions={{swipeEnabled: !!account.username}}
      initialRouteName="HomeStack">
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="ReadingList" component={ReadingListStack} />
      <Drawer.Screen name="Publish" component={PublishStack} />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const currentRouteName = getActiveRouteName(state);
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
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

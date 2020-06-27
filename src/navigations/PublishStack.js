import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';

import PublishScreen from '../screens/Publish';

const Stack = createStackNavigator();

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

export default PublishStack;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WatchScreen from '../screens/Watch';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const WatchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WatchScreen"
      component={WatchScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default WatchStack;

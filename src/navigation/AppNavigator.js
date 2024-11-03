import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import Watch from '../screens/Watch';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Details" component={Watch} />
    </Stack.Navigator>
  );
}

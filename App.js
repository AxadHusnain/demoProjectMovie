import {StyleSheet, Text, View, Appearance} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
const App = () => {
  Appearance.setColorScheme('light');

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  a: {
    color: 'red',
  },
});

import {StyleSheet, Text, View, Appearance} from 'react-native';
import React from 'react';

const App = () => {
  Appearance.setColorScheme('light');

  return (
    <View>
      <Text style={{}}>Apps</Text>
      <Text style={{}}>Apps</Text>
      <Text style={{}}>Apps</Text>
      <Text style={{}}>Apps</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  a: {
    color: 'red',
  },
});

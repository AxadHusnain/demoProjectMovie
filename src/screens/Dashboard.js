import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Dashboard = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.message}>Comming Soon</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
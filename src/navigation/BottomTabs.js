import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WatchIcon from '../assets/icons/Watch.png';
import MoreIcon from '../assets/icons/More.png';
import MediaIcon from '../assets/icons/Media.png';
import DashboardIcon from '../assets/icons/Dashboard.png';
import Dashboard from '../screens/Dashboard';
import MediaLibrary from '../screens/MediaLibrary';
import More from '../screens/More';
import WatchStack from './WatchStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Watch"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;
          if (route.name === 'Dashboard') {
            iconSource = DashboardIcon;
          } else if (route.name === 'Watch') {
            iconSource = WatchIcon;
          } else if (route.name === 'Media Library') {
            iconSource = MediaIcon;
          } else if (route.name === 'More') {
            iconSource = MoreIcon;
          }
          const iconColor = focused ? '#FFFFFF' : '#827D88';
          return <Image source={iconSource} style={{tintColor: iconColor}} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#827D88',
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Watch"
        component={WatchStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Media Library"
        component={MediaLibrary}
        options={{headerShown: false}}
      />
      <Tab.Screen name="More" component={More} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    borderRadius: hp(2.7),
    backgroundColor: '#2E2739',
    height: hp(7.5),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
});

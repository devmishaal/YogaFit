import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import PoseDetailsScreen from '../screens/PoseDetailsScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

      <Stack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
      />
      <Stack.Screen name="PoseDetailsScreen" component={PoseDetailsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
